import React, { useState } from 'react';
import './Imagemodel.css';
import { Modal } from './Modal';

function ImageDialog({ imageUrl, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageSubmission = () => {
    setModalOpen(true);
  };
  const temp_obj = {
        "ic": "010724120833",
        "firstName": "Andrew",
        "lastName": "Shieh",
        "dob": "2001-07-24",
        "gender": "Male",
        "nationality": "Malaysian",
        "phoneNo": "0109326110",
        "email": "aw.shieh12@gmail.com",
        "emergencyNo": "0103916110",
        "emergencyRemarks": "Save my computer",
        "remarks": "Call my number"
    }

  return (
    <div className="image-dialog-overlay">
      <div className="image-dialog">
        <h1>Uploaded Image</h1>
        <img className="image" src={imageUrl} alt="Uploaded Image" />
        <div>
          <button onClick={handleImageSubmission}>Submit</button>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
            }}
            defaultValue={temp_obj}
          >
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ImageDialog;
