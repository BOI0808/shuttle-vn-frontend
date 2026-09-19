"use client";

import { useAuthStore } from "@/stores/auth.store";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/courts",
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!user || !allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, allowedRoles, router, redirectTo]);

  if (isLoading || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
