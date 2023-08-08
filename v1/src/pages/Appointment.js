import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import Sidebar from '../components/Sidebar/Sidebar';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

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
    </div>
  );
};

export default Appointment;
