"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import {CodeType, LoginRequest, RegisterRequest} from "@/types";
import {customerService} from "@/services/customer.service";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isAdmin, isLoading, setUser, clearAuth } =
    useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginRequest) => {
      await authService.login(payload);
      return customerService.getProfile();
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
      toast.success("Đăng kí thành công, đang chuyển hướng về trang đăng nhập");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
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
    sendVerificationCode: (email: string, type: CodeType) => authService.sendVerificationCode({email, type}),
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
