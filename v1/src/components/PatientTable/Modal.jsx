import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, imagePreview, isOpen }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phoneNo: "",
      remarks: "",
      status: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.firstName && formState.lastName && formState.dob && formState.gender) {
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
    e.preventDefault();
    if (!validateForm()) return;
    if (!isNaN(formState.phoneNo)) {
      onSubmit(formState);
      closeModal();
    } else {
      setErrors("Please enter a valid numeric value for contact info.");
    }
  };

  return (
    <div className={`modal-container ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target.className.includes("modal-container")) closeModal(); }}>
      <div className="modal">
        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" onChange={handleChange} value={formState.firstName} placeholder="Patient first name"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" onChange={handleChange} value={formState.lastName} placeholder="Patient last name"/>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input name="dob" type="date" onChange={handleChange} value={formState.dob} />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formState.gender}
              onChange={handleChange}
            >
              <option value="" disabled> Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number</label>
            <input name="phoneNo" onChange={handleChange} value={formState.phoneNo} placeholder="Phone number"/>
          </div>
          <div className="form-group">
            <label htmlFor="remarks">Remarks</label>
            <textarea
              name="remarks" placeholder="Optional remarks"
              onChange={handleChange}
              value={formState.remarks}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="" disabled> Select status</option>
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
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
};
