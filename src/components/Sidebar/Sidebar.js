import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './sidebar.css';
import { IconContext } from 'react-icons';
import axios from "axios";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const accessToken =  sessionStorage.getItem("accessToken");

    if (accessToken) {
      axios.get("https://mds12-dev.cyclic.cloud/employees/myinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  useEffect(() => {
    const currentPath = SidebarData.find(item => item.path === location.pathname)?.header;
    setCurrentPage(currentPath || '');
  }, [location.pathname]);

  return (
    <>
  
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='open'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='navbar-title'>
            <h1>{currentPage}</h1>
            </div>
          <div className='navbar-user'>
            <h1>Hi, Dr {userData?.firstName} </h1>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='close'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
