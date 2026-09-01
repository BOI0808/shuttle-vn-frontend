"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types";
import { UserRole } from "@/types";

function resolveUserRole(data: AuthResponse) {
  let role: UserRole = "Customer";
  let name = data.account.username;
  let id = data.account.accountId;

  if (data.employee) {
    role = data.employee.isAdmin ? "Admin" : "Employee";
    name = data.employee.fullName;
    id = data.employee.employeeId;
  } else if (data.customer) {
    name = data.customer.fullName;
    id = data.customer.customerId;
  }

  return {
    ...data.account,
    id,
    name,
    role,
    employee: data.employee,
    customer: data.customer,
  };
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth, clearAuth, isAuthenticated, isAdmin, user } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: (data) => {
      const user = resolveUserRole(data);
      setAuth(user, data.accessToken, data.refreshToken);
      if (user.role === "Admin") {
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

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    isAuthenticated,
    isAdmin,
    profile: profileQuery.data,
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
