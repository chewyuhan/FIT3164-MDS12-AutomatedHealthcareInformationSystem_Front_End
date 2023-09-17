import React from "react";
import "./ApptTable.css"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { format } from "date-fns";





const AppointmentTable = ({ appointments , deleteRow, editRow}) => {
  // Assuming all appointments are for the same date, you can get the date from the first appointment
  const firstAppointment = appointments[0];
  const appointmentDate = firstAppointment
    ? new Date(firstAppointment.appointmentDateTime)
    : null;

  return (
    <div className="table-wrapper">
      {appointmentDate && (
        <h2>Appointments for {appointmentDate.toDateString()}</h2>
      )}
      <div className="table-container">

        <table className="table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.doctor}</td>
                <td>{appointment.patient}</td>
                <td>  {format(new Date(appointment.appointmentDateTime), "dd-MM-yyyy hh:mm a")}</td>
                <td>{appointment.reason || "N/A"}</td>
                <td>{appointment.remarks || "N/A"}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(appointment.appointmentId)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(appointment.appointmentId)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
