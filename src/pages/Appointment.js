import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import AppointmentTable from "../components/Appointment/AppointmentTable";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  fetchAppointmentDataFromAPI,
  addAppointment,
  editAppointment,
  deleteAppointment,
} from "../api/appointment";
import { fetchDoctorDataFromAPI } from "../api/doctor";
import { fetchPatientDataFromAPI } from "../api/patient";

import "./Appointment.css";

const Appointment = () => {
  // State variables
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
  const [tableData, setTableData] = useState([]);


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


        // Initialize the table data
        await updateTableData(appointmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [appointmentDate]); // Include appointmentDate in the dependency array

  // Function to fetch updated appointment data in calendar and table
  const fetchUpdatedAppointmentDataTable = async () => {
    try {
      const appointmentData = await fetchAppointmentDataFromAPI();
      setAppointments(appointmentData);

      // Update the selectedAppointment based on the new appointment data
      updateTableData(appointmentData);
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  // Close the appointment popup
  const closeAppointmentPopup = () => {
    setIsPopupOpen(false);
  };

  // Open the appointment popup
  const openAppointmentPopup = () => {
    // Set defaultValue to null when adding a new appointment
    setIsPopupOpen(true);
    setRowToEdit(null); // Clear the rowToEdit
    setSelectedPatientId(null); // Clear selectedPatientId
    setSelectedDoctorId(null); // Clear selectedDoctorId
    setAppointmentTime(""); // Reset appointmentTime
  };


  // Update the table data based on appointment data
  const updateTableData = (appointmentData) => {
    const appointmentsForDay = appointmentData.filter((appointment) =>
      isSameDay(new Date(appointment.appointmentDateTime), appointmentDate)
    );

    const appointmentsWithNames = appointmentsForDay.map((appointment) => ({
      ...appointment,
      doctor: getDoctorNameById(appointment.employeeId),
      patient: getPatientNameById(appointment.patientId),
    }));

    setTableData(appointmentsWithNames);
    setSelectedAppointment(appointmentsWithNames);

  };

  // Handle editing a row in the table
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setSelectedPatientId(null); // Clear selectedPatientId
    setSelectedDoctorId(null); // Clear selectedDoctorId
    setAppointmentTime(""); // Reset appointmentTime
    setIsPopupOpen(true);
  };

  // Define a function to select an appointment by appointmentId
  const selectAppointmentById = (appointmentId) => {
    const selectedAppointment = appointments.find((appointment) => appointment.appointmentId === appointmentId);
    return selectedAppointment;
  };

  // Handle selecting an appointment time
  const handleSelectAppointmentTime = () => {
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

  // Handle submitting the appointment form
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
    try {

      if (rowToEdit === null) {
        // Adding a new appointment
        await addAppointment(requestData);
      } else {
        // Editing an existing appointment
        const appointmentId = tableData.find((appointment) => appointment.appointmentId === rowToEdit).appointmentId;
        await editAppointment(appointmentId, requestData);
      }
      fetchUpdatedAppointmentDataTable();
      closeAppointmentPopup();

    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Handle deleting a row from the table
  const handleDeleteRow = async (targetIndex) => {
    console.log(targetIndex);
    deleteAppointment(targetIndex);
    await fetchUpdatedAppointmentDataTable();
  };

  // Handle calendar click event
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

  // Get doctor name by ID
  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  // Get patient name by ID
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
      <div className="header">
        <h1>Appointment Page</h1>
      </div>
      <div className="appointment-container">
        <div className="add-appointment-content">
          <button onClick={openAppointmentPopup} className="add-appointment-button">
            Add Appointment
          </button>
        </div>
        <div className="appointment-list-container">
          <div className="calendar-container">
            <h1>Book an Appointment</h1>
            <h2>Select a Date</h2>
            <Calendar
              value={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              onClickDay={handleCalendarClick}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const appointmentsForDay = appointments.filter((appointment) =>
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
            <div className="selected-appointment-details">
              <AppointmentTable
                appointments={selectedAppointment}
                doctors={doctors}
                patients={patients}
                editRow={handleEditRow}
                deleteRow={handleDeleteRow}
              />
            </div>
          )}
        </div>

        {isPopupOpen && (
          <div className="popup" onClick={(e) => {
            if (e.target.className === "popup") closeAppointmentPopup();
          }}>
            <div className="popup-content">
              <AppointmentForm
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
                closeModal={() => {
                  setIsPopupOpen(false);
                  setRowToEdit(null);
                }}
                defaultValue={rowToEdit !== null && selectAppointmentById(rowToEdit)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
