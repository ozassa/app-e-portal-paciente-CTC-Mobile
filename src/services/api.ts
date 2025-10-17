import axios, { AxiosError, AxiosInstance } from 'axios';
import ENV from '@/config/environment';
import { storage, STORAGE_KEYS } from '@/utils/storage';

const api: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        await storage.removeItem(STORAGE_KEYS.USER_DATA);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
