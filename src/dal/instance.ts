import axios from 'axios';
import {readAccessToken} from "../utils/localStorage.functions";

const baseURL = 'https://startup-summer-2023-proxy.onrender.com/2.0/';

const axiosOptions = {
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
    withCredentials: true,
    baseURL,
};

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
    const accessToken = readAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});