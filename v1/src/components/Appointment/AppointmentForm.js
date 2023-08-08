import React from "react";
import Calendar from "react-calendar";
import './AppointmentForm.css'

const AppointmentForm = ({ doctors, appointmentDate, setAppointmentDate, appointmentTime, setAppointmentTime, selectedDoctorId, setSelectedDoctorId, handleSelectAppointmentTime }) => {
  const appointmentTimesData = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    // Simulate fetching appointment times for the selected doctor
    // Replace this with your actual data fetching logic
    const times = doctorAppointmentTimes[doctorId] || [];
    setAppointmentTime(times[0] || "");
  };

  // Define an object to hold appointment times for each doctor
  const doctorAppointmentTimes = {
    1: ["9:00 AM", "10:00 AM", "11:00 AM"],
    2: ["1:00 PM", "2:00 PM", "3:00 PM"],
    3: ["10:00 AM", "2:00 PM", "4:00 PM"],
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
        {appointmentTimesData.map((time) => (
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
