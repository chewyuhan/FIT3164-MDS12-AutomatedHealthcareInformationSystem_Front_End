import React, { useState } from "react";
import moment from 'moment';
import { BsFillPencilFill, BsWhatsapp } from "react-icons/bs";
import "./Table.css";
import InfoModal from './AppointmentinfoModal';

export const Table = ({ rows, editRow }) => {

  const [modalInfo, setModalInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (row) => {
    setModalInfo(row);
    setShowModal(true); // Show the modal when a row is clicked
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Id</th>
            <th>Employee Id</th>
            <th>Appointment Date/Time</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx} className="clickable-row" onClick={() => handleRowClick(row)}>
                <td>
                  {row.appointmentId}
                </td>
                <td>{row.patient.id}</td>
                <td>{row.employee.id}</td>
                <td>{moment(row.appointmentDateTime).format("DD/MM/YYYY HH:mm")}</td>
                <td>{row.reason}</td>
                <td>{row.completed ? "Completed" : "Not Completed"}</td>
                <td className="expand">{row.remarks}</td>
                <td className="fit">
                  <div className="action-icons">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
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
