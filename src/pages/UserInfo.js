import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar/Sidebar';
import './userinfo.css'
import Loading from '../components/Loading/Loading';

function UserInfo() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the access token from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");
    // If the access token exists, you can use it for authenticated API calls
    if (accessToken) {
      // Make an authenticated API call using the access token
      axios.get("https://mds12.cyclic.cloud/employees/myinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          // Handle the response and update the user data state
          // console.log("API call response:", response.data)
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
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