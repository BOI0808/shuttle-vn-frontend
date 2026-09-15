"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import { LoginRequest, RegisterRequest } from "@/types";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isAdmin, isLoading, setUser, clearAuth } =
    useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginRequest) => {
      await authService.login(payload);
      return authService.getProfile();
    },
    onSuccess: (profile) => {
      setUser(profile);
      if (profile.role === "Admin" || profile.role === "Employee") {
        router.push("/dashboard");
      } else {
        router.push("/courts");
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
