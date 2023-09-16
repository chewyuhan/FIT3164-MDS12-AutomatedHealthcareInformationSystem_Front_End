// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import { Table } from '../components/PatientTable/Table';
import { Modal } from '../components/PatientTable/Modal';
import { addPatient, editPatient, fetchPatientDataFromAPI } from '../api/patient';

function PatientInfo() {
  // State variables
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch patient data from the API when the component mounts
    fetchPatientDataFromAPI()
      .then((response) => {
        setRows(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Function to fetch data from the API and update rows
  const fetchDataAndUpdateRows = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      const response = await fetchPatientDataFromAPI();
      setRows(response);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  // Function to handle editing a row
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Function to handle form submission (add or edit patient)
  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // Adding a new patient
        await addPatient(newRow);
      } else {
        // Editing an existing patient
        const patientId = rows[rowToEdit].patientId;
        await editPatient(patientId, newRow);
      }
      fetchDataAndUpdateRows(); // Update rows after adding/editing
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Render loading message if patient data is not yet available
  if (!rows) {
    return <p>Loading patient data...</p>;
  }

  return (
    <div className='patientinfo'>
      {/* Sidebar component */}
      <Sidebar />
      <div className="header">
        <h1>PatientInfo</h1>
      </div>
      <div className="search-bar-container">
        {/* SearchBar component */}
        <SearchBar setResults={setResults} rows={rows} setFilteredRows={setFilteredRows} />
        {results && results.length > 0}
      </div>
      <div className='search-add-upload'>
        <button onClick={() => setModalOpen(true)} className="button add-button">
          Add New Patient
        </button>
        <label htmlFor="image-upload" className="button upload-button">
          Upload Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {imagePreview && (
          <div className="image-preview">
            <button
              className="close-button"
              onClick={() => {
                setFile(null);
                setImagePreview(null);
              }}
            >
              Close
            </button>
            <img src={imagePreview} alt="Uploaded" />
          </div>
        )}
      </div>
      {/* Table component */}
      <Table rows={filteredRows.length > 0 ? filteredRows : rows} editRow={handleEditRow} />
      {modalOpen && (
        // Modal component for adding/editing patient
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default PatientInfo;
