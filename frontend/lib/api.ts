import api from "./axios";
import { isAxiosError, AxiosResponse } from 'axios';

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

export const getVisitorApi = async (): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await api.get("/visitor", { withCredentials: true });
        return response;
    } catch (error) {
        if (isAxiosError(error)) return error.response;
        return null;
    }
};

export const postLoginApi = async (data: object): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await api.post("/auth/login", JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response
    } catch (error) {
        if (isAxiosError(error)) return error.response;
        return null;
    }
};

export const postLogoutApi = async (): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await api.post("/auth/logout", {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response
    } catch (error) {
        if (isAxiosError(error)) return error.response;
        return null;
    }
};
