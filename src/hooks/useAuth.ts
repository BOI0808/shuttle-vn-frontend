"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import {
  CodeType,
  LoginRequest,
  RegisterRequest,
  ResendSetupLinkRequest,
  SetPasswordRequest,
} from "@/types";
import { getErrorMessage, mapAccountToAuthUser } from "@/utils";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {user, isAuthenticated, isLoading, setUser, clearAuth} =
      useAuthStore();

  const isAdmin = user?.role === "Admin";

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const userAccount = await authService.login(payload);
      return mapAccountToAuthUser(userAccount);
    },

    onSuccess: (authUser) => {
      setUser(authUser);

      if (authUser.role === "Customer") {
        router.push("/courts");
      } else {
        router.push("/dashboard");
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

  const setPasswordMutation = useMutation({
    mutationFn: (payload: SetPasswordRequest) =>
      authService.setPassword(payload),
    onSuccess: () => {
      toast.success("Đặt mật khẩu thành công, vui lòng đăng nhập");
      router.push("/login");
    },
  });

  const resendSetupLinkMutation = useMutation({
    mutationFn: (payload: ResendSetupLinkRequest) =>
      authService.resendSetupLink(payload),
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => toast.error(getErrorMessage(error)),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.push("/courts");
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
    sendVerificationCode: (email: string, type: CodeType) =>
      authService.sendVerificationCode({ email, type }),
    setPassword: setPasswordMutation.mutate,
    isSettingPassword: setPasswordMutation.isPending,
    resendSetupLink: resendSetupLinkMutation.mutate,
    isResendingSetupLink: resendSetupLinkMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
