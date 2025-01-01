import api from "./axios";
import { isAxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export const postVisitorApi = async (data: object): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await api.post("/visitor", JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
        return response;
    } catch (error) {
        if (isAxiosError(error)) return error.response;
        return null;
    }
};

export const postLoginApi = async (data: object): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_KEYCLOAK_TOKEN_URL,
            new URLSearchParams({
                grant_type: 'password',
                client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
                username: data["email"],
                password: data["password"]
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log("Status code:", response.status);
        console.log("Access Token:", response.data.access_token);
        return response
    } catch (error) {
        if (isAxiosError(error)) return error.response;
        return null;
    }
};
