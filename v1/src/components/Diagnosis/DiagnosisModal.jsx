import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  // State for form data
  const [formState, setFormState] = useState(
    defaultValue || {
      diagnosisId: '',
      createdAt: '',
      updatedAt: '',
      appointmentId: '',
      icd: '',
      symptoms: '',
      remarks: '',
    }
  );

  // State for form validation errors
  const [errors, setErrors] = useState('');

  // State for patient data
  const [patients, setPatients] = useState([]);

  // State for selected patient ID
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // State for employee data
  const [employees, setEmployees] = useState([]);

  // State for selected employee ID
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // State for appointment options
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    // Function to fetch patient data
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('https://mds12.cyclic.app/patients/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setErrors('Error fetching patient data. Please try again later.');
      }
    };

    // Function to fetch employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('https://mds12.cyclic.app/employees/doctors', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setErrors('Error fetching employee data. Please try again later.');
      }
    };

    // Function to fetch appointment data
    const fetchAppointmentData = async (patientId) => {
      try {
        const appointmentResponse = await axios.get(
          `https://mds12.cyclic.app/appointments/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const appointmentOptions = appointmentResponse.data.map((appointment) => ({
          id: appointment.appointmentId,
          datetime: new Date(appointment.appointmentDateTime),
        }));

        // Set the appointment options for the selected patient
        setAppointmentOptions(appointmentOptions);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
        setErrors('Error fetching appointment data. Please try again later.');
      }
    };

    fetchPatientData();
    fetchEmployeeData();
    fetchAppointmentData(selectedPatientId);

  }, [selectedPatientId]);

  // Function to validate the form
  const validateForm = () => {
    const {
      appointmentId,
      icd,
      symptoms,
      remarks
    } = formState;

    if (
      !isNaN(appointmentId) &&
      /^\d+$/.test(appointmentId) &&
      typeof selectedPatientId === 'number' &&
      typeof selectedEmployeeId === 'number' &&
      typeof icd === 'string' &&
      typeof symptoms === 'string'
    ) {
      setErrors('');
      return true;
    } else {
      setErrors('Please enter valid data for all fields.');
      return false;
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAppointmentId = parseInt(formState.appointmentId, 10);

    if (validateForm()) {
      onSubmit({ ...formState, appointmentId: parsedAppointmentId });
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={(e) => { if (e.target.className === 'modal-container') closeModal(); }}>
      <div className="modal">
        <div className="modal-header">
          <h1 className="modal-title">Diagnosis Details</h1>
          <form>
            {/* Select Employee */}
            <div className="form-group">
              <label htmlFor="employeeId">Select Employee</label>
              <select
                name="employeeId"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Patient */}
            <div className="form-group">
              <label htmlFor="patientId">Select Patient</label>
              <select
                name="patientId"
                value={selectedPatientId}
                onChange={(e) => {
                  setSelectedPatientId(Number(e.target.value));
                  setFormState({ ...formState, appointmentId: '' }); // Reset appointment ID when patient changes
                }}
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Appointment */}
            <div className="form-group">
              <label htmlFor="appointmentId">Select Appointment</label>
              <select
                name="appointmentId"
                value={formState.appointmentId}
                onChange={handleChange}
              >
                <option value="">Select an appointment</option>
                {appointmentOptions.map((appointmentOption) => {
                  const appointmentDate = new Date(appointmentOption.datetime);
                  const formattedDate = `${appointmentDate.getFullYear()}-${(appointmentDate.getMonth() + 1).toString().padStart(2, '0')
                    }-${appointmentDate.getDate().toString().padStart(2, '0')}`;
                  const formattedTime = `${appointmentDate.getHours()}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`;

                  return (
                    <option key={appointmentOption.id} value={parseInt(appointmentOption.id, 10)}>
                      {`${formattedDate} ${formattedTime} ${appointmentDate.getHours() >= 12 ? 'PM' : 'AM'}`}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* ICD Input */}
            <div className="form-group">
              <label htmlFor="icd">ICD</label>
              <input
                name="icd"
                onChange={handleChange}
                value={formState.icd}
                placeholder="ICD Code"
              />
            </div>

            {/* Symptoms Input */}
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms</label>
              <input
                name="symptoms"
                onChange={handleChange}
                value={formState.symptoms}
                placeholder="Symptoms"
              />
            </div>

            {/* Remarks Input */}
            <div className="form-group">
              <label htmlFor="remarks">Remarks (Optional)</label>
              <input
                name="remarks"
                onChange={handleChange}
                value={formState.remarks}
                placeholder="Remarks"
              />
            </div>

            {/* Display Validation Errors */}
            {errors && <div className="error">{errors}</div>}

            {/* Submit Button */}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
