import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import Sidebar from '../components/Sidebar/Sidebar';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; // Import Axios for making API requests

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the visibility of the popup

useEffect(() => {
  // Retrieve the access token from sessionStorage
  const accessToken = sessionStorage.getItem("accessToken");
  // If the access token exists, you can use it for authenticated API calls
  if (accessToken) {
    // Make an authenticated API call using the access token
    axios.get("https://mds12.cyclic.app/employees/doctors", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        // Handle the response and update the user data state
        console.log("Doctors response:", response.data);
        setDoctors(response.data);
        // Now, make another Axios call for fetching patients data
        axios.get('https://mds12.cyclic.app/patients/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            setPatients(response.data);
          })
          .catch(error => {
            console.error('Error fetching patients data', error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}, []);

  // Function to open the appointment popup
  const openAppointmentPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the appointment popup
  const closeAppointmentPopup = () => {
    setIsPopupOpen(false);
  };


  const handleSelectAppointmentTime = () => {
    const appointment = {
      patientID: selectedPatientId,
      employeeId: selectedDoctorId,
      date: appointmentDate,
      time: appointmentTime,
    };
    setAppointments([...appointments, appointment]);
  };

  const handleCalendarClick = (value) => {
    const formattedDate = value.toISOString().split('T')[0];
    const appointmentsForDay = appointments.filter(appointment => appointment.date.toISOString().split('T')[0] === formattedDate);
    setSelectedAppointment(appointmentsForDay);
  };

  const getDoctorNameById = (employeeId) => {
    const doctor = doctors.find(d => d.employeeId === employeeId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };
  
  
  return (
    <div className="appointment-page">
      <Sidebar />
      <div className="appointment-container">
        <div className="calendar-container">
          <h1>Book an Appointment</h1>
          <h2>Select a Date</h2>
          <Calendar
            value={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            onClickDay={handleCalendarClick}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const formattedDate = date.toISOString().split('T')[0];
                const appointmentsForDay = appointments.filter(appointment => appointment.date.toISOString().split('T')[0] === formattedDate);
                const appointmentCount = appointmentsForDay.length;
                return (
                  <div className="appointment-tile-content">
                    {appointmentCount >= 0 && <span className="appointment-indicator">📅</span>}
                    <span className="appointment-count">{appointmentCount}</span>
                  </div>
                );
              }
              return null;
            }}
          />
        </div>
        <div className="appointment-content">
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
          />
        </div>
        {Array.isArray(selectedAppointment) && selectedAppointment.length > 0 && (
          <div className="selected-appointment-details">
            <h2>Appointments for {selectedAppointment[0]?.date.toDateString()}</h2>
            <div className="centered-list">
              <ul>
                {selectedAppointment.map(appointment => (
                  <li key={appointment.time}>
                    <p>Doctor: {getDoctorNameById(appointment.employeeId)}</p>
                    <p>Patient: {appointment.patientID}</p>
                    <p>Time: {appointment.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;