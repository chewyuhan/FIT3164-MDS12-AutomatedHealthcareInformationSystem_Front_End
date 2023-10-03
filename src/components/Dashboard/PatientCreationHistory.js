import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchPatientDataFromAPI } from '../../api/patient';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PatientCreationHistory() {
  const [patientData, setPatientData] = useState([]);

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
      const date = new Date(patient.createdAt).toLocaleDateString();

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
        type: 'line',
        dataPoints: countPatientsByDate(),
      },
    ],
  };

  return (
    <div>
      <h2>Patient Creation History</h2>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PatientCreationHistory;
