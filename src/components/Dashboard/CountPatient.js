import React, { useEffect, useState } from 'react';
import { fetchPatientDataFromAPI } from '../../api/patient';
import './box.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function TotalPatient() {
  const [totalPatient, setTotalPatient] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPatient = await fetchPatientDataFromAPI(); // Replace with your actual API call

        // Assuming createdAt is a date field in each patient record
        const currentMonth = new Date().getMonth();
        const lastMonthTotal = allPatient.filter(patient => {
          const createdAtMonth = new Date(patient.createdAt).getMonth();
          return createdAtMonth === currentMonth - 1;
        }).length;

        setTotalPatient(allPatient.length);

        if (lastMonthTotal !== 0) {
          const changePercentage = ((allPatient.length - lastMonthTotal) / lastMonthTotal) -allPatient.length;
          setPercentageChange(changePercentage.toFixed(2));
        } else {
          // Handle the case where last month's total is 0 to avoid division by zero
          setPercentageChange(100); // Assuming a 100% increase if last month had no patients
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
    <Link to='/patientinfo' className='link'>
    <button className='box'>
      {/* <h2>Total Patient</h2>
      <p>{totalPatient}</p> */}
      <h2>Patient Count Change from Last Month</h2>
      <p className='numbers' style={colorStyle}>{percentageChange}%</p>
    </button>
    </Link>
  );
}

export default TotalPatient;
