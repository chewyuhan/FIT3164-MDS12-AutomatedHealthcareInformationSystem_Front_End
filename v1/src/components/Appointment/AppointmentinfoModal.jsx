import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Modal.css';

const InfoModal = ({ modalInfo, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
  modalInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoModal;
