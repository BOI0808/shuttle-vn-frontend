"use client";

import { useEffect } from "react";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import { mapAccountToAuthUser } from "@/utils";

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
      .catch(() => {
        if (active) clearAuth();
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
