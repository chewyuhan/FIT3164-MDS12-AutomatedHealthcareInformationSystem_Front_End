import React, { useState } from 'react';
import './Imagemodel.css';
import Loading from '../Loading/Loading';
import { uploadImage } from '../../api/postImage';

function ImageDialog({ imageUrl, imageDir, onClose, onResponseData}) {
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    setLoading(true);
    try {
      await uploadImage(imageDir, onResponseData);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <div className="image-dialog-overlay">
      <div className="image-dialog">
        <h1>Uploaded Image</h1>
        <p className='disclaimer'>
          "Disclaimer: Due to hosting limits, the online version uses a less accurate 
          handwriting recognition <br></br>model than the local version and only one image can be sent every minute"
          </p>
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
