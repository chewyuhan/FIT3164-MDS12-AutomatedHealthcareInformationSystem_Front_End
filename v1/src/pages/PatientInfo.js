import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/PatientTable/Table'; // Step 1: Import the Table component
import { Modal } from '../components/PatientTable/Modal';

function PatientInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);



  const [rows, setRows] = useState([
    {
      patientName: "Adam",
      contactInfo: "0123456787",
      description: "Man",
      status: "Healthy",
      dob: "2023-02-19",
    },
    {
      patientName: "Eve",
      contactInfo: "0123456788",
      description: "Woman",
      status: "Stable",
      dob: "2023-02-20",
    },
    {
      patientName: "Zeus",
      contactInfo: "0123456780",
      description: "Child",
      status: "Critical",
      dob: "2023-02-21",
    },
    {
      patientName: "Zeus",
      contactInfo: "0123456780",
      description: "Child",
      status: "Critical",
      patientID: "A1234",
      creratedAT: "2001-02-03", // Format: YYYY-MM-dd
      updatedAt: "2001-02-03",   // Format: YYYY-MM-dd
      ic: "011101110111",
      firstName: "",
      lastName: "",
      dob: "2023-02-18", // Format: YYYY-MM-dd
      gender: "0123456780",
      nationality: "Child",
      phoneNo: "Child",
      email: "Child",
      emergencyNo: "Child",
      emergencyRemarks: "Child",
      remarks: "Child",
    },
  ]);
  

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
