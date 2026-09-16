"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {authService} from "@/services";
import {AuthUser, useAuthStore} from "@/stores/auth.store";
import {CodeType, LoginRequest, RegisterRequest} from "@/types";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {user, isAuthenticated, isAdmin, isLoading, setUser, clearAuth} =
      useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const userAccount = await authService.login(payload);
      if (userAccount.accountType == "Customer") {
        if (userAccount.customer === null)
          throw new Error("Customer profile is null");

        const authUser: AuthUser = {
          accountId: userAccount.accountId,
          fullName: userAccount.customer.email,
          phone: userAccount.customer.phone,
          email: userAccount.customer.email,
          role: "Customer",
        };
        return authUser;
      }
      else {
        if (userAccount.employee === null)
          throw new Error("Employee profile is null");

        const authUser: AuthUser = {
          accountId: userAccount.accountId,
          fullName: userAccount.employee.email,
          phone: userAccount.employee.phone,
          email: userAccount.employee.email,
          role: userAccount.employee.isAdmin ? "Admin" : "Employee",
        };
        return authUser;
      }
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
