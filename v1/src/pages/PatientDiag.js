import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import PatientDiagnosisForm from '../components/PatientDiagForm/DiagForm';

function PatientDiag() {
  return (
    <div className='patientdiag'>
      <Sidebar />
      <h1>PatientDiag</h1>
      <PatientDiagnosisForm />
    </div>
  );
}

export default PatientDiag;