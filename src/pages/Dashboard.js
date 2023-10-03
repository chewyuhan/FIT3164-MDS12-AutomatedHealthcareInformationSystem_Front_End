import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import PatientCreationHistory from '../components/Dashboard/PatientCreationHistory';
import FutureAppointmentsTable from '../components/Dashboard/FutureAppointment';
import TotalAppointmentsCount from '../components/Dashboard/CountAppointment';
import TotalPatient from '../components/Dashboard/CountPatient';
import Completed from '../components/Dashboard/Completed';
import NotCompleted from '../components/Dashboard/NotCompleted';
import './dashboardpages.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className='homepage'>
      {/* UserProfilePicture */}
      <Sidebar />
      {/* Dashboard */}

      <div className="dashboard-container">
        <div className="dashboard-upper">
          <div className="dashboard-item">
            <TotalAppointmentsCount />
          </div>
          <div className="dashboard-item">
            <TotalPatient />
          </div>
          <div className="dashboard-item">
            <Completed />
          </div>
          <div className="dashboard-item">
            <NotCompleted />
          </div>
        </div>
        <div className="dashboard-lower">
          <div className="dashboard-column">
            <PatientCreationHistory />
          </div>
          <div className="dashboard-column">
            <div className="dashboard-table">
            <FutureAppointmentsTable />
            </div>
          </div>
        </div>
      </div>

      {/* Your other content */}
    </div>
  );
}

export default Home;
