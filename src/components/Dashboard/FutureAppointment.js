import React, { useEffect, useState } from 'react';
import { fetchAppointmentDataFromAPI} from '../../api/appointment';
import { fetchDoctorDataFromAPI } from '../../api/doctor';
import { fetchPatientDataFromAPI } from '../../api/patient';
import './dashboard.css';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(dateTimeString) {
  return new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function FutureAppointmentsTable() {
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await fetchAppointmentDataFromAPI();
        const now = new Date();
        const futureAppointments = allAppointments.filter(
          appointment => new Date(appointment.appointmentDateTime) > now
        );
        setFutureAppointments(futureAppointments);

        const doctorsResponse = await fetchDoctorDataFromAPI();
        setDoctors(doctorsResponse);

        const patientsResponse = await fetchPatientDataFromAPI();
        setPatients(patientsResponse);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  // Get doctor name by ID
  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  // Get patient name by ID
  const getPatientNameById = (patientID) => {
    const patient = patients.find((p) => p.patientId.toString() === patientID.toString());
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  return (
    <div>
      <h2>Future Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Appointment Date & Time</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {futureAppointments.map(appointment => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{getPatientNameById(appointment.patientId)}</td>
              <td>{getDoctorNameById(appointment.employeeId)}</td>
              <td>{`${formatDate(appointment.appointmentDateTime)} ${formatTime(appointment.appointmentDateTime)}`}</td>
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FutureAppointmentsTable;
