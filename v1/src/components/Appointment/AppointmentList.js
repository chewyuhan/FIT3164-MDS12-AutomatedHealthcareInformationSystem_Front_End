import React from 'react';

const AppointmentList = ({ appointments, deleteAppointment }) => {
  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <span>{appointment.name}</span>
            <span>{appointment.date}</span>
            <button onClick={() => deleteAppointment(appointment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
