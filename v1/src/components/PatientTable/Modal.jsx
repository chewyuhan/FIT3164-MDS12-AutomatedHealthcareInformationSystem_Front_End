import React, { useState } from "react";
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css'

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      patientName: "",
      dob:"",
      gender: "",
      contactInfo: "",
      description: "",
      status: "Stable",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.patientName && formState.description && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); //wont refresh page

    if (!validateForm()) return;

    if (!isNaN(formState.contactInfo)) {
      onSubmit(formState);

      closeModal();
    } else {
      setErrors("Please enter a valid numeric value for contact info.");
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
        <form>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input name="patientName" onChange={handleChange} value={formState.patientName} />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input name="dob" type = "date" onChange={handleChange} value={formState.dob} />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formState.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="contactInfo">Contact</label>
            <input name="contactInfo" onChange={handleChange} value={formState.contactInfo} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Healthy">Healthy</option>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
