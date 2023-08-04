import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AppointmentForm from '../components/Appointment/AppointmentForm';

function Appointment() {
  return (
    <div className='appointments'>
      <Sidebar />
      <h1>Appointment</h1>
      <AppointmentForm />
    </div>
  );
}

export default Appointment;
