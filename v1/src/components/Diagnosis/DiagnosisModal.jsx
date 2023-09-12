import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      diagnosisId: "",
      createdAt: "",
      updatedAt: "",
      appointmentId: "",
      icd: "",
      symptoms: "",
      remarks: "",
    }
  );
  const [errors, setErrors] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [appointment, setAppointment] = useState([]);
  const [appointmentIds, setAppointmentIds] = useState([]);
  const [appointmentOptions, setAppointmentOptions] = useState([]);


  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    const fetchPatientData = async () => {
      try {
        const response = await axios.get("https://mds12.cyclic.app/patients/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setFetchError("Error fetching patient data. Please try again later.");
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("https://mds12.cyclic.app/employees/doctors", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setFetchError("Error fetching employee data. Please try again later.");
      }
    };

    const fetchAppointmentData = async (patientId) => {
      try {
        const appointmentResponse = await axios.get(`https://mds12.cyclic.app/appointments/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setAppointment(appointmentResponse.data);

        const appointmentOptions = appointmentResponse.data.map((appointment) => ({
          id: appointment.appointmentId,
          datetime: new Date(appointment.appointmentDateTime),
        }));
        setAppointmentIds(appointmentOptions);

        // Set the appointment options for the selected patient
        setAppointmentOptions(appointmentOptions);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        setFetchError("Error fetching appointment data. Please try again later.");
      }
    };


    fetchPatientData();
    fetchEmployeeData();
    fetchAppointmentData(selectedPatientId);

  }, [selectedPatientId]);

  const validateForm = () => {
    const {
      appointmentId,
      icd,
      symptoms,
      remarks
    } = formState;

    if (
      !isNaN(appointmentId) && /^\d+$/.test(appointmentId) &&
      typeof selectedPatientId === 'number' &&
      typeof selectedEmployeeId === 'number' &&
      typeof icd === 'string' &&
      typeof symptoms === 'string'
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Please enter valid data for all fields.");
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAppointmentId = parseInt(formState.appointmentId, 10);


    if (validateForm()) {
      onSubmit({ ...formState, appointmentId: parsedAppointmentId });
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={(e) => { if (e.target.className === "modal-container") closeModal(); }}>
      <div className="modal">
        <div className="modal-header">
          <h1 className="modal-title">Diagnosis Details</h1>
          <form>
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
            <div className="form-group">
              <label htmlFor="patientId">Select Patient</label>
              <select
                name="patientId"
                value={selectedPatientId}
                onChange={(e) => {
                  setSelectedPatientId(Number(e.target.value));
                  setFormState({ ...formState, appointmentId: "" }); // Reset appointment ID when patient changes
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
                  const formattedDate = `${appointmentDate.getFullYear()}-${(appointmentDate.getMonth() + 1).toString().padStart(2, "0")
                    }-${appointmentDate.getDate().toString().padStart(2, "0")}`;
                  const formattedTime = `${appointmentDate.getHours()}:${appointmentDate.getMinutes().toString().padStart(2, "0")}`;

                  return (
                    <option key={appointmentOption.id} value={parseInt(appointmentOption.id, 10)}>
                      {`${formattedDate} ${formattedTime} ${appointmentDate.getHours() >= 12 ? "PM" : "AM"}`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="icd">ICD</label>
              <input
                name="icd"
                onChange={handleChange}
                value={formState.icd}
                placeholder="ICD Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms</label>
              <input
                name="symptoms"
                onChange={handleChange}
                value={formState.symptoms}
                placeholder="Symptoms"
              />
            </div>

            <div className="form-group">
              <label htmlFor="remarks">Remarks (Optional)</label>
              <input
                name="remarks"
                onChange={handleChange}
                value={formState.remarks}
                placeholder="Remarks"
              />
            </div>
            {errors && <div className="error">{errors}</div>}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
