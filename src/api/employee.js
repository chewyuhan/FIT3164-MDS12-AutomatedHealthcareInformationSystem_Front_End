import axios from "axios";
import { EMPLOYEES_API } from "./apiConfig";

export const fetchUserData = async (accessToken, setUserData) => {
    try {
        const response = await axios.get(EMPLOYEES_API.MY_INFO, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        setUserData(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Re-throw the error to handle it wherever you call this function
    }
};
