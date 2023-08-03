import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardLeft from '../components/Dashboard/Dashboard1';
import DashboardRight from '../components/Dashboard/Dashboard2';
import './Dashboard.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className='homepage'>
      {/* UserProfilePicture */}
      <Sidebar />
      <h1>Dashboard</h1>

      <div className="dashboard-container">
        <div className="dashboard-column">
          <DashboardLeft />
        </div>
        <div className="dashboard-column">
          <DashboardRight />
        </div>
      </div>

      {/* Your other content */}
    </div>
  );
}

export default Home;
