import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/PatientTable/Table'; // Step 1: Import the Table component
import { Modal } from '../components/PatientTable/Modal';
import patientsData from "../database/PatientsData";

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

  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
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
            <button onClick={() => setModalOpen(true)} className="button">
        Upload Image
      </button>
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
