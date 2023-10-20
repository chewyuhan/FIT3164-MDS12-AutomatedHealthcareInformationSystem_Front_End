import React, { useState } from "react";
import moment from 'moment';
import "./Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dob: "",
    ic: "",
    gender: "",
    nationality: "",
    phoneNo: "",
    email: "",
    emergencyNo: null,
    emergencyRemarks: null,
    remarks: null,
  };

  const [formState, setFormState] = useState(defaultValue || initialFormState);

  // Function to validate the form
  const validateForm = () => {
    const {
      firstName,
      lastName,
      dob,
      gender,
      ic,
      nationality,
      phoneNo,
      email,
      emergencyNo,
    } = formState;

    if (!firstName) {
      toast.error("Please enter a valid first name.");
    }

    if (!lastName) {
      toast.error("Please enter a valid last name.");
    }

    if (!dob) {
      toast.error("Please enter a valid date of birth.");
    }

    if (!gender) {
      toast.error("Please select a valid gender.");
    }

    if (!ic) {
      toast.error("Please enter a valid IC number.");
    }

    if (!nationality) {
      toast.error("Please enter a valid nationality.");
    }

    if (!phoneNo || isNaN(phoneNo)) {
      toast.error("Please enter a valid numeric value for phone number.");
    }

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address.");
    }

    if (!emergencyNo || isNaN(emergencyNo)) {
      toast.error("Please enter a valid numeric value for emergency contact number.");
    }

    if (firstName && lastName && dob && gender && ic && nationality && phoneNo && email) {
      return true;
    } else {
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
      // If yes then update form details to rows in table
      onSubmit(formState);
      // Closes the modal
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
              <h2 htmlFor="firstName">First Name (Compulsory)</h2>
              <input
                name="firstName"
                onChange={handleChange}
                value={formState.firstName}
                placeholder="Patient first name"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="lastName">Last Name (Compulsory)</h2>
              <input
                name="lastName"
                onChange={handleChange}
                value={formState.lastName}
                placeholder="Patient last name"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="dob">Date of Birth (Compulsory)</h2>
              <input
                name="dob"
                type="date"
                onChange={handleChange}
                defaultValue={
                  formState.dob
                    ? moment(formState.dob).format("YYYY-MM-DD")
                    : ""
                }
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="gender">Gender (Compulsory)</h2>
              <select
                name="gender"
                value={formState.gender}
                onChange={handleChange}
              >
                <option value="">
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <h2 htmlFor="nationality">Nationality (Compulsory)</h2>
              <input
                name="nationality"
                onChange={handleChange}
                value={formState.nationality}
                placeholder="Patient Nationality"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="ic">Identification Number (Compulsory)</h2>
              <input
                name="ic"
                onChange={handleChange}
                value={formState.ic}
                placeholder="Identification Number"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="phoneNo">Phone Number (Compulsory)</h2>
              <input
                name="phoneNo"
                onChange={handleChange}
                value={formState.phoneNo}
                placeholder="Phone number"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="email">Email (Compulsory)</h2>
              <input
                name="email"
                onChange={handleChange}
                value={formState.email}
                placeholder="Patient Email"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="emergencyNo">Emergency Number (Compulsory)</h2>
              <input
                name="emergencyNo"
                onChange={handleChange}
                value={formState.emergencyNo}
                placeholder="Optional Emergency Number"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="emergencyRemarks">Emergency Remarks (Compulsory)</h2>
              <input
                name="emergencyRemarks"
                onChange={handleChange}
                value={formState.emergencyRemarks}
                placeholder="Optional Emergency Remarks"
              />
            </div>
            <div className="form-group">
              <h2 htmlFor="remarks">Remarks</h2>
              <textarea
                name="remarks"
                placeholder="Optional remarks"
                onChange={handleChange}
                value={formState.remarks}
              />
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
