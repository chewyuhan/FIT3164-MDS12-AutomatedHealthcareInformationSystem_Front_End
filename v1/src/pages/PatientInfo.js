import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/PatientTable/Table';
import { Modal } from '../components/PatientTable/Modal';
import patientsData from '../database/PatientsData';

function PatientInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState(patientsData);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setModalOpen(true); // Open the modal when an image is uploaded
    }
  };

  return (
    <div className="patientinfo">
      <div className="header">
        <Sidebar />
      </div>
      <h1>PatientInfo</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
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
          style={{ display: 'none' }}
        />
        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}C
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
            imagePreview={imagePreview}
          />
        )}
      </div>
    </div>
  );
}

export default PatientInfo;
