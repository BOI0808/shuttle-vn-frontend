"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import { getErrorMessage, isUnauthorizedError } from "@/utils";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let active = true;

    authService
      .getProfile()
      .then((authUser) => {
        if (active) setUser(authUser);
      })
      .catch((error: unknown) => {
        if (!active) return;
        clearAuth();
        // 401 = chưa đăng nhập (khách vãng lai) -> không cần báo.
        // Lỗi khác (mạng, máy chủ) -> báo để người dùng biết vì sao trang trống.
        if (!isUnauthorizedError(error)) {
          toast.error(getErrorMessage(error));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [setUser, clearAuth, setLoading]);

  return <>{children}</>;
}
