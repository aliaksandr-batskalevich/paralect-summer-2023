import axios from 'axios';
import {LocalStorageApi} from "./localStorage.api";

const baseURL = 'https://startup-summer-2023-proxy.onrender.com/2.0/';

const axiosOptions = {
    headers: {
        ['x-secret-key']: 'GEU4nvd3rej*jeh.eqp',
        ['X-Api-App-Id']: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    },
    withCredentials: true,
    baseURL,
};

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
    const accessToken = LocalStorageApi.readAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});