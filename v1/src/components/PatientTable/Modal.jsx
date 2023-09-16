import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  // State to manage form input values
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
      emergencyNo: null,
      emergencyRemarks: null,
      remarks: null,
    }
  );

  // State to manage form validation errors
  const [errors, setErrors] = useState("");

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

    if (
      firstName &&
      lastName &&
      dob &&
      gender &&
      ic &&
      nationality &&
      phoneNo &&
      email
    ) {
      if (!isNaN(phoneNo) && !isNaN(emergencyNo)) {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          setErrors("");
          return true;
        } else {
          setErrors("Please enter a valid email address.");
        }
      } else {
        setErrors("Please enter a valid numeric value for contact info.");
      }
    } else {
      const errorFields = Object.entries(formState)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
      setErrors(errorFields.join(", "));
    }
    return false;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check if form passes validation test
    if (validateForm()) {
      // If yes, update form details to rows in the table
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
          <h1 className="modal-title">Patient Details</h1>
          <form>
            {/* Form inputs */}
            {/* ... */}
            {errors && <div className="error">{`Please include: ${errors}`}</div>}
            {/* Submit button */}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
