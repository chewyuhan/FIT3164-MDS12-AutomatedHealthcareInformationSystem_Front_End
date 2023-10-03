import React from 'react';
import './Imagemodel.css';
import axios from 'axios';

function ImageDialog({ imageUrl, imageDir, onClose, onSubmit }) {

  const handleImageSubmit = async() => {
    // Create a new FormData object
    // Send a POST request to the server
    console.log(imageDir)

  try {
    const formData = new FormData();
    formData.append('image', imageDir);

    const response = await axios.post('http://localhost:5000/patient_htr_sample', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

  return (
    <div className="image-dialog-overlay">
      <div className="image-dialog">
        <h1>Uploaded Image</h1>
        <img className="image" src={imageUrl} alt="Uploaded Image" />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <button className="submit-button" onClick={handleImageSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ImageDialog;
