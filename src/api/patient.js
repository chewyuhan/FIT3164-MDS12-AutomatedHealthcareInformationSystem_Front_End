import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PATIENTS_API } from './apiConfig';

export const addPatient = (newPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.post(PATIENTS_API.ADD, newPatient, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Added patient successfully:", response.data);
            toast.success('Patient Added Successfully !')
        })
        .catch((error) => {
            console.error("Error adding patient:", error);
            toast.error('Patient Added Unsuccessful !')
        });
};

export const editPatient = (patientId, updatedPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.patch(PATIENTS_API.EDIT(patientId), updatedPatient, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Updated patient successfully:", response.data);
            toast.success('Patient Updated Successfully !')
        })
        .catch((error) => {
            console.error("Error updating patient:", error);
            toast.error('Patient Updated Unsuccessful !')
        });
};

export const fetchPatientDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return [];
    }
    
    try {
        const response = await axios.get(PATIENTS_API.ALL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        return [];
    }
};
