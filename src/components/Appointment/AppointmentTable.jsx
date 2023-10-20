import React, { useEffect, useState } from "react";
import "./ApptTable.css"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import InfoModal from './AppointmentinfoModal';
import { format } from "date-fns";

const AppointmentTable = ({ appointments, deleteRow, editRow }) => {
  const firstAppointment = appointments[0];
  const appointmentDate = firstAppointment
    ? new Date(firstAppointment.appointmentDateTime)
    : null;

  const [modalInfo, setModalInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  // Function to handle clicking on a row to display the modal
  const handleRowClick = (row) => {
    setModalInfo(row);
    setShowModal(true);
  };
  useEffect(() => {
    console.log("appointmentDate", appointments);
  }
    , [appointments]);


  return (
    <div className="table-wrapper">
      <div className="table-header">
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Time</th>
            <th className="expand">Reason</th>
            <th className="expand">Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="header-row">
            <td colSpan="6">
              Appointments for {appointmentDate.toDateString()}
            </td>
          </tr>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId} className="clickable-row" onClick={() => handleRowClick(appointment)}>
              <td>{appointment.doctor}</td>
              <td>{appointment.patient}</td>
              <td>{format(new Date(appointment.appointmentDateTime), "dd-MM-yyyy hh:mm a")}</td>
              <td>{appointment.reason || "N/A"}</td>
              <td>{appointment.remarks || "N/A"}</td>
              <td className="fit">
                <span className="actions">
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRow(appointment.appointmentId)
                    }}
                  />
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop the click event from propagating
                      editRow(appointment.appointmentId);
                    }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          <InfoModal modalInfo={modalInfo} onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );

};

export default AppointmentTable;