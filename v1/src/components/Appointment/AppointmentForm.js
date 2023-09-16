import React, { useState } from "react";
import "./AppointmentForm.css";
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({
  closeModal,
  onSubmit,
  defaultValue,
  patients,
  selectedPatientId,
  setSelectedDoctorId,
  setSelectedPatientId,
  setAppointmentTime,
  doctors,
  appointmentTime,
  selectedDoctorId,
}) => {
  const [formData, setFormData] = useState(
    defaultValue || {
      patientId: "",
      employeeId: "",
      appointmentDateTime: "",
      reason: "",
      remarks: "",
      completed: false,
    });

  const [errors, setErrors] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check if required fields are selected
    if (!selectedPatientId || !selectedDoctorId || !appointmentTime) {
      setErrors("Patient, doctor, and appointment time must be selected.");
    } else {
      // Clear any previous errors
      setErrors("");

      // Handle the appointment booking here
      handleSelectAppointmentTime();

      // Close the modal
      closeModal();
    }
  };

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleSelectAppointmentTime = () => {
    const doctorName = getDoctorNameById(selectedDoctorId);
    const patientName = getPatientNameById(selectedPatientId);
    const appointment = {
      patientID: selectedPatientId,
      employeeID: selectedDoctorId,
      date: new Date(), // You may want to set the correct date here
      time: appointmentTime,
      remarks: "",
      reason: "",
      completed: false,
      doctor: doctorName,
      patient: patientName,
    };
    // You can handle the appointment data as needed
    // For example, you can submit it to an API using onSubmit
    onSubmit(appointment);
  };

  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const getPatientNameById = (patientID) => {
    const patient = patients.find((p) => p.patientId.toString() === patientID.toString());
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  return (
    <div className="appointment-form">
      <h1>Book an Appointment</h1>
      <div className="form-group">
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
      </div>
      <div className="form-group">
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
      </div>
      <div className="form-group">
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
      </div>
      <div className="form-group">
        <h2>Mark a Reason</h2>
        <textarea
          type="text"
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <h2>Additional Remarks</h2>
        <textarea
          type="text"
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <h2>Status</h2>
        <div className="checkbox">
          <label>
            Completed
          </label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
        </div>
      </div>
      {errors && <p className="error">{errors}</p>}
      <button type="submit" className="book-button" onClick={handleSubmit}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
