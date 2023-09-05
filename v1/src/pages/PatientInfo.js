import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/PatientTable/Table'; // Step 1: Import the Table component
import { Modal } from '../components/PatientTable/Modal';
import patientsData from "../database/PatientsData"; // Connect to dummy data

function PatientInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]); //for search bar


  const [rows, setRows] = useState(patientsData);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };


  //For uploading and viewing Image
  const [file, setFile] = useState(); // State for the uploaded image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  }

    // Handle dropped image files
    function handleDrop(e) {
      e.preventDefault();
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
      }
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }

      // Handle image selection using the hidden input
    function handleImageChange(e) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
      }
    }


  return (
    <div className='patientinfo'>
      <div className="header">
        <Sidebar />
      </div>
      <h1>PatientInfo</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        {/* Step 3: Include the Table component with the searchResults data */}
      </div>
      <div className="App">
      <button onClick={() => setModalOpen(true)} className="button">
        Add New Patient
      </button>
      <label htmlFor="image-upload" className="button">
          Upload Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hide the input
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
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {modalOpen && (
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
      


    </div>
  );
}

export default PatientInfo;
