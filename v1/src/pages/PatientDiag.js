import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/Diagnosis/DiagnosisTable'; // Step 1: Import the Table component
import { Modal } from '../components/Diagnosis/DiagnosisModal';
import axios from 'axios';
import { addDiagnosis, editDiagnosis} from '../api/diagnosis';

function PatientDiag() {

  // Used to open Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]); //for search bar
  const [patients, setPatients] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const findLatestAppointmentTime = (appointments) => {
    if (!appointments || appointments.length === 0) {
      return "No appointments";
    }
    // Sort appointments by appointmentDateTime in descending order
    const sortedAppointments = appointments.sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime));
    return sortedAppointments[0].appointmentDateTime;
  };

  
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
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);
  
  

  //Edit row
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };


  const fetchDataAndUpdateRows = async () => {
    try {
      // Add a delay of 1 second (1000 milliseconds) before fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get("https://mds12.cyclic.app/patients/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log("Data fetched from API:", response.data);
        setPatients(response.data);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
  

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // Adding a new patient
        await addDiagnosis(newRow);
      } else {
        // Editing an existing patient
        const diagnosisId = diagnosis[rowToEdit].diagnosisId;
        await editDiagnosis(diagnosisId, newRow);
      }
  
      // Fetch and update the data from the API after the operation is complete
      fetchDataAndUpdateRows();
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
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        {/* Step 3: Include the Table component with the searchResults data */}
      </div>
      <div className="App">
        <button onClick={() => setModalOpen(true)} className="button">
          Add New Diagnosis
        </button>
        <Table patients={patients} editRow={handleEditRow} />
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && patients[rowToEdit]}
          />
        )}
      </div>



    </div>
  );
}

export default PatientDiag;
