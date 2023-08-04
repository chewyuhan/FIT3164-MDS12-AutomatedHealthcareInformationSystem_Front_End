import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AppointmentForm from '../components/Appointment/AppointmentForm';
import AppointmentList from '../components/Appointment/AppointmentList';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="appointment-page">
      <Sidebar />
      <h1>Appointment Page</h1>
      <div className="content">
        <AppointmentForm addAppointment={addAppointment} />
        <AppointmentList appointments={appointments} deleteAppointment={deleteAppointment} />
      </div>
    </div>
  );
};

export default AppointmentPage;
