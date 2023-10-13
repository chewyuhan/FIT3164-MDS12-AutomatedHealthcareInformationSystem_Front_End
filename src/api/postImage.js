import axios from 'axios';
import { IMAGES_API } from './ML_apiConfig';

export const uploadImage = async (imageDir, onResponseData) => {
    try {
        const formData = new FormData();
        formData.append('image', imageDir);

        const response = await axios.post(IMAGES_API.UPLOAD_SAMPLE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Image uploaded successfully:', response.data);
        onResponseData(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
