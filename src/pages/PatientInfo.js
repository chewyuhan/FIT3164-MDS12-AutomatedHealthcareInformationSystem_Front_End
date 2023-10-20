import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import { Table } from '../components/PatientTable/Table';
import { Modal } from '../components/PatientTable/Modal';
import { addPatient, editPatient, fetchPatientDataFromAPI } from '../api/patient';
import ImageDialog from '../components/PatientTable/Imagemodel';
import './PatientInfo.css';
import Loading from '../components/Loading/Loading';



function PatientInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false); // Control the visibility of the image dialog
  const [uploadedImage, setUploadedImage] = useState(null); // Store the uploaded image
  const [imageFile, setImageFile] = useState(null)
  const [defaultValues, setDefaultValues] = useState({}); // Default values for the modal


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

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };



  // Function to handle form submission (add or edit patient)
  const handleSubmit = async (newRow) => {
    console.log("Submitting form data:", newRow);
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

  const handleImageButtonClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Allow only image files
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const imageLink = selectedFile
        const imageUrl = URL.createObjectURL(selectedFile);
        handleImageUpload(imageUrl, imageLink);
      }
    });

    // Trigger a click event on the hidden file input
    fileInput.click();
  };

  const handleImageUpload = (imageUrl, imageLink) => {
    setUploadedImage(imageUrl);
    setImageFile(imageLink)
    setShowImageDialog(true);
  };

  // Function to handle closing the image dialog
  const handleCloseImageDialog = () => {
    setShowImageDialog(false);
    // Reset the uploaded image when the dialog is closed
    setUploadedImage(null);
  };


  const handleImageDialogResponse = (responseData) => {
    // console.log('Response data from ImageDialog:', responseData);
    setUploadedImage(null);
    setRowToEdit(null);
    setShowImageDialog(false);

    const dataKeys = Object.keys(responseData);
    const defaultValues = {};
    dataKeys.forEach((key) => {
      defaultValues[key] = responseData[key] || '';
    });

    // Set the default values for the modal
    setDefaultValues(defaultValues);
    // console.log('defaultValues', defaultValues)
    setModalOpen(true);
    setRowToEdit(null);



  };

  // Render loading message if patient data is not yet available
  if (!rows) {
    return <Loading />
  }

  return (
    <div className='patientinfo'>
      {/* Sidebar component */}
      <Sidebar />

      <div className="main-content">
        <div className="add-search">
          <div className="add-upload">
            <div className="add">
              <button onClick={() => setModalOpen(true)} className="button">
                Add New Patient
              </button>
            </div>
            <div className="upload">
              <button onClick={handleImageButtonClick} className="button">
                Upload Image
              </button>
            </div>
          </div>
          <div className="search-container">
            <SearchBar setResults={setResults} rows={rows} setFilteredRows={setFilteredRows} />
          </div>
        </div>

        {results && results.length > 0 && (
          <p>Displaying {results.length} results.</p>
        )}

        <Table rows={filteredRows.length > 0 ? filteredRows : rows} editRow={handleEditRow} />

        {modalOpen && (
          // Modal component for adding/editing patient
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
              setDefaultValues({}); // Reset default values when closing the modal

            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null ? (rows[rowToEdit] || {}) : defaultValues}
          />
        )}

        {showImageDialog && (
          // ImageDialog component for displaying the uploaded image
          <ImageDialog className="image-dialog"
            imageUrl={uploadedImage}
            imageDir={imageFile}
            onClose={() => handleCloseImageDialog()}
            onResponseData={handleImageDialogResponse}
          />
        )}
      </div>
    </div>
  );
}

export default PatientInfo;
