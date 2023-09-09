import React, { useState } from "react";
import moment from 'moment';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      appointmentId: "",
      registrationDateTime: "",
      patientId: "",
      employeeId: "",
      appointmentDateTime: "",
      reason: "",
      remarks: "",
      completed: false,
    }
  );

  const [errors, setErrors] = useState(""); // Add errors state

  // Function to validate the form
  const validateForm = () => {
    const {
      appointmentId,
      registrationDateTime,
      patientId,
      employeeId,
      appointmentDateTime,
      reason,
      remarks,
      completed,
    } = formState;

    if (
      appointmentId !== "" &&
      registrationDateTime !== "" &&
      patientId !== "" &&
      employeeId !== "" &&
      appointmentDateTime !== "" &&
      reason !== ""
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Please fill in all required fields.");
      return false;
    }
  };


  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check if form passes validation test
    if (validateForm()) {
      // If yes, update form details to rows in table
      onSubmit(formState);
      // Close the modal
      closeModal();
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h1 className="modal-title">Appointment Details</h1>
          <form>
            <div className="form-group">
              <label htmlFor="appointmentId">Appointment ID</label>
              <input
                name="appointmentId"
                onChange={handleChange}
                value={formState.appointmentId}
                placeholder="Appointment ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationDateTime">Registration Date/Time</label>
              <input
                name="registrationDateTime"
                type="datetime-local"
                onChange={handleChange}
                value={moment(formState.registrationDateTime).format("YYYY-MM-DDTHH:mm")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                name="patientId"
                onChange={handleChange}
                value={formState.patientId}
                placeholder="Patient ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID</label>
              <input
                name="employeeId"
                onChange={handleChange}
                value={formState.employeeId}
                placeholder="Employee ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="appointmentDateTime">Appointment Date/Time</label>
              <input
                name="appointmentDateTime"
                type="datetime-local"
                onChange={handleChange}
                value={moment(formState.appointmentDateTime).format("YYYY-MM-DDTHH:mm")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason</label>
              <input
                name="reason"
                onChange={handleChange}
                value={formState.reason}
                placeholder="Reason"
              />
            </div>
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                name="remarks"
                placeholder="Remarks"
                onChange={handleChange}
                value={formState.remarks}
              />
            </div>
            <div className="form-group">
              <label htmlFor="completed">Completed</label>
              <select
                name="completed"
                onChange={handleChange}
                value={formState.completed}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            {errors && <div className="error">{errors}</div>}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
