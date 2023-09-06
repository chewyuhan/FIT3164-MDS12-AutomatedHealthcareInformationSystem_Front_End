import axios from 'axios'

export const addPatient = (newPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      // Handle the case where there's no access token (authentication failed)
      console.error("No access token found");
      return;
    }

    axios.post("https://mds12.cyclic.app/patients/", newPatient, {
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

  export const editPatient = (patientId, updatedPatient) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      // Handle the case where there's no access token (authentication failed)
      console.error("No access token found");
      return;
    }

    axios.patch(`https://mds12.cyclic.app/patients/${patientId}`, updatedPatient, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // Handle the success response if needed
        console.log("Updated patient successfully:", response.data);
        // You can update your state or take any other action here
      })
      .catch((error) => {
        // Handle the error if the request fails
        console.error("Error updating patient:", error);
      });
  };