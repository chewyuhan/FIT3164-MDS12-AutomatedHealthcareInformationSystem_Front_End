import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { isSameDay } from "date-fns";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import AppointmentTable from "../components/Appointment/AppointmentTable";
import Sidebar from '../components/Sidebar/Sidebar';
import { fetchAppointmentDataFromAPI, addAppointment } from "../api/appointment";
import './Appointment.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const appointmentData = await fetchAppointmentDataFromAPI();
        setAppointments(appointmentData);

        const doctorsResponse = await axios.get("https://mds12.cyclic.app/employees/doctors", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setDoctors(doctorsResponse.data);

        const patientsResponse = await axios.get('https://mds12.cyclic.app/patients/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setPatients(patientsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openAppointmentPopup = () => {
    setIsPopupOpen(true);
  };

  const closeAppointmentPopup = () => {
    setIsPopupOpen(false);
    setSelectedPatientId(null);
    setSelectedDoctorId(null);
    setAppointmentDate(new Date());
    setAppointmentTime("");
  };

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
  
    // Update the appointments state using a callback function
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    closeAppointmentPopup();
  };
  

  const handleSubmitAppointmentForm = (formData) => {
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

    addAppointment(requestData)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        closeAppointmentPopup();
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
      });
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
          <div className="popup" onClick = {(e) => {
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
                closeModal={closeAppointmentPopup}
              />
            </div>
          </div>
        )}
        <div className="appointment-list-container">
          <div className="calendar-container">
            <h1>Book an Appointment</h1>
            <h2>Select a Date</h2>
            <Calendar
              value={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              onClickDay={handleCalendarClick}
              tileContent={({ date, view }) => {
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
            <div className="selected-appointment-details">
              <AppointmentTable appointments={selectedAppointment} doctors={doctors} patients={patients} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
