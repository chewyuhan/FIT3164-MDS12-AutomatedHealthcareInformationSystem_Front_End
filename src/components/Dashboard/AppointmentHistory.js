import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchAppointmentDataFromAPI } from '../../api/appointment';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AppointmentHistory() {
  const [appointmentData, setAppointmentData] = useState([]);

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
      const date = new Date(appointment.appointmentDateTime).toLocaleDateString();

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
      valueFormatString: 'DD MMM, YYYY', // Format date on X-axis
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

  return (
    <div>
      <h2>Appointment History</h2>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default AppointmentHistory;
