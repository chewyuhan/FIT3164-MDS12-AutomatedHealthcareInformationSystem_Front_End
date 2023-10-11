import axios from "axios";


export const fetchUserData = async (accessToken, setUserData) => {
    try {
        const response = await axios.get("https://mds12.cyclic.cloud/employees/myinfo", {
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