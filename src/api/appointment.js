import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const fetchAppointmentDataFromAPI = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    
    try {
        const response = await axios.get("https://mds12.cyclic.cloud/appointments/all", {
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

export const addAppointment = async (newAppointment) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.post("https://mds12.cyclic.cloud/appointments/", newAppointment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Added patient successfully:", response.data);
            toast.success('Appointment Added Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error adding patient:", error);
            toast.error('Appointment Added Unsuccessful !')
        });
};

export const fetchAppointmentsbyPatient = async (patientId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return [];
    }
    try {
        const response = await axios.get(`https://mds12.cyclic.cloud/appointments/patient/${patientId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}

export const editAppointment = async (appointmentId, updatedAppointment) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("updateappointmetn",updatedAppointment)
    console.log("appointmentId",appointmentId)
    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.patch(`https://mds12.cyclic.cloud/appointments/${appointmentId}`, updatedAppointment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Updated appointment successfully:", response.data);
            toast.success('Appointment Edited Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error updating appointment:", error);
            toast.error('Appointmetn Edit Unsuccessful !')
        });
}

export const deleteAppointment = async (appointmentId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    if (!appointmentId) {
        // Handle the case where there's no appointment ID
        console.error("No appointment ID found");
        return;
    }

    axios.delete(`https://mds12.cyclic.cloud/appointments/${appointmentId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(() => {
            // Handle the success response if needed
            console.log("Deleted appointment successfully:", appointmentId);
            toast.success('Appointment Deleted Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error deleting appointment:", error);
            toast.error('Appointment Deletion Unsuccessful !')
        });
}