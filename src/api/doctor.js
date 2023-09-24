import axios from "axios";

// Function to fetch diagnosis data from the API

export const fetchDoctorDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    try {
        const response = await axios.get(`https://mds12-dev.cyclic.cloud/employees/doctors`, {
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