import React, { useState } from "react";
import moment from 'moment';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      firstName: "",
      lastName: "",
      dob: "",
      ic: "",
      gender: "",
      nationality: "",
      phoneNo: "",
      email: "",
      emergencyNo: "",
      emergencyRemarks: "",
      remarks: "",
      // status: "",
    }
  );
  const [errors, setErrors] = useState("");

  // Function to validate the form
  const validateForm = () => {
    const { firstName, lastName, dob, gender, phoneNo, ic, nationality} = formState;

    if (firstName && lastName && dob && gender && ic && nationality && phoneNo) {
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

    //console.log(formState)

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
        <div className="modal-header">
          <h1 className="modal-title">Patient Details</h1>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input name="firstName" onChange={handleChange} value={formState.firstName} placeholder="Patient first name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input name="lastName" onChange={handleChange} value={formState.lastName} placeholder="Patient last name" />
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
              <label htmlFor="nationality">Nationality</label>
              <input name="nationality" onChange={handleChange} value={formState.nationality} placeholder="Patient Nationality" />
            </div>
            <div className="form-group">
              <label htmlFor="ic">Identification Number</label>
              <input name="ic" onChange={handleChange} value={formState.ic} placeholder="Identification Number" />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input name="phoneNo" onChange={handleChange} value={formState.phoneNo} placeholder="Phone number" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="email" onChange={handleChange} value={formState.email} placeholder="Patient email" />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyNo">Emergency Number</label>
              <input name="emergencyNo" onChange={handleChange} value={formState.emergencyNo} placeholder="Optional Emergency Number" />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyRemarks">Emergency Remarks</label>
              <input name="emergencyRemarks" onChange={handleChange} value={formState.emergencyRemarks} placeholder="Optional Emergency Remarks" />
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
    </div>
  );
};
