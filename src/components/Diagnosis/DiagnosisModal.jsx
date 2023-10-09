import React, { useState, useEffect } from 'react';
import './DiagModal.css';
import { fetchPatientDataFromAPI } from '../../api/patient';
import { fetchDoctorDataFromAPI } from '../../api/doctor';
import { fetchAppointmentsbyPatient } from '../../api/appointment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // Function to fetch patient data
    const fetchPatientData = async () => {
      try {
        const patientdata = await fetchPatientDataFromAPI();
        setPatients(patientdata);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setErrors('Error fetching patient data. Please try again later.');
      }
    };

    // Function to fetch employee data
    const fetchEmployeeData = async () => {
      try {
        const doctordata = await fetchDoctorDataFromAPI();
        setEmployees(doctordata);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setErrors('Error fetching employee data. Please try again later.');
      }
    };

    // Function to fetch appointment data
    const fetchAppointmentData = async (patientId) => {
      try {
        const appointmentResponse = await fetchAppointmentsbyPatient(patientId);
        const appointmentOptions = appointmentResponse.map((appointment) => ({
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
    } = formState;

    let error = false

    // Check if selectedPatientId and selectedEmployeeId are numbers
    if (typeof selectedPatientId !== 'number') {
      toast.error("Please select a patient.");
      error = true;
    }

    if (typeof selectedEmployeeId !== 'number') {
      toast.error("Please select an doctor.");
      error = true;
    }

    // Check if appointmentId is a number
    if (isNaN(appointmentId) || !(/^\d+$/.test(appointmentId))) {
      toast.error("Please select a valid appointment ID.");
      error = true;

    }

    // Check if icd and symptoms are strings
    if (typeof icd !== 'string') {
      toast.error("Please enter a valid ICD code.");
      error = true;
    }

    if (typeof symptoms !== 'string') {
      toast.error("Please enter valid symptoms.");
      error = true;
    }

    if (errors) {
      return true;
    } else {
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

  // State for speech recognition
  const [isListeningIcd, setIsListeningIcd] = useState(false);
  const [isListeningRemarks, setIsListeningRemarks] = useState(false);
  const [isListeningSymptoms, setIsListeningSymptoms] = useState(false);

  // State for speech recognition results
  const [speechResultIcd, setSpeechResultIcd] = useState('');
  const [speechResultRemarks, setSpeechResultRemarks] = useState('');
  const [speechResultSymptoms, setSpeechResultSymptoms] = useState('');

  // Function to handle real-time speech recognition
  const handleRealTimeSpeechRecognition = (field, transcript) => {
    setFormState({ ...formState, [field]: transcript });
  };

  // Initialize speech recognition instances
  const recognitionIcd = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  const recognitionRemarks = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  const recognitionSymptoms = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognitionIcd.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSpeechResultIcd(transcript);
    handleRealTimeSpeechRecognition('icd', transcript);
  };

  recognitionRemarks.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSpeechResultRemarks(transcript);
    handleRealTimeSpeechRecognition('remarks', transcript);
  };

  recognitionSymptoms.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSpeechResultSymptoms(transcript);
    handleRealTimeSpeechRecognition('symptoms', transcript);
  };

  // Function to start speech recognition
  const startListening = (field) => {
    if (field === 'icd') {
      setIsListeningIcd(true);
      recognitionIcd.start();
    } else if (field === 'remarks') {
      setIsListeningRemarks(true);
      recognitionRemarks.start();
    } else if (field === 'symptoms') {
      setIsListeningSymptoms(true);
      recognitionSymptoms.start();
    }
  };

  // Function to stop speech recognition
  const stopListening = (field) => {
    if (field === 'icd') {
      setIsListeningIcd(false);
      recognitionIcd.stop();
    } else if (field === 'remarks') {
      setIsListeningRemarks(false);
      recognitionRemarks.stop();
    } else if (field === 'symptoms') {
      setIsListeningSymptoms(false);
      recognitionSymptoms.stop();
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
              <h2 htmlFor="employeeId">Select Employee (Compulsory)</h2>
              <select
                name="employeeId"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
              >
                <option value="">Select an Doctor</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Patient */}
            <div className="form-group">
              <h2 htmlFor="patientId">Select Patient (Compulsory)</h2>
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
              <h2 htmlFor="appointmentId">Select Appointment (Compulsory)</h2>
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
              <h2 htmlFor="icd">ICD</h2>
              <input
                name="icd"
                onChange={handleChange}
                value={formState.icd}
                placeholder="ICD Code"
              />
              <button
                type="button"
                onClick={() => {
                  if (isListeningIcd) {
                    stopListening('icd');
                  } else {
                    startListening('icd');
                  }
                }}
              >
                {isListeningIcd ? 'Stop' : 'Start'} Listening
              </button>
            </div>
            {/* Symptoms Input */}
            <div className="form-group">
              <h2 htmlFor="symptoms">Symptoms</h2>
              <input
                name="symptoms"
                onChange={handleChange}
                value={formState.symptoms}
                placeholder="Symptoms"
              />
              <button
                type="button"
                onClick={() => {
                  if (isListeningSymptoms) {
                    stopListening('symptoms');
                  } else {
                    startListening('symptoms');
                  }
                }}
              >
                {isListeningSymptoms ? 'Stop' : 'Start'} Listening
              </button>
            </div>

                        {/* Remarks Input */}
                        <div className="form-group">
              <h2 htmlFor="remarks">Remarks (Optional)</h2>
              <input
                name="remarks"
                onChange={handleChange}
                value={formState.remarks}
                placeholder="Remarks"
              />
              <button
                type="button"
                onClick={() => {
                  if (isListeningRemarks) {
                    stopListening('remarks');
                  } else {
                    startListening('remarks');
                  }
                }}
              >
                {isListeningRemarks ? 'Stop' : 'Start'} Listening
              </button>
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
