import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import Sidebar from '../components/Sidebar/Sidebar';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import AppointmentTable from "../components/Appointment/AppointmentTable";
import { isSameDay } from "date-fns";
import { fetchAppointmentDataFromAPI , addAppointment} from "../api/appointment";

import './Appointment.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      fetchAppointmentDataFromAPI()
        .then((data) => {
          setAppointments(data);
        })
        .catch((error) => {
          console.error("Error fetching appointment data:", error);
        });

      axios.get("https://mds12.cyclic.app/employees/doctors", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          console.log("Doctors response:", response.data);
          setDoctors(response.data);

          axios.get('https://mds12.cyclic.app/patients/all', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then(response => {
              setPatients(response.data);
            })
            .catch(error => {
              console.error('Error fetching patients data', error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const openAppointmentPopup = () => {
    setIsPopupOpen(true);
  };

  const closeAppointmentPopup = () => {
    setIsPopupOpen(false);
    setSelectedPatientId(null);
    setSelectedDoctorId(null);
    setAppointmentDate(new Date());
    setAppointmentTime("");
  };

  const handleSelectAppointmentTime = () => {
    const doctorName = getDoctorNameById(selectedDoctorId);
    const patientName = getPatientNameById(selectedPatientId);
    const appointment = {
      patientID: selectedPatientId,
      employeeID: selectedDoctorId,
      date: appointmentDate,
      time: appointmentTime,
      remarks: "",
      reason: "",
      completed: false,
      doctor: doctorName,
      patient: patientName,
    };
    setAppointments([...appointments, appointment]);
    closeAppointmentPopup();
  };

  // Yu Han pls help API here thankss
  const handleSubmitAppointmentForm = (formData) => {
    // Create a JavaScript Date object based on appointmentDate and appointmentTime
    const appointmentDateTime = new Date(appointmentDate);
    const [hours, minutes] = appointmentTime.split(":");
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    // console.log("formData:", formData)
    // Create an object with the form data to send to the API
    const requestData = {
      patientId: parseInt(formData.patientId),
      employeeId: parseInt(formData.employeeId),
      appointmentDateTime: appointmentDateTime.toISOString(), // Convert to ISO date string
      reason: formData.reason || "",
      remarks: formData.remarks || "",
      completed: formData.completed || false,
    };
  
    console.log("Request data:", requestData);
    // Make a POST request to your backend API
    addAppointment(requestData)
      .then((response) => {
        console.log("Appointment added:", response);
        // Update the appointments state variable so that the UI re-renders
        setAppointments([...appointments, response.data]);
        closeAppointmentPopup();
      })
  };
  

  const handleCalendarClick = (value) => {
    const appointmentsForDay = appointments.filter((appointment) =>
      isSameDay(new Date(appointment.appointmentDateTime), value)
    );

    const appointmentsWithNames = appointmentsForDay.map((appointment) => {
      const doctorName = getDoctorNameById(appointment.employeeId);
      const patientName = getPatientNameById(appointment.patientId);

      return {
        ...appointment,
        doctor: doctorName,
        patient: patientName,
      };
    });
    setSelectedAppointment(appointmentsWithNames);
    console.log("Appointments for day:", appointmentsForDay);
  };

  const getDoctorNameById = (employeeID) => {
    const doctor = doctors.find((d) => d.employeeId.toString() === employeeID.toString());
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const getPatientNameById = (patientID) => {
    const patient = patients.find((p) => p.patientId.toString() === patientID.toString());
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  
  if (!appointments) {
    return <p>Loading Appointment data...</p>;
  }
  return (
    <div className="appointment-page">
      <Sidebar />
      <div className="appointment-container">
        <div className="add-appointment-content">
          <button onClick={openAppointmentPopup} className="add-appointment-button">
            Add Appointment
          </button>
        </div>
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <AppointmentForm
                patients={patients}
                selectedPatientId={selectedPatientId}
                setSelectedPatientId={setSelectedPatientId}
                doctors={doctors}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                appointmentTime={appointmentTime}
                setAppointmentTime={setAppointmentTime}
                selectedDoctorId={selectedDoctorId}
                setSelectedDoctorId={setSelectedDoctorId}
                handleSelectAppointmentTime={handleSelectAppointmentTime}
                onSubmit={handleSubmitAppointmentForm} 
                closeModal={closeAppointmentPopup}
              />
              <button onClick={closeAppointmentPopup} className="close-popup-button">
                Close
              </button>
            </div>
          </div>
        )}
        <div className="appointment-list-container">
          <div className="calendar-container">
            <h1>Book an Appointment</h1>
            <h2>Select a Date</h2>
            <Calendar
              value={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              onClickDay={handleCalendarClick}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const appointmentsForDay = appointments.filter(appointment =>
                    isSameDay(new Date(appointment.appointmentDateTime), date)
                  );
                  const appointmentCount = appointmentsForDay.length;
                  return (
                    <div className="appointment-tile-content">
                      {appointmentCount >= 0 && <span className="appointment-indicator">📅</span>}
                      <span className="appointment-count">{appointmentCount}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
          </div>

          {Array.isArray(selectedAppointment) && selectedAppointment.length > 0 && (
            <div className="selected-appointment-details">
              <AppointmentTable appointments={selectedAppointment} doctors={doctors} patients={patients} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
