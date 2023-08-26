
import axios from 'axios'



export const postLogin = async (credential) => {
    console.log(credential,"check credential")
    try {
        const data = await axios({
            url: "http://localhost:3333/auth/signin",
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': "application/json",
                "Accept": 'application/json'
            },
            method: "post",
            data: credential
        })
        console.log(data, "check data")
        return data
    } catch (error) {
        console.log(error, "what ist the error")
        return error.response
    }
}