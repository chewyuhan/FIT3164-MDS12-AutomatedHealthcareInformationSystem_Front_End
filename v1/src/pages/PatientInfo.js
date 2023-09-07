import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
import { Table } from '../components/PatientTable/Table'; // Step 1: Import the Table component
import { Modal } from '../components/PatientTable/Modal';
import axios from 'axios';
import { addPatient, editPatient} from '../api/patient';

function PatientInfo() {

  // Used to open Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]); //for search bar
  const [rows, setRows] = useState(null);


  useEffect(() => {
    // Retrieve the access token from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");
    // If the access token exists, you can use it for authenticated API calls
    if (accessToken) {
      // Make an authenticated API call using the access token
      axios.get("https://mds12.cyclic.app/patients/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          // Handle the response and update the user data state
          console.log("API call response:", response.data)
          setRows(response.data);
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
        setRows(response.data);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
  

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
  
      // Fetch and update the data from the API after the operation is complete
      fetchDataAndUpdateRows();
    } catch (error) {
      console.error("Error:", error);
    }
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

  // // Handle dropped image files
  // function handleDrop(e) {
  //   e.preventDefault();
  //   const selectedFile = e.dataTransfer.files[0];
  //   if (selectedFile && selectedFile.type.startsWith('image/')) {
  //     setFile(selectedFile);
  //     setImagePreview(URL.createObjectURL(selectedFile));
  //   }
  // }

  // function handleDragOver(e) {
  //   e.preventDefault();
  // }


  if (!rows) {
    return <p>Loading patient data...</p>;
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
        <Table rows={rows} editRow={handleEditRow} />
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
