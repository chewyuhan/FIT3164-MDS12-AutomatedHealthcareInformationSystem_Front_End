import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Modal.css';
import { BsFillPencilFill } from "react-icons/bs";
import { fetchDiagnosisDataFromAPI, editDiagnosis } from '../../api/diagnosis';

const InfoModal = ({ onClose, patientId }) => {
  const modalRef = useRef(null);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [editingDiagnosis, setEditingDiagnosis] = useState(null);
  const [editedDiagnosis, setEditedDiagnosis] = useState({
    diagnosisId: '',
    createdAt: '',
    updatedAt: '',
    appointmentId: '',
    icd: '',
    symptoms: '',
    remarks: '',
  });

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleEditClick = (diagnosis) => {
    setEditingDiagnosis(diagnosis);
    setEditedDiagnosis({ ...diagnosis });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDiagnosis({ ...editedDiagnosis, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await editDiagnosis(editingDiagnosis.diagnosisId, editedDiagnosis);
      await refreshDiagnosisData(patientId);
      setEditingDiagnosis(null);
    } catch (error) {
      console.error('Error updating diagnosis data:', error);
      // Handle error
    }
  };

  const refreshDiagnosisData = async (patientId) => {
    try {
      const data = await fetchDiagnosisDataFromAPI(patientId);
      data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
      setDiagnosisData(data);
    } catch (error) {
      console.error('Error fetching diagnosis data:', error);
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
      refreshDiagnosisData(patientId);
    }
  }, [patientId]);

  const translations = {
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
          <h2>Diagnosis Info</h2>
        </div>
        <div className="modal-body scrollable">
          {diagnosisData.length > 0 ? (
            diagnosisData.map((diagnosis, index) => (
              <div key={index}>
                <div className="diagnosisid-edit">
                  <h3>{translations.diagnosisId}: {diagnosis.diagnosisId}</h3>
                  <div className="action-icons">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => handleEditClick(diagnosis)}
                    />
                  </div>
                </div>
                {editingDiagnosis === diagnosis ? (
                  <form onSubmit={handleEditSubmit}>
                    <div className="form-group">
                      <label htmlFor="icd">ICD</label>
                      <input
                        name="icd"
                        onChange={handleInputChange}
                        value={editedDiagnosis.icd}
                        placeholder="ICD Code"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="symptoms">Symptoms</label>
                      <input
                        name="symptoms"
                        onChange={handleInputChange}
                        value={editedDiagnosis.symptoms}
                        placeholder="Symptoms"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="remarks">Remarks (Optional)</label>
                      <input
                        name="remarks"
                        onChange={handleInputChange}
                        value={editedDiagnosis.remarks}
                        placeholder="Remarks"
                      />
                    </div>
                    <button type="submit" className="btn">
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <p>{translations.createdAt}: {moment(diagnosis.createdAt).format('DD/MM/YYYY h:mm a')}</p>
                    <p>{translations.updatedAt}: {moment(diagnosis.updatedAt).format('DD/MM/YYYY h:mm a')}</p>
                    <p>{translations.appointmentId}: {diagnosis.appointmentId}</p>
                    <p>{translations.icd}: {diagnosis.icd}</p>
                    <p>{translations.symptoms}: {diagnosis.symptoms}</p>
                    <p>{translations.remarks}: {diagnosis.remarks}</p>
                  </>
                )}
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
