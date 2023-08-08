import React from "react";
import Calendar from "react-calendar";
import './AppointmentForm.css';
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({ doctors, appointmentDate, setAppointmentDate, appointmentTime, setAppointmentTime, selectedDoctorId, setSelectedDoctorId, handleSelectAppointmentTime }) => {

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    const timesAndName = doctorAppointmentTimes[doctorId] || [];
    setAppointmentTime(timesAndName[0]?.time || "");
  };

  const doctorAppointmentTimes = {
    1: [
      { time: "9:00 AM", doctorName: "Dr. Smith" },
      { time: "10:00 AM", doctorName: "Dr. Smith" },
      { time: "11:00 AM", doctorName: "Dr. Smith" },
    ],
    2: [
      { time: "11:00 PM", doctorName: "Dr. Jones" },
      { time: "21:00 PM", doctorName: "Dr. Jones" },
      { time: "31:00 PM", doctorName: "Dr. Jones" },
    ],
    3: [
      { time: "10:00 AM", doctorName: "Dr. Brown" },
      { time: "2:00 PM", doctorName: "Dr. Brown" },
      { time: "4:00 PM", doctorName: "Dr. Brown" },
    ],
  };

  return (
    <div className="appointment-form">
      <h1>Book an Appointment</h1>
      <h2>Select a Date</h2>
      <div className="calendar-container">
        <Calendar
          className="calendar"
          value={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
        />
      </div>
      <h2>Select a Doctor</h2>
      <select
        className="doctor-select"
        onChange={(event) => handleSelectDoctor(event.target.value)}
      >
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
