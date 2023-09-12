import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Modal.css';
import { fetchDiagnosisDataFromAPI } from '../../api/diagnosis';

const InfoModal = ({ modalInfo, onClose, patientId }) => {
  const modalRef = useRef(null);
  const [diagnosisData, setDiagnosisData] = useState([]);

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

  useEffect(() => {
    if (patientId) {
      fetchDiagnosisDataFromAPI(patientId)
        .then((data) => {
          // Sort the diagnosis data by "Created At" date in descending order
          data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
          setDiagnosisData(data);
        })
        .catch((error) => {
          console.error('Error fetching diagnosis data:', error);
        });
    }
  }, [patientId]);

  const translations = {
    // ... (other translations as before)
    diagnosisId: 'Diagnosis ID',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    appointmentId: 'Appointment ID',
    icd: 'ICD',
    symptoms: 'Symptoms',
    remarks: 'Remarks',
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2> Diagnosis Info</h2>
        </div>
        <div className="modal-body scrollable">
          {Object.entries(modalInfo).map(([key, value]) => (
            <p key={key}>
              {translations[key] || key}: {key === 'dob' || key === 'createdAt' || key === 'updatedAt' ? moment(value).format('DD/MM/YYYY') : value}
            </p>
          ))}
          {diagnosisData.length > 0 ? (
            diagnosisData.map((diagnosis, index) => (
              <div key={index}>
                <h3>Diagnosis {index + 1}</h3>
                <p>{translations.diagnosisId}: {diagnosis.diagnosisId}</p>
                <p>{translations.createdAt}: {moment(diagnosis.createdAt).format('DD/MM/YYYY h:mm a')}</p>
                <p>{translations.updatedAt}: {moment(diagnosis.updatedAt).format('DD/MM/YYYY h:mm a')}</p>
                <p>{translations.appointmentId}: {diagnosis.appointmentId}</p>
                <p>{translations.icd}: {diagnosis.icd}</p>
                <p>{translations.symptoms}: {diagnosis.symptoms}</p>
                <p>{translations.remarks}: {diagnosis.remarks}</p>
              </div>
            ))
          ) : (
            <p>No diagnosis data recorded.</p>
          )}
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
  patientId: PropTypes.string.isRequired,
};

export default InfoModal;
