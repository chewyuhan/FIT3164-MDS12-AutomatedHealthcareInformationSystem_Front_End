import axios from 'axios';
import { AUTH_API } from "./apiConfig";

export const postLogin = async (credential) => {
    try {
        const response = await axios({
            url: AUTH_API.SIGNIN,
            method: "post",
            data: credential,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        console.log("Check response data", response);
        return response;
    } catch (error) {
        console.error(error, "what is the error");
        return error.response;
    }
};
