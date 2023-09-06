import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      firstName:"",
      lastName: "",
      dob:"",
      gender: "",
      phoneNo: "",
      remarks: "",
      // status: "",
    }
  );
  const [errors, setErrors] = useState("");

// Function to validate the form
const validateForm = () => {
  const { firstName, lastName, dob, gender, phoneNo } = formState;

  if (firstName && lastName && dob && gender) {
    setErrors("");
    if (!isNaN(phoneNo)) {
      return true;
    } else {
      setErrors("Please enter a valid numeric value for contact info.");
      return false;
    }
  } else {
    const errorFields = Object.entries(formState)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    setErrors(errorFields.join(", "));
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

  //Check if form passes validation test
  if (validateForm()) {
    // if yes then update form details to rows in table
    onSubmit(formState);
    // closes the modal
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
        <form>
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
            <input name="dob" type = "date" onChange={handleChange} value={formState.dob} />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formState.gender}
              onChange={handleChange}
              
            > 
              <option value= "" disabled> Select gender</option>
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
          {/* <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value= "" disabled> Select status</option>
              <option value="Healthy">Healthy</option>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
            </select>
          </div> */}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
