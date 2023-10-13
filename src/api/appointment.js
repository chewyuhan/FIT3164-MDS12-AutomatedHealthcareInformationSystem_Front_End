import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APPOINTMENTS_API } from "./apiConfig";

export const fetchAppointmentDataFromAPI = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    try {
        const response = await axios.get(APPOINTMENTS_API.ALL, {
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
        console.error("No access token found");
        return;
    }

    axios.post(APPOINTMENTS_API.ADD, newAppointment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Added patient successfully:", response.data);
            toast.success('Appointment Added Successfully !');
        })
        .catch((error) => {
            console.error("Error adding patient:", error);
            toast.error('Appointment Added Unsuccessful !');
        });
};

export const fetchAppointmentsbyPatient = async (patientId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return [];
    }

    try {
        const response = await axios.get(APPOINTMENTS_API.BY_PATIENT(patientId), {
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

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.patch(APPOINTMENTS_API.EDIT(appointmentId), updatedAppointment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Updated appointment successfully:", response.data);
            toast.success('Appointment Edited Successfully !');
        })
        .catch((error) => {
            console.error("Error updating appointment:", error);
            toast.error('Appointment Edit Unsuccessful !');
        });
}

export const deleteAppointment = async (appointmentId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    if (!appointmentId) {
        console.error("No appointment ID found");
        return;
    }

    axios.delete(APPOINTMENTS_API.DELETE(appointmentId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(() => {
            console.log("Deleted appointment successfully:", appointmentId);
            toast.success('Appointment Deleted Successfully !');
        })
        .catch((error) => {
            console.error("Error deleting appointment:", error);
            toast.error('Appointment Deletion Unsuccessful !');
        });
};
