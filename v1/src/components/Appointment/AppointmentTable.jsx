import React from "react";

const AppointmentTable = ({ appointments }) => {
  return (
    <div className="table-wrapper">
      <h2>Appointments for {appointments[0]?.date.toDateString()}</h2>
      <table className="table">
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
            <tr key={appointment.time}>
              <td>{appointment.doctor}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.time}</td>
              <td>{appointment.reason}</td>
              <td className="expand">{appointment.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
