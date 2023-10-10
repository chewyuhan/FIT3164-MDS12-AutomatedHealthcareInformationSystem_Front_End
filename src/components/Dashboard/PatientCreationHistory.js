import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchPatientDataFromAPI } from '../../api/patient';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PatientCreationHistory() {
  const [patientData, setPatientData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('daily'); // Default to daily view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientDataFromAPI();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error); 
      }
    };

    fetchData();
  }, []);

  const countPatientsByDate = () => {
    const countMap = {};

    patientData.forEach((patient) => {
      let date;

      switch (selectedInterval) {
        case 'weekly':
          date = new Date(patient.createdAt);
          date.setHours(0, 0, 0, 0);
          date.setDate(date.getDate() - date.getDay()); // Start of the week
          break;
        case 'monthly':
          date = new Date(patient.createdAt);
          date.setHours(0, 0, 0, 0);
          date.setDate(1); // Start of the month
          break;
        case 'yearly':
          date = new Date(patient.createdAt);
          date.setHours(0, 0, 0, 0);
          date.setMonth(0, 1); // Start of the year
          break;
        default:
          date = new Date(patient.createdAt).toLocaleDateString();
      }

      if (countMap[date]) {
        countMap[date]++;
      } else {
        countMap[date] = 1;
      }
    });

    const dataPoints = Object.keys(countMap).map((date) => ({
      x: new Date(date),
      y: countMap[date],
    }));

    return dataPoints;
  };

  const options = {
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      title: 'Date',
    },
    axisY: {
      title: 'Patient Count',
    },
    data: [
      {
        type: 'column',
        color: 'rgba(0,75,141,0.7)',
        dataPoints: countPatientsByDate(),
      },
    ],
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <div>
      <h2>Patient Creation History</h2>
      <div>
        <label htmlFor="interval">Select Interval: </label>
        <select id="interval" value={selectedInterval} onChange={handleIntervalChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PatientCreationHistory;
