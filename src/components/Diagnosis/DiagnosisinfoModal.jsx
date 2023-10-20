import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './DiagModal.css';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { fetchDiagnosisDataFromAPI, editDiagnosis, deleteDiagnosis } from '../../api/diagnosis';

// Component to display diagnosis information in a modal
const InfoModal = ({ onClose, patientId }) => {
  // Ref for the modal element
  const modalRef = useRef(null);

  // State for diagnosis data
  const [diagnosisData, setDiagnosisData] = useState([]);

  // State for editing diagnosis
  const [editingDiagnosis, setEditingDiagnosis] = useState(null);

  // State for edited diagnosis
  const [editedDiagnosis, setEditedDiagnosis] = useState({
    diagnosisId: '',
    createdAt: '',
    updatedAt: '',
    appointmentId: '',
    icd: '',
    symptoms: '',
    remarks: '',
  });

  // Function to handle clicks outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Function to handle the edit button click
  const handleEditClick = (diagnosis) => {
    setEditingDiagnosis(diagnosis);
    setEditedDiagnosis({ ...diagnosis });
  };

  // Function to handle the delete button click
  const deleteRow = async (diagnosisId) => {
    try {
      await deleteDiagnosis(diagnosisId);
      await refreshDiagnosisData(patientId);
    } catch (error) {
      console.error('Error deleting diagnosis data:', error);
    }
  };

  // Function to handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDiagnosis({ ...editedDiagnosis, [name]: value });
  };

  // Function to handle the edit form submission
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

  // Function to refresh diagnosis data for a patient
  const refreshDiagnosisData = async (patientId) => {
    try {
      const data = await fetchDiagnosisDataFromAPI(patientId);
      data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
      setDiagnosisData(data);
    } catch (error) {
      console.error('Error fetching diagnosis data:', error);
    }
  };

  // Event listener for clicks outside the modal
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to refresh diagnosis data when patientId changes
  useEffect(() => {
    if (patientId) {
      refreshDiagnosisData(patientId);
    }
  }, [patientId]);

  // Translations for diagnosis field names
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
        {diagnosisData.length > 0 ? (
          diagnosisData.map((diagnosis, index) => (
            <div key={index}>
              <div className="diagnosisid-edit">
                <h3>{translations.diagnosisId}: {diagnosis.diagnosisId}</h3>
                <div className="action-icons">
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(diagnosis)
                    }}
                  />
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      deleteRow(diagnosis.diagnosisId)
                    }}
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
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for the InfoModal component
InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default InfoModal;
