import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an instance of Axios with a base URL
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL from environment variable
    timeout: 10000, // Optional timeout
});

// Request interceptor for adding authorization tokens or other headers
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> => {
        return config;
    },
    (error: any): Promise<never> => Promise.reject(error)
);
// Response interceptor for handling errors globally
api.interceptors.response.use(
    (response: AxiosResponse<any, any>): AxiosResponse<any, any> => response,
    (error: any): Promise<never> => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.log("Something went wrong");
        }
        return Promise.reject(error);
    }
);

export default api;
