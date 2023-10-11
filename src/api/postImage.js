import axios from 'axios'

export const uploadImage = async (imageDir, onResponseData) => {
    try {
        const formData = new FormData();
        formData.append('image', imageDir);

        const response = await axios.post('https://mds12htr.cyclic.app/patient_htr_sample', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Image uploaded successfully:', response.data);
        onResponseData(response.data); // Assuming you want to do something with the response data
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Re-throw the error to handle it wherever you call this function
    }
};