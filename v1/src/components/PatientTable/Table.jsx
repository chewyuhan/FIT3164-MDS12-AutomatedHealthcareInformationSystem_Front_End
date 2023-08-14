import React, { useState } from "react";
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill, BsEyeFill } from "react-icons/bs";
import {Modal, Button} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./Table.css";
import "./patientModal.css";






export const Table = ({ rows, deleteRow, editRow }) => {
  const handleContactInfoClick = (phoneNo) => {
    const whatsappLink = `https://wa.me/${phoneNo}`;
    window.open(whatsappLink, '_blank');
  };

  //To display additional patient information
  const[modalInfo,setModalInfo] = useState([]);
  const[showModal,setShowModal] = useState(false);

  // for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRowClick = (row) => {
    console.log(row);
    setModalInfo(row)
    toggleTrueFalse()
  };

  const toggleTrueFalse = () =>{
    setShowModal(handleShow);
  }
  
  const ModalContent = () =>{
    return (
      <Modal className="patient-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>View Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Patient ID: {modalInfo.patientID}</p>
        <p>Created At: {modalInfo.creratedAT}</p>
        <p>Updated At: {modalInfo.updatedAt}</p>
        <p>IC: {modalInfo.ic}</p>
        <p>First Name: {modalInfo.firstName}</p>
        <p>Last Name: {modalInfo.lastName}</p>
        <p>Phone No: {modalInfo.phoneNo}</p>
        <p>Gender: {modalInfo.gender}</p>
        <p>Description: {modalInfo.description}</p>
        <p>Status: {modalInfo.status}</p>
        <p>Date of Birth: {moment(modalInfo.dob).format("MM/DD/YYYY")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    )

  }

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
                     <BsEyeFill
                      className="view-btn"
                      onClick={() => handleRowClick(row)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {show ? <ModalContent/> : null}
    </div>
  );
};
