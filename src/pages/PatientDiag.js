// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import { Table } from '../components/Diagnosis/DiagnosisTable';
import { Modal } from '../components/Diagnosis/DiagnosisModal';
import { addDiagnosis } from '../api/diagnosis';
import { fetchPatientDataFromAPI } from '../api/patient';
import { fetchAppointmentsbyPatient } from '../api/appointment';
import Loading from '../components/Loading/Loading';

function PatientDiag() {
  // State variables
  const [modalOpen, setModalOpen] = useState(false);
  const [patients, setPatients] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]); // Create state for filtered rows

  useEffect(() => {
    // Fetch patient data from the API when the component mounts
    fetchPatientDataFromAPI()
      .then(async (response) => {
        // Handle the response and update the user data state
        console.log("API call response:", response);
        const patientsData = response;

        // Fetch and update the latest appointment time for each patient
        const updatedPatients = [];
        for (const patient of patientsData) {
          const appointments = await fetchAppointmentsbyPatient(patient.patientId);
          patient.latestAppointmentDateTime = findLatestAppointmentTime(appointments);
          updatedPatients.push(patient);
        }

        console.log("Updated patients:", updatedPatients);
        setPatients(updatedPatients);
        setFilteredRows(updatedPatients); // Initialize filteredRows with all patients
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Function to find the latest appointment time for a patient
  const findLatestAppointmentTime = (appointments) => {
    if (!appointments || appointments.length === 0) {
      return "No appointments";
    }
    // Sort appointments by appointmentDateTime in descending order
    const sortedAppointments = appointments.sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime));
    return sortedAppointments[0].appointmentDateTime;
  };

  // Function to handle the submission of a new diagnosis
  const handleSubmit = async (newRow) => {
    try {
      console.log("Adding new diagnosis:", newRow);
      // Adding a new diagnosis
      await addDiagnosis(newRow);
      console.log("Added new diagnosis");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Render loading message if patient data is not yet available
  if (!patients) {
    return <Loading />
  }

  return (
    <div className='patientinfo'>
      {/* Sidebar component */}
      <Sidebar />
      <div className="add-search">
        <div className="add-upload">
        <div className="add">
        <button onClick={() => setModalOpen(true)} className="button">
          Add New Diagnosis
        </button>
        </div>
          <div className="search-container">
          <SearchBar rows={patients} setFilteredRows={setFilteredRows} />
          </div>
        </div>
        {/* Display the Table component with filtered or unfiltered patients */}
        {filteredRows && filteredRows.length > 0 && (
          <Table patients={filteredRows} />
        )}
        {filteredRows.length === 0 && (
          <Table patients={patients} />
        )}
      </div>
      {/* Display the Modal for adding a new diagnosis if modalOpen is true */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default PatientDiag;
