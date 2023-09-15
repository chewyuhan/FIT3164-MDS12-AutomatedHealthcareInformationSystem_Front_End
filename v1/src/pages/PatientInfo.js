import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import { Table } from '../components/PatientTable/Table';
import { Modal } from '../components/PatientTable/Modal';
import { addPatient, editPatient } from '../api/patient';

function PatientInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      axios.get("https://mds12.cyclic.app/patients/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          setRows(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const fetchDataAndUpdateRows = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get("https://mds12.cyclic.app/patients/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setRows(response.data);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        await addPatient(newRow);
      } else {
        const patientId = rows[rowToEdit].patientId;
        await editPatient(patientId, newRow);
      }
      fetchDataAndUpdateRows();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  if (!rows) {
    return <p>Loading patient data...</p>;
  }

  return (
    <div className='patientinfo'>
      <Sidebar />
      <div className="header">
        <h1>PatientInfo</h1>
      </div>
      <div className="search-bar-container">
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
      <Table rows={filteredRows.length > 0 ? filteredRows : rows} editRow={handleEditRow} />
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
  );
}

export default PatientInfo;
