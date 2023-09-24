import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'; // Assuming SidebarData is an array of sidebar menu items
import './sidebar.css';
import { IconContext } from 'react-icons';
import axios from "axios";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    // Retrieve the access token from sessionStorage
    const accessToken =  sessionStorage.getItem("accessToken");
    
    // If the access token exists, make an authenticated API call
    if (accessToken) {
      axios.get("https://mds12-dev.cyclic.cloud/employees/myinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // Handle the API response and update the user data state
        console.log("API call response:", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='navbar-user'>
            <h1>Hi, Dr {userData?.firstName} </h1>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
