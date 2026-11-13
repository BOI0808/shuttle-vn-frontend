import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig,} from "axios";
import {toast} from "sonner";
import {useAuthStore} from "@/stores/auth.store";
import {getStatusMessage} from "@/utils/api-error";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Các endpoint không được báo "hết phiên" khi trả 401:
 * - login: sai mật khẩu -> form đăng nhập tự hiển thị lỗi.
 * - me: chưa đăng nhập là bình thường, không cần cảnh báo.
 * - logout: đăng xuất dù phiên đã hết vẫn phải thoát.
 */
const AUTH_401_EXEMPT = ["/auth/login", "/auth/me", "/auth/logout"];

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
      const url = error.config?.url ?? "";
      const isExempt = AUTH_401_EXEMPT.some((path) => url.includes(path));
      if (!isExempt) {
        useAuthStore.getState().clearAuth();
        toast.error(getStatusMessage(401));
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.assign("/login");
        }
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
