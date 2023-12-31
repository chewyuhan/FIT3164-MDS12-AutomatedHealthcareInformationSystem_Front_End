import React, { useEffect, useState } from 'react';
import { fetchAppointmentDataFromAPI } from '../../api/appointment';
import './box.css';
import { Link } from 'react-router-dom';


function TotalAppointmentsCount() {
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await fetchAppointmentDataFromAPI();

        const currentMonth = new Date().getMonth();
        const lastMonthTotal = allAppointments.filter(appointment => {
          const registrationDateTimeMonth = new Date(appointment.appointmentDateTime).getMonth();
          return registrationDateTimeMonth === currentMonth - 1;
        }).length;

        if (lastMonthTotal !== 0) {
          const changePercentage = (((allAppointments.length - lastMonthTotal) / lastMonthTotal) - allAppointments.length);
          setPercentageChange(changePercentage.toFixed(2));
        } else {
          // Handle the case where last month's total is 0 to avoid division by zero
          setPercentageChange(100);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  const isNegativePercentage = percentageChange < 0;
  const colorStyle = isNegativePercentage ? { color: 'red' } : { color: 'blue' };

  return (
    <Link to='/appointment' className='link'>
      <button className='box'>
        <h2>Appointment Count Change from Last Month</h2>
        <p className='numbers' style={colorStyle}>{percentageChange}%</p>
      </button>
    </Link>
  );
}

export default TotalAppointmentsCount;
