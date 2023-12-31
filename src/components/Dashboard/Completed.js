import React, { useEffect, useState } from 'react';
import { fetchAppointmentDataFromAPI } from '../../api/appointment';
import './box.css';
import { Link } from 'react-router-dom';

function Completed() {
  const [completedAppointments, setCompletedAppointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await fetchAppointmentDataFromAPI();

        const currentMonth = new Date().getMonth();
        const completedCount = allAppointments.filter(appointment => {
          const appointmentMonth = new Date(appointment.appointmentDateTime).getMonth();
          return appointment.completed && appointmentMonth === currentMonth;
        }).length;

        setCompletedAppointments(completedCount);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Link to='/appointment' className='link'>
      <button className='box'>
        <h2>Completed Appointments for Current Month</h2>
        <p className='numbers'>{completedAppointments}</p>
      </button>
    </Link>
  );
}

export default Completed;
