import axios from 'axios';
import HttpsApi from './https.api';
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

instance.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 410 && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const refreshToken = LocalStorageApi.readRefreshToken();
                if (!refreshToken) {
                    throw new Error('Refresh token not founded!');
                }

                const response = await HttpsApi.refresh(refreshToken);
                LocalStorageApi.setAccessToken(response.access_token);
                LocalStorageApi.setRefreshToken(response.refresh_token);

                return instance.request(originalRequest);
            } catch (error) {
                console.log('RefreshToken expired!');
            }
        }

        // is status !== 401 or status 401 after refresh
        throw error;
    });

export default instance;

export const refreshInstance = axios.create(axiosOptions);