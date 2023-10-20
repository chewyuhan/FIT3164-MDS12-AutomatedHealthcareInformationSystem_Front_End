import { useEffect } from "react";

const local = "http://localhost:3333";
const host = "https://mds12.cyclic.cloud";

// Change this to local if you want to run the app locally
const BASE_URL = host;

export const APPOINTMENTS_API = {
  ALL: `${BASE_URL}/appointments/all`,
  ADD: `${BASE_URL}/appointments/`,
  BY_PATIENT: (patientId) => `${BASE_URL}/appointments/patient/${patientId}`,
  EDIT: (appointmentId) => `${BASE_URL}/appointments/${appointmentId}`,
  DELETE: (appointmentId) => `${BASE_URL}/appointments/${appointmentId}`,
};

export const DIAGNOSES_API = {
  BY_PATIENT: (patientId) => `${BASE_URL}/diagnoses/patient/${patientId}`,
  ALL: `${BASE_URL}/diagnoses/all`,
  ADD: `${BASE_URL}/diagnoses/`,
  EDIT: (diagnosisId) => `${BASE_URL}/diagnoses/${diagnosisId}`,
  DELETE: (diagnosisId) => `${BASE_URL}/diagnoses/${diagnosisId}`,
};

export const AUTH_API = {
  SIGNIN: `${BASE_URL}/auth/signin`,

};

export const EMPLOYEES_API = {
  DOCTORS: `${BASE_URL}/employees/doctors`,
  MY_INFO: `${BASE_URL}/employees/myinfo`,
};

export const PATIENTS_API = {
  ADD: `${BASE_URL}/patients/`,
  EDIT: (patientId) => `${BASE_URL}/patients/${patientId}`,
  ALL: `${BASE_URL}/patients/all`,
};