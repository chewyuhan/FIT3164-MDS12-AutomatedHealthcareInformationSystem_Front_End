import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import './userinfo.css'
import Loading from '../components/Loading/Loading';
import { fetchUserData } from "../api/employee";

function UserInfo() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
  
    if (accessToken) {
      fetchUserData(accessToken, setUserData)
        .catch(() => {
          // Handle error if needed
        });
    }
  }, []);

  if (!userData) {
    return <Loading />
  }

  return (
    <div className='userinfo-container'>
      <Sidebar />
      <div className='userinfo-content'>
        <p><strong>Employee ID:</strong> {userData.employeeId}</p>
        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Identification Number:</strong> {userData.ic}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNo}</p>
        <p><strong>Nationality:</strong> {userData.nationality}</p>
        <p><strong>Specialty:</strong> {userData.specialty}</p>
      </div>
    </div>
  );
}

export default UserInfo;