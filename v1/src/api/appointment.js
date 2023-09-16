import axios from "axios";

export const fetchAppointmentDataFromAPI = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }
    
    try {
        const response = await axios.get("https://mds12.cyclic.app/appointments/all", {
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
    console.log(newAppointment)
    if (!accessToken) {
        // Handle the case where there's no access token (authentication failed)
        console.error("No access token found");
        return;
    }

    axios.post("https://mds12.cyclic.app/appointments/", newAppointment, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            // Handle the success response if needed
            console.log("Added patient successfully:", response.data);
            // You can update your state or take any other action here
        })
        .catch((error) => {
            // Handle the error if the request fails
            console.error("Error adding patient:", error);
        });
};