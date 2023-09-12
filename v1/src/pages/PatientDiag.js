import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/Diagnosis/DiagnosisTable';
import { Modal } from '../components/Diagnosis/DiagnosisModal';
import axios from 'axios';
import { addDiagnosis } from '../api/diagnosis';

function PatientDiag() {
  const [modalOpen, setModalOpen] = useState(false);
  const [patients, setPatients] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]); // Create state for filtered rows

  useEffect(() => {
    // Retrieve the access token from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");
    // If the access token exists, you can use it for authenticated API calls
    if (accessToken) {
      // Make an authenticated API call to fetch patient data
      axios.get("https://mds12.cyclic.app/patients/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(async (response) => {
          // Handle the response and update the user data state
          console.log("API call response:", response.data);
          const patientsData = response.data;

          // Fetch appointments for each patient
          const fetchAppointments = async (patientId) => {
            try {
              const appointmentResponse = await axios.get(`https://mds12.cyclic.app/appointments/patient/${patientId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              });
              return appointmentResponse.data;
            } catch (error) {
              console.error("Error fetching appointments:", error);
              return [];
            }
          };

          // Fetch and update the latest appointment time for each patient
          const updatedPatients = [];
          for (const patient of patientsData) {
            const appointments = await fetchAppointments(patient.patientId);
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
    }
  }, []);

  const findLatestAppointmentTime = (appointments) => {
    if (!appointments || appointments.length === 0) {
      return "No appointments";
    }
    // Sort appointments by appointmentDateTime in descending order
    const sortedAppointments = appointments.sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime));
    return sortedAppointments[0].appointmentDateTime;
  };

  const handleSubmit = async (newRow) => {
    try {
      console.log("Adding new diagnosis:", newRow);
      // Adding a new patient
      await addDiagnosis(newRow);
      console.log("Added new diagnosis");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!patients) {
    return <p>Loading patient data...</p>;
  }

  return (
    <div className='patientinfo'>
      <div className="header">
        <Sidebar />
      </div>
      <h1>Patient Diagnosis</h1>
      <div className="search-bar-container">
        {/* Pass patients and setFilteredRows to the SearchBar component */}
        <SearchBar rows={patients} setFilteredRows={setFilteredRows} />
        {filteredRows && filteredRows.length > 0 && (
          <Table patients={filteredRows} />
        )}
        {filteredRows.length === 0 && (
          <Table patients={patients} />
        )}
      </div>
      <div className="App">
        <button onClick={() => setModalOpen(true)} className="button">
          Add New Diagnosis
        </button>
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default PatientDiag;
