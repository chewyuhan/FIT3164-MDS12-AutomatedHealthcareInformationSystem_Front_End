import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addPatient = (newPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.post("https://mds12-dev.cyclic.cloud/patients/", newPatient, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Added patient successfully:", response.data);
            toast.success('Patient Added Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error adding patient:", error);
            toast.error('Patient Added Unsuccessful !')
        });
};

export const editPatient = (patientId, updatedPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.patch(`https://mds12-dev.cyclic.cloud/patients/${patientId}`, updatedPatient, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Updated patient successfully:", response.data);
            toast.success('Patient Updated Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error updating patient:", error);
            toast.error('Patient Updated Unsuccessful !')
        });
};

// Function to fetch data from the API
export const fetchPatientDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    
    try {
        const response = await axios.get("https://mds12-dev.cyclic.cloud/patients/all", {
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