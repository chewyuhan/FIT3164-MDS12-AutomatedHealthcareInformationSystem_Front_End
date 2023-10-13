import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DIAGNOSES_API } from "./apiConfig";

export const fetchDiagnosisDataFromAPI = async (patientId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return [];
    }

    try {
        const response = await axios.get(DIAGNOSES_API.BY_PATIENT(patientId), {
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

export const fetchAllDiagnosisDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return [];
    }

    try {
        const response = await axios.get(DIAGNOSES_API.ALL, {
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

export const addDiagnosis = (newDiagnosis) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.post(DIAGNOSES_API.ADD, newDiagnosis, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Added diagnosis successfully:", response.data);
            toast.success('Diagnosis Added Successfully !');
        })
        .catch((error) => {
            console.error("Error adding diagnosis:", error);
            toast.error('Diagnosis Added Unsuccessful !');
        });
};

export const editDiagnosis = (diagnosisId, updatedDiagnosis) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.patch(DIAGNOSES_API.EDIT(diagnosisId), updatedDiagnosis, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            console.log("Updated diagnosis successfully:", response.data);
            toast.success('Diagnosis Updated Successfully !');
        })
        .catch((error) => {
            console.error("Error updating diagnosis:", error);
            toast.error('Diagnosis Updated Unsuccessful !');
        });
};

export const deleteDiagnosis = (diagnosisId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    axios.delete(DIAGNOSES_API.DELETE(diagnosisId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(() => {
            console.log("Deleted diagnosis successfully:", diagnosisId);
            toast.success('Diagnosis Deleted Successfully !');
        })
        .catch((error) => {
            console.error("Error deleting diagnosis:", error);
            toast.error('Diagnosis Deletion Unsuccessful !');
        });
};
