import React, { useState } from "react";
import moment from 'moment'; // Import moment
import "./Table.css";
import InfoModal from './DiagnosisinfoModal';

export const Table = ({ patients }) => {
  // State to manage modal visibility and data
  const [modalInfo, setModalInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Function to handle row click and display modal
  const handleRowClick = (row) => {
    setModalInfo(row);
    setShowModal(true); // Show the modal when a row is clicked
  };

  // Function to format appointment date and time using moment
  const formatAppointmentDateTime = (datetime) => {
    const date = moment(datetime);
    if (date.isValid()) {
      return date.format("YYYY-MM-DD HH:mm");
    } else {
      return datetime;
    }
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Contact Info</th>
            <th className="expand">Remarks</th>
            <th>Latest Appointment</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {patients.map((row, idx) => {
            // Format the latestAppointmentDateTime using moment
            const formattedAppointmentDateTime = formatAppointmentDateTime(row.latestAppointmentDateTime);

            return (
              <tr key={idx} className="clickable-row" onClick={() => handleRowClick(row)}>
                <td>{row.patientId}</td>
                <td>{row.firstName + " " + row.lastName}</td>
                <td>{row.gender}</td>
                <td>{row.phoneNo}</td>
                <td className="expand">{row.remarks}</td>
                <td>{formattedAppointmentDateTime}</td> {/* Display formatted latest appointment */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          {/* Render InfoModal with patient data */}
          <InfoModal onClose={() => setShowModal(false)} patientId={modalInfo.patientId} />
        </div>
      )}
    </div>
  );
};
