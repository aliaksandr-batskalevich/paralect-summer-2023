export const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken);
export const readAccessToken = () => localStorage.getItem('accessToken');

export const setRefreshToken = (refreshToken: string) => localStorage.setItem('refreshToken', refreshToken);
export const readRefreshToken = () => localStorage.getItem('refreshToken');