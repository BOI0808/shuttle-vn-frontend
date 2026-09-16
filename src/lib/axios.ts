import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '@/config/app';

const BASE_URL = `${APP_CONFIG.apiBaseUrl}`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAuthAndRedirect();
    }
    return Promise.reject(error);
  },
);

function clearAuthAndRedirect() {
  window.location.href = '/login';
}

export default axiosInstance;
