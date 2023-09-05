import React, { useState } from "react";
import moment from 'moment';
import { BsFillPencilFill, BsWhatsapp } from "react-icons/bs";
import "./Table.css";
import InfoModal from './infoModal';

export const Table = ({ rows, editRow }) => {
  const handleContactInfoClick = (phoneNo) => {
    const whatsappLink = `https://wa.me/${phoneNo}`;
    window.open(whatsappLink, '_blank');
  };

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
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact Info</th>
            <th className="expand">Remarks</th>
            {/*<th>Status</th>*/}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            // const statusText =
            //   row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx} className="clickable-row" onClick={() => handleRowClick(row)}>
                <td>
                  {row.patientID}
                </td>
                <td>{row.firstName + " " + row.lastName}</td>
                <td>{moment(row.dob).format("MM/DD/YYYY")}</td>
                <td>{row.gender}</td>
                <td>{row.phoneNo}</td>
                <td className="expand">{row.remarks}</td>
                <td className="fit">
                  <div className="action-icons">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <BsWhatsapp
                      className="whatsapp-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleContactInfoClick(row.phoneNo);
                      }}
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
