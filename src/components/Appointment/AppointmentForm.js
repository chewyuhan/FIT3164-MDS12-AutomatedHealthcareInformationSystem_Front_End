import React, { useState, useEffect } from "react";
import "./AppointmentForm.css";
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentForm = ({
  closeModal,
  onSubmit,
  patients,
  selectedPatientId,
  setSelectedDoctorId,
  setSelectedPatientId,
  setAppointmentTime,
  doctors,
  appointmentTime,
  selectedDoctorId,
  defaultValue,
}) => {
  // State for form data and errors
  const [formData, setFormData] = useState(
    defaultValue || {
      patientId: "",
      employeeId: "",
      appointmentDateTime: "",
      reason: "",
      remarks: "",
      completed: false,
    }
  );

  // Set form data if a default value is provided
  useEffect(() => {
    if (defaultValue) {
      console.log("Setting form data with defaultValue:", defaultValue);
      setFormData(defaultValue);
      // Set selectedDoctorId and selectedPatientId based on formData
      setSelectedDoctorId(defaultValue.employeeId);
      setSelectedPatientId(defaultValue.patientId);
    }
  }, [defaultValue]);

  
  // Function to generate a time range for appointments
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
  // Array of appointment times for the selected doctor
  const doctorAppointmentTimes = generateTimeRange();


  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the input type is a checkbox and update the value accordingly
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };



  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
  
    let error = false;
  
    // Check if patient is selected
    if (!selectedPatientId) {
      toast.error("Patient must be selected.");
      error = true;
    }
    // Check if doctor is selected
    if (!selectedDoctorId) {
      toast.error("Doctor must be selected.");
      error = true;
    }
    // Check if appointment time is selected
    if (!appointmentTime) {
      toast.error("Appointment time must be selected.");
      error = true;
    }
  
    if (error) {
      // Display an error toast
    } else {
      // Clear any previous errors
  
      // Handle the appointment booking here
      handleSelectAppointmentTime();
  
      // Close the modal
      closeModal();
    }
  };
  
  
  // Function to handle doctor selection
  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };
  // Function to handle patient selection
  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
  };
  // Function to handle appointment time selection
  const handleSelectAppointmentTime = () => {
    const doctorName = getDoctorNameById(formData.employeeId);
    const patientName = getPatientNameById(formData.patientId);
    const completed = formData.completed === true || formData.completed === "true";

    const appointment = {
      patientId: selectedPatientId,
      employeeId: selectedDoctorId,
      date: new Date(),
      time: appointmentTime,
      remarks: formData.remarks,
      reason: formData.reason,
      completed: completed,
      doctor: doctorName,
      patient: patientName,
    };
    // You can handle the appointment data as needed
    // For example, you can submit it to an API using onSubmit
    console.log("Appointment:", appointment);
    onSubmit(appointment);
  };
  // Function to get the doctor's full name by ID
  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };
  // Function to get the patient's full name by ID
  const getPatientNameById = (patientID) => {
    const patient = patients.find((p) => p.patientId.toString() === patientID.toString());
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  return (
    <div className="appointment-form">
      <h1>Book an Appointment</h1>

      {/* Form for selecting a doctor */}
      <div className="form-group">
        <h2>Select a Doctor (Compulsory)</h2>
        <select
          className="doctor-select"
          value={defaultValue ? defaultValue.employeeId : selectedDoctorId || ""}          
          onChange={(event) => handleSelectDoctor(event.target.value)}
        >
          <option value="">Select a doctor...</option>
          {doctors.map((doctor) => (
            <option key={doctor.employeeId} value={doctor.employeeId}>
              {`${doctor.firstName} ${doctor.lastName}`}
            </option>
          ))}
        </select>
        <h2>Select a Patient (Compulsory)</h2>
        <select
          className="patient-select"
          value={defaultValue ? defaultValue.patientId : selectedPatientId || ""}          
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

      {/* Form for selecting an appointment time */}
      <div className="form-group">
        <h2>Select an Appointment Time (Compulsory)</h2>
        <select
          className="time-select"
          value={appointmentTime}
            onChange={(event) => {setAppointmentTime(event.target.value)}}
        >
          <option value="">Select a time...</option>
          {doctorAppointmentTimes.map(({ time }) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Form for marking a reason */}
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

      {/* Form for additional remarks */}
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

      {/* Form for marking appointment status */}
      <div className="form-group">
        <h2>Status</h2>
        <div className="checkbox">
          <label>Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="book-button" onClick={handleSubmit}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;