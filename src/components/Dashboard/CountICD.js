import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchAllDiagnosisDataFromAPI } from '../../api/diagnosis';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DiagnosisHistory() {
  const [diagnosisData, setDiagnosisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllDiagnosisDataFromAPI();
        setDiagnosisData(data);
      } catch (error) {
        console.error('Error fetching diagnosis data:', error);
      }
    };

    fetchData();
  }, []);

  const countDiagnosesByICD = () => {
    const countMap = {};

    diagnosisData.forEach((diagnosis) => {
      const icd = diagnosis.icd;

      if (countMap[icd]) {
        countMap[icd]++;
      } else {
        countMap[icd] = 1;
      }
    });

    const dataPoints = Object.keys(countMap).map((icd) => ({
      label: icd,
      y: countMap[icd],
    }));

    return dataPoints;
  };

  const options = {
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      title: 'ICD Code',
    },
    axisY: {
      title: 'Diagnosis Count',
    },
    data: [
      {
        type: 'bar',
        dataPoints: countDiagnosesByICD(),
      },
    ],
  };

  return (
    <div>
      <h2>Top 10 Diagnosis</h2>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default DiagnosisHistory;
