// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from "date-fns";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import AppointmentTable from "../components/Appointment/AppointmentTable";
import Sidebar from '../components/Sidebar/Sidebar';
import { fetchAppointmentDataFromAPI, addAppointment } from "../api/appointment";
import { fetchDoctorDataFromAPI } from "../api/doctor";
import { fetchPatientDataFromAPI } from "../api/patient";
import './Appointment.css';

// Define the main Appointment component
const Appointment = () => {
  // Define state variables using useState
  const [appointments, setAppointments] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);


  const handleEditRow = (idx) => {
    setRowToEdit(idx); // Corrected assignment
    setIsPopupOpen(true);
  }
  

  // useEffect to fetch initial data when the component mounts
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) return;

    const fetchData = async () => {
      try {
        // Fetch appointment data from an API
        const appointmentData = await fetchAppointmentDataFromAPI();
        setAppointments(appointmentData);

        // Fetch doctor and patient data
        const doctorsResponse = await fetchDoctorDataFromAPI();
        setDoctors(doctorsResponse);

        const patientsResponse = await fetchPatientDataFromAPI();
        setPatients(patientsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);

  const fetchDataAndUpdate = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) return;

    try {
      const appointmentData = await fetchAppointmentDataFromAPI();
      setAppointments(appointmentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Define functions for handling appointment-related actions
  const openAppointmentPopup = () => {
    setIsPopupOpen(true);
  };

  const closeAppointmentPopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectAppointmentTime = () => {
    // Create an appointment object
    const doctorName = getDoctorNameById(selectedDoctorId);
    const patientName = getPatientNameById(selectedPatientId);
    const appointment = {
      patientID: selectedPatientId,
      employeeID: selectedDoctorId,
      date: appointmentDate,
      time: appointmentTime,
      remarks: "",
      reason: "",
      completed: false,
      doctor: doctorName,
      patient: patientName,
    };

    // Update the appointments state with the new appointment
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    // After adding the appointment, fetch data again and update the calendar
    closeAppointmentPopup();
  };

  // Edit appointment should go here. 
  // use if(rowToEdit === null) to check if it is a new appointment or an existing one.
  const handleSubmitAppointmentForm = async (formData) => {

    const appointmentDateTime = new Date(appointmentDate);
    const [hours, minutes] = appointmentTime.split(":");
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

    const requestData = {
      patientId: parseInt(formData.patientId),
      employeeId: parseInt(formData.employeeId),
      appointmentDateTime: appointmentDateTime.toISOString(),
      reason: formData.reason || "",
      remarks: formData.remarks || "",
      completed: formData.completed || false,
    };

    addAppointment(requestData);
    await fetchDataAndUpdate();
    closeAppointmentPopup();
  };

  // Need to modify handle delete row here with API
  const handleDeleteRow = (targetIndex) => {
    setAppointments(appointments.filter((_, idx) => idx !== targetIndex));
  };

  const handleCalendarClick = (value) => {
    const appointmentsForDay = appointments.filter((appointment) =>
      isSameDay(new Date(appointment.appointmentDateTime), value)
    );

    const appointmentsWithNames = appointmentsForDay.map((appointment) => ({
      ...appointment,
      doctor: getDoctorNameById(appointment.employeeId),
      patient: getPatientNameById(appointment.patientId),
    }));

    setSelectedAppointment(appointmentsWithNames);
  };

  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const getPatientNameById = (patientID) => {
    const patient = patients.find((p) => p.patientId.toString() === patientID.toString());
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  // Render JSX content based on the state
  if (!appointments) {
    return <p>Loading Appointment data...</p>;
  }

  return (
    <div className="appointment-page">
      <Sidebar />
      <div className="appointment-container">
        <div className="add-appointment-content">
          <button onClick={openAppointmentPopup} className="add-appointment-button">
            Add Appointment
          </button>
        </div>
        {isPopupOpen && (
            // Render a popup for adding appointments
            <div className="popup" onClick={(e) => {
              if (e.target.className === "popup") closeAppointmentPopup();
            }}>
              <div className="popup-content">
                <AppointmentForm
                  // Pass props to the AppointmentForm component
                  patients={patients}
                  selectedPatientId={selectedPatientId}
                  setSelectedPatientId={setSelectedPatientId}
                  doctors={doctors}
                  appointmentDate={appointmentDate}
                  setAppointmentDate={setAppointmentDate}
                  appointmentTime={appointmentTime}
                  setAppointmentTime={setAppointmentTime}
                  selectedDoctorId={selectedDoctorId}
                  setSelectedDoctorId={setSelectedDoctorId}
                  handleSelectAppointmentTime={handleSelectAppointmentTime}
                  onSubmit={handleSubmitAppointmentForm}
                  closeModal={closeAppointmentPopup}
                  defaultValue={rowToEdit !== null && selectedAppointment[rowToEdit]}
                />
              </div>
            </div>
          )}
        <div className="appointment-list-container">
          <div className="calendar-container">
            <h1>Book an Appointment</h1>
            <h2>Select a Date</h2>
            <Calendar
              // Render a calendar for selecting dates
              value={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              onClickDay={handleCalendarClick}
              tileContent={({ date, view }) => {
                // Render appointment count indicators on the calendar
                if (view === 'month') {
                  const appointmentsForDay = appointments.filter(appointment =>
                    isSameDay(new Date(appointment.appointmentDateTime), date)
                  );
                  const appointmentCount = appointmentsForDay.length;
                  return (
                    <div className="appointment-tile-content">
                      {appointmentCount > 0 && <span className="appointment-indicator">📅</span>}
                      <span className="appointment-count">{appointmentCount}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
          </div>

          {Array.isArray(selectedAppointment) && selectedAppointment.length > 0 && (
            // Render appointment details in a table
            <div className="selected-appointment-details">
              <AppointmentTable appointments={selectedAppointment} doctors={doctors} patients={patients} 
              editRow = {handleEditRow}
              deleteRow={handleDeleteRow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;