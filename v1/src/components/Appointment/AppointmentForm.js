import React from "react";
import './AppointmentForm.css';
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({ doctors, appointmentTime, setAppointmentTime, selectedDoctorId, setSelectedDoctorId, handleSelectAppointmentTime }) => {

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setAppointmentTime(""); // Reset appointment time when doctor changes
  };

  const generateTimeRange = (startHour, endHour) => {
    const timeRange = [];
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 20) {
        if (!(hour === 13 && minute >= 0 && minute < 20)) { // Exclude 1:00 PM to 1:20 PM (lunch time)
          const formattedTime = `${hour % 12 || 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
          timeRange.push({ time: formattedTime });
        }
      }
    }
  
    return timeRange;
  };
  

  const doctorAppointmentTimes = {
    1: generateTimeRange(9, 17), 
    2: generateTimeRange(9, 17), 
    3: generateTimeRange(9, 17), 
  };



  return (
    <div className="appointment-form">
      <h2>Select a Doctor</h2>
      <select
        className="doctor-select"
        value={selectedDoctorId || ""}
        onChange={(event) => handleSelectDoctor(event.target.value)}
      >
        <option value="">Select a doctor...</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <h2>Select an Appointment Time</h2>
      <select
        className="time-select"
        value={appointmentTime}
        onChange={(event) => setAppointmentTime(event.target.value)}
      >
        <option value="">Select a time...</option>

        {doctorAppointmentTimes[selectedDoctorId]?.map(({ time }) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <button className="book-button" onClick={handleSelectAppointmentTime}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
