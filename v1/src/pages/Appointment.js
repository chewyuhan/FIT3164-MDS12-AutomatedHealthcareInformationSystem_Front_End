import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import Sidebar from '../components/Sidebar/Sidebar';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: "Dr. Smith",
        specialty: "General Practitioner",
      },
      {
        id: 2,
        name: "Dr. Jones",
        specialty: "Pediatrician",
      },
      {
        id: 3,
        name: "Dr. Brown",
        specialty: "Orthopedic Surgeon",
      },
    ]);
  }, []);

  const handleSelectAppointmentTime = () => {
    const appointment = {
      doctorId: selectedDoctorId,
      date: appointmentDate,
      time: appointmentTime,
    };
    setAppointments([...appointments, appointment]);
  };

  const handleCalendarClick = (value) => {
    const formattedDate = value.toISOString().split('T')[0];
    const appointment = appointments.find(appointment => appointment.date.toISOString().split('T')[0] === formattedDate);
    setSelectedAppointment(appointment);
  };

  const getDoctorNameById = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };
  
  return (
    <div className="appointment-page">
      <Sidebar />
      <div className="appointment-content">
        <AppointmentForm
          doctors={doctors}
          appointmentDate={appointmentDate}
          setAppointmentDate={setAppointmentDate}
          appointmentTime={appointmentTime}
          setAppointmentTime={setAppointmentTime}
          selectedDoctorId={selectedDoctorId}
          setSelectedDoctorId={setSelectedDoctorId}
          handleSelectAppointmentTime={handleSelectAppointmentTime}
        />
        <table className="appointments-table">
          {/* ... Your appointments table rendering */}
        </table>
      </div>
      <div className="calendar-container">
        <Calendar
          value={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          onClickDay={handleCalendarClick}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = date.toISOString().split('T')[0];
              const hasAppointment = appointments.some(appointment => appointment.date.toISOString().split('T')[0] === formattedDate);
              return hasAppointment ? <span className="appointment-indicator">📅</span> : null;
            }
            return null;
          }}
        />
        {selectedAppointment && (
          <div className="selected-appointment-details">
            <h2>Selected Appointment Details</h2>
            <p>Doctor: {getDoctorNameById(selectedAppointment.doctorId)}</p>
            <p>Date: {selectedAppointment.date.toDateString()}</p>
            <p>Time: {selectedAppointment.time}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
