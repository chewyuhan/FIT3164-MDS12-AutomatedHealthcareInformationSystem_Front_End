import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Pages import
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Dashboard';
import PatientInfo from './pages/PatientInfo';
import Appointment from './pages/Appointment';
import PatientDiag from './pages/PatientDiag';
import UserInfo from './pages/UserInfo';

//Components import

import './App.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/patientinfo" element={<PatientInfo />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/patientdiag" element={<PatientDiag />} />
                <Route path="/userinfo" element={<UserInfo />} />

            </Routes>
        </Router>
    );
}
