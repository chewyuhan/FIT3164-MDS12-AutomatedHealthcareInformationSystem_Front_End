import axios from "axios";
import { EMPLOYEES_API } from "./apiConfig";

export const fetchDoctorDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token found");
        return [];
    }

    try {
        const response = await axios.get(EMPLOYEES_API.DOCTORS, {
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
