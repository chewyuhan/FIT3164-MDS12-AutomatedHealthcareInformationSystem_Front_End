import React, { useState } from 'react';
import './Imagemodel.css';
import axios from 'axios';
import Loading from '../Loading/Loading';

function ImageDialog({ imageUrl, imageDir, onClose, onResponseData}) {
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', imageDir);

      const response = await axios.post('https://mds12htr.cyclic.app/patient_htr_sample', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
      setLoading(false);
      onResponseData(response.data); // Assuming you want to do something with the response data
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <div className="image-dialog-overlay">
      <div className="image-dialog">
        <h1>Uploaded Image</h1>
        <img className="image" src={imageUrl} alt="Uploaded Image" />
        {loading && <Loading />} {/* Show the Loading component when loading is true */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <button className="submit-button" onClick={handleImageSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default ImageDialog;
