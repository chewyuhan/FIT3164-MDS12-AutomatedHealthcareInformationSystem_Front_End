import React, { useState } from 'react';
import patientsData from "../database/PatientsData";

const PatientDiagnosisForm = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (patientID) => {
    const selected = patientsData.find(patient => patient.patientID === patientID);
    setSelectedPatient(selected);
  };

  return (
    <div>
      <h2>Patient Diagnosis Form</h2>
      <label>Select a patient: </label>
      <select onChange={(e) => handlePatientSelect(e.target.value)}>
        <option value="">Select a patient</option>
        {patientsData.map(patient => (
          <option key={patient.patientID} value={patient.patientID}>
            {`${patient.firstName} ${patient.lastName}`}
          </option>
        ))}
      </select>

      {selectedPatient && (
        <div>
          <h3>Selected Patient Details</h3>
          <p><strong>ID:</strong> {selectedPatient.patientID}</p>
          <p><strong>Name:</strong> {`${selectedPatient.firstName} ${selectedPatient.lastName}`}</p>
          <p><strong>Gender:</strong> {selectedPatient.gender}</p>
          <p><strong>Date of Birth:</strong> {selectedPatient.dob}</p>
          <p><strong>Phone Number:</strong> {selectedPatient.phoneNo}</p>
          <p><strong>Nationality:</strong> {selectedPatient.nationality}</p>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyNo}</p>
          <p><strong>Emergency Remarks:</strong> {selectedPatient.emergencyRemarks}</p>
          <p><strong>Remarks:</strong> {selectedPatient.remarks}</p>
          <p><strong>Status:</strong> {selectedPatient.status}</p>
        </div>
      )}
    </div>
  );
};

export default PatientDiagnosisForm;
