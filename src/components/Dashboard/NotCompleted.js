// NotCompleted.js
import React, { useEffect, useState } from 'react';
import { fetchAppointmentDataFromAPI } from '../../api/appointment';
import './box.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function NotCompleted() {
  const [notCompletedAppointments, setNotCompletedAppointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await fetchAppointmentDataFromAPI(); // Replace with your actual API call

        // Assuming appointmentDateTime is a date field in each appointment record
        const currentMonth = new Date().getMonth();
        const notCompletedCount = allAppointments.filter(appointment => {
          const appointmentMonth = new Date(appointment.appointmentDateTime).getMonth();
          return !appointment.completed && appointmentMonth === currentMonth;
        }).length;

        setNotCompletedAppointments(notCompletedCount);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Link to='/appointment' className='link'>
    <button className='box'>
      <h2>Not Completed Appointments for Current Month</h2>
      <p className='numbers'>{notCompletedAppointments}</p>
    </button>
    </Link>
  );
}

export default NotCompleted;
