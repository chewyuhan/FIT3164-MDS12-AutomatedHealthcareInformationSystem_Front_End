import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to fetch diagnosis data from the API
export const fetchDiagnosisDataFromAPI = async (patientId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    
    try {
        const response = await axios.get(`https://mds12.cyclic.cloud/diagnoses/patient/${patientId}`, {
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

//Function to fetch all diagnosis data from the API
export const fetchAllDiagnosisDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    
    try {
        const response = await axios.get(`https://mds12.cyclic.cloud/diagnoses/all`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        return [];
    }
}


export const addDiagnosis = (newDiagnosis) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(newDiagnosis)
    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.post("https://mds12.cyclic.cloud/diagnoses/", newDiagnosis, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Added patient successfully:", response.data);
            toast.success('Diagnosis Added Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error adding patient:", error);
            toast.error('Diagnosis Added Unsuccessful !')
        });
};

export const editDiagnosis = (diagnosisId, updatedDiagnosis) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.patch(`https://mds12.cyclic.cloud/diagnoses/${diagnosisId}`, updatedDiagnosis, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Updated patient successfully:", response.data);
            toast.success('Diagnosis Updated Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error updating patient:", error);
            toast.error('Diagnosis Updated Unsuccessful !')
        });
};

export const deleteDiagnosis = (diagnosisId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.delete(`https://mds12.cyclic.cloud/diagnoses/${diagnosisId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Delete patient successfully:", response.data);
            toast.success('Diagnosis Deleted Successfully !')
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error deleting patient:", error);
            toast.error('Diagnosis Deleted Unsuccessful !')
        });
};