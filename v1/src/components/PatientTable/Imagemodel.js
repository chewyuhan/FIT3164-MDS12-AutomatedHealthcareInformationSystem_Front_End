import React from 'react';
import './Imagemodel.css';

function ImageDialog({ imageUrl, onClose }) {
  return (
    <div className="image-dialog-overlay">
      <div className="image-dialog">
        <h1>Uploaded Image</h1>
        <img className = 'image' src={imageUrl} alt="Uploaded Image" />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      
    </div>
  );
}

export default ImageDialog;
