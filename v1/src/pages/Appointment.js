import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import Sidebar from '../components/Sidebar/Sidebar';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import doctorsData from "../database/DoctorsData";
import patientData from "../database/PatientsData";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    setDoctors(doctorsData);
  }, []);

  useEffect(() => {
    setPatients(patientData);
  }, []);

  const handleSelectAppointmentTime = () => {
    const appointment = {
      patientID: selectedPatientId,
      doctorId: selectedDoctorId,
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

  const getDoctorNameById = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
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
                    <p>Doctor: {getDoctorNameById(appointment.doctorId)}</p>
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
