import React, { useState } from 'react';

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission (e.g., save the appointment)
    // Here, we'll just log the data for demonstration purposes
    console.log('Patient Name:', patientName);
    console.log('Appointment Date:', appointmentDate);
    // Clear the form fields after submission
    setPatientName('');
    setAppointmentDate('');
  };

  return (
    <div className='appointment-form'>
      <h2>Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type='text'
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </label>
        <label>
          Appointment Date:
          <input
            type='date'
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
