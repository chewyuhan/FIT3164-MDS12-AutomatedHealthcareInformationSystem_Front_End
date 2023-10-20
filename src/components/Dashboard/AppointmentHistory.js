import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchAppointmentDataFromAPI } from '../../api/appointment';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AppointmentHistory() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('daily');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointmentDataFromAPI();
        setAppointmentData(data);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    };

    fetchData();
  }, []);

  const countAppointmentsByDate = () => {
    const countMap = {};

    appointmentData.forEach((appointment) => {
      let date;

      switch (selectedInterval) {
        case 'weekly':
          date = new Date(appointment.appointmentDateTime);
          date.setHours(0, 0, 0, 0);
          date.setDate(date.getDate() - date.getDay()); // Start of the week
          break;
        case 'monthly':
          date = new Date(appointment.appointmentDateTime);
          date.setHours(0, 0, 0, 0);
          date.setDate(1); // Start of the month
          break;
        case 'yearly':
          date = new Date(appointment.appointmentDateTime);
          date.setHours(0, 0, 0, 0);
          date.setMonth(0, 1); // Start of the year
          break;
        default:
          date = new Date(appointment.appointmentDateTime).toLocaleDateString();
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

// Function to format X-axis based on selected interval
const formatXAxis = (interval) => {
  switch (interval) {
    case 'weekly':
      return 'DD MMM';
    case 'monthly':
      return 'MMM YYYY';
    case 'yearly':
      return 'YYYY';
    default:
      return 'DD MMM, YYYY';
  }
};
  const options = {
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      title: 'Date',
      valueFormatString: formatXAxis(selectedInterval), 
    },
    axisY: {
      title: 'Appointment Count',
    },
    toolTip: {
      content: '{x}: {y} Appointments',
    },
    data: [
      {
        type: 'column',
        name: 'Appointments',
        showInLegend: true,
        dataPoints: countAppointmentsByDate(),
      },
    ],
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <div>
      <h2>Appointment History</h2>
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

export default AppointmentHistory;
