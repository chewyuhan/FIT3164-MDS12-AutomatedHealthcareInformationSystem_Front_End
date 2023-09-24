import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as SlIcons from 'react-icons/sl';
import * as RxIcons from 'react-icons/rx';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <RxIcons.RxDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Patients',
    path: '/patientinfo',
    icon: <MdIcons.MdOutlinePeople />,
    cName: 'nav-text'
  },
  {
    title: 'Appointment',
    path: '/appointment',
    icon: <SlIcons.SlCalender />,
    cName: 'nav-text'
  },
  {
    title: 'Diagnosis',
    path: '/patientdiag',
    icon: <BsIcons.BsFileMedical />,
    cName: 'nav-text'
  },
  {
    title: 'User Info',
    path: '/userinfo',
    icon: <BiIcons.BiUser />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <FiIcons.FiLogOut />,
    cName: 'nav-text'
  }
  
];