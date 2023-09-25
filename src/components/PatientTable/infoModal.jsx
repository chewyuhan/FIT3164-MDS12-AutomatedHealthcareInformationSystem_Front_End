import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // Import moment for date formatting
import './Modal.css';

const InfoModal = ({ modalInfo, onClose }) => {
  const modalRef = useRef(null);

  // Function to close the modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Add an event listener for clicking outside the modal and remove it on cleanup
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Translation object for field labels
  const translations = {
    patientID: 'Patient ID',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    ic: 'IC',
    firstName: 'First Name',
    lastName: 'Last Name',
    dob: 'Date of Birth',
    phoneNo: 'Phone No',
    gender: 'Gender',
    description: 'Description',
    nationality: 'Nationality',
    email: 'Email',
    emergencyNo: 'Emergency No',
    emergencyRemarks: 'Emergency Remarks',
    remarks: 'Remarks',
    status: 'Status',
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2>Additional Patient Info</h2>
        </div>
        <div className="modal-body scrollable">
          {/* Map over modalInfo object and display key-value pairs */}
          {Object.entries(modalInfo).map(([key, value]) => (
            <p key={key}>
              {/* Display translations for known keys and format dates */}
              {key === 'patientId' ? 'Patient ID' : translations[key] || key}: {key === 'dob' || key === 'createdAt' || key === 'updatedAt' ? moment(value).format('DD/MM/YYYY') : value}
            </p>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

InfoModal.propTypes = {
  modalInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoModal;
