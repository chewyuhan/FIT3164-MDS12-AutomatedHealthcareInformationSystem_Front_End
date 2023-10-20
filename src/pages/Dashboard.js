import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import FutureAppointmentsTable from '../components/Dashboard/FutureAppointment';
import TotalAppointmentsCount from '../components/Dashboard/CountAppointment';
import TotalPatient from '../components/Dashboard/CountPatient';
import Completed from '../components/Dashboard/Completed';
import NotCompleted from '../components/Dashboard/NotCompleted';
import SwiperComponent from '../components/Dashboard/swiperComponent';
import './dashboardpages.css';

function Home() {
  return (
    <div className='homepage'>
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
            <SwiperComponent />
          </div>
          <div className="dashboard-column">
            <div className="dashboard-table">
            <FutureAppointmentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
