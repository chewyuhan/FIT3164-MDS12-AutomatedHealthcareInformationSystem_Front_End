import React from "react";
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  const handleContactInfoClick = (phoneNo) => {
    const whatsappLink = `https://wa.me/${phoneNo}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Contact Info</th>
            <th className="expand">Remarks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.patientID}</td>
                <td>{row.firstName + " " +  row.lastName }</td>
                <td>{moment(row.dob).format("MM/DD/YYYY")}</td>
                <td>{row.gender}</td>
                <td data-href={`https://wa.me/${row.phoneNo}`}>
                  <a
                    href={`https://wa.me/${row.phoneNo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleContactInfoClick(row.phoneNo);
                    }}
                  >
                    {row.phoneNo}
                  </a>
                </td>
                <td className="expand">{row.remarks}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
