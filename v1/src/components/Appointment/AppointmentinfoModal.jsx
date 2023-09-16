import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // Import Moment.js for date formatting
import './Modal.css';

const InfoModal = ({ modalInfo, onClose }) => {
  const modalRef = useRef(null);

  // Function to handle clicks outside of the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal when clicking outside
    }
  };

  // Attach and remove event listeners for handling clicks outside the modal
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Translations for key names in the modal
  const translations = {
    appointmentid: 'Appointment ID',
    registrationDateTime: 'Registration Date/Time',
    patientId: 'Patient ID',
    employeeid: 'Employee ID',
    appointmentDateTime: 'Appointment Date/Time',
    reason: 'Reason',
    remarks: 'Remarks',
    completed: 'Completed',
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2> Additional Patient Appointment Info</h2>
        </div>
        <div className="modal-body scrollable">
          {Object.entries(modalInfo).map(([key, value]) => (
            <p key={key}>
              {translations[key] || key}: {key === 'dob' || key === 'createdAt' || key === 'updatedAt' ? moment(value).format('DD/MM/YYYY') : value}
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
  modalInfo: PropTypes.object.isRequired, // Expected object for modalInfo
  onClose: PropTypes.func.isRequired, // Function to close the modal
};

export default InfoModal;
