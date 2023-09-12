import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      diagnosisId: "",
      createdAt: "",
      updatedAt: "",
      appointmentId: "",
      icd: "",
      symptoms: "",
      remarks: "",
    }
  );
  const [errors, setErrors] = useState("");
  const [patients, setPatients] = useState([]); // To store patient data
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [employees, setEmployees] = useState([]); // To store employee data
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [fetchError, setFetchError] = useState(null); // To store fetch errors

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    // Fetch patient data from the API
    const fetchPatientData = async () => {
      try {
        const response = await axios.get("https://mds12.cyclic.app/patients/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setFetchError("Error fetching patient data. Please try again later.");
      }
    };

    // Fetch employee data from the API
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("https://mds12.cyclic.app/employees/doctors", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setFetchError("Error fetching employee data. Please try again later.");
      }
    };

    fetchPatientData();
    fetchEmployeeData();
  }, []);

  // Function to validate the form
  const validateForm = () => {
    const {
      appointmentId,
      icd,
      symptoms,
      remarks
    } = formState;

    if (
      !isNaN(appointmentId) && /^\d+$/.test(appointmentId) &&
      typeof selectedPatientId === 'number' &&
      typeof selectedEmployeeId === 'number' &&
      typeof icd === 'string' &&
      typeof symptoms === 'string'
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Please enter valid data for all fields.");
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
          <h1 className="modal-title">Diagnosis Details</h1>
          <form>
            <div className="form-group">
              <label htmlFor="employeeId">Select Employee</label>
              <select
                name="employeeId"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="patientId">Select Patient</label>
              <select
                name="patientId"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(Number(e.target.value))}
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="icd">ICD</label>
              <input
                name="icd"
                onChange={handleChange}
                value={formState.icd}
                placeholder="ICD Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms</label>
              <input
                name="symptoms"
                onChange={handleChange}
                value={formState.symptoms}
                placeholder="Symptoms"
              />
            </div>
            <div className="form-group">
              <label htmlFor="remarks">Remarks (Optional)</label>
              <input
                name="remarks"
                onChange={handleChange}
                value={formState.remarks}
                placeholder="Remarks"
              />
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
