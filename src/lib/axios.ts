import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { APP_CONFIG } from "@/config/app";
import { useAuthStore } from "@/stores/auth.store";

const BASE_URL = `${APP_CONFIG.apiBaseUrl}`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toUpperCase();
    if (method && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const csrfToken = getCsrfTokenFromCookie();
      if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default axiosInstance;
