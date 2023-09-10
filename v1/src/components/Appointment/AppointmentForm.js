import React, { useState } from "react";
import moment from 'moment';
import "./AppointmentForm.css";
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({
  closeModal,
  onSubmit,
  defaultValue,
  patients,
  selectedPatientId,
  doctors,
  appointmentTime,
  selectedDoctorId,
  handleSelectAppointmentTime
}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    employeeId: "",
    appointmentDateTime: "",
    reason: "",
    remarks: "",
    completed: false,
  });



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


  const handleSubmit = () => {
    // Validate the form data
    if (
      Number.isInteger(parseInt(formData.patientId)) &&
      Number.isInteger(parseInt(formData.employeeId)) &&
      moment(formData.appointmentDateTime, moment.ISO_8601, true).isValid() &&
      typeof formData.reason === "string" &&
      typeof formData.remarks === "string" &&
      typeof formData.completed === "boolean"
    ) {
      // Form data is valid, you can use formData for further processing
      console.log("Form data submitted:", formData);
    } else {
      // Form data is invalid, display an error message
      console.error("Invalid form data.");
    }
  };

  return (
    <div className="appointment-form">
      <h1>Book an Appointment</h1>
      <div className="form-group">
        <h2>Select a Doctor</h2>
        <select
          className="doctor-select"
          value={selectedDoctorId || ""}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
      <button className="book-button" onClick={handleSelectAppointmentTime}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
