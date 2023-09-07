import React from "react";
import './AppointmentForm.css';
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({
  patients,
  selectedPatientId,
  setSelectedPatientId,
  doctors,
  appointmentTime,
  setAppointmentTime,
  selectedDoctorId,
  setSelectedDoctorId,
  handleSelectAppointmentTime
}) => {
  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const generateTimeRange = () => {
    const timeRange = [];

    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 20) {
        if (!(hour === 13 && minute >= 0 && minute < 20)) {
          const formattedTime = `${hour % 12 || 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
          timeRange.push({ time: formattedTime });
        }
      }
    }

    return timeRange;
  };

  const doctorAppointmentTimes = generateTimeRange();

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
          <option key={doctor.employeeId} value={doctor.employeeId}>
            {`${doctor.firstName} ${doctor.lastName}`}
          </option>
        ))}
      </select>
      <h2>Select a Patient</h2>
      <select
        className="patient-select"
        value={selectedPatientId || ""}
        onChange={(event) => handleSelectPatient(event.target.value)}
      >
        <option value="">Select a patient...</option>
        {patients.map((patient) => (
          <option key={patient.patientId} value={patient.patientId}>
            {`${patient.firstName} ${patient.lastName}`}
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
        {doctorAppointmentTimes.map(({ time }) => (
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
