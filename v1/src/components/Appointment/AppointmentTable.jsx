import React from "react";
import "./ApptTable.css"

const AppointmentTable = ({ appointments }) => {
  // Assuming all appointments are for the same date, you can get the date from the first appointment
  const firstAppointment = appointments[0];
  const appointmentDate = firstAppointment
    ? new Date(firstAppointment.appointmentDateTime)
    : null;

  return (
    <div className="table-wrapper">
      <table className="table">
      {appointmentDate && (
        <h2>Appointments for {appointmentDate.toDateString()}</h2>
      )}
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.doctor}</td> 
              <td>{appointment.patient}</td> 
              <td>{appointment.appointmentDateTime.toLocaleString()}</td>
              <td>{appointment.reason || "N/A"}</td>
              <td>{appointment.remarks || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
