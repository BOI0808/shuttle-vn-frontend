"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import { UserRole } from "@/types";

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

    if (!user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  if (isLoading || !user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    const fallbackRoute =
      user.role === "Employee"
        ? "/schedule"
        : user.role === "Admin"
        ? "/dashboard"
        : redirectTo;

    return (
      <div className="mx-auto max-w-2xl py-6">
        <div
          role="alert"
          className="rounded-[12px] border border-line bg-white p-6"
        >
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Bạn không có quyền truy cập
          </h2>
          <div className="mt-3 space-y-0.5 font-sans text-[14px] leading-[20px] text-ink-secondary">
            <p>Tính năng này dành cho tài khoản có quyền phù hợp.</p>
            <p>
              Quay lại khu vực được phép thay vì hiển thị dữ liệu bị hạn chế.
            </p>
          </div>
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.replace(fallbackRoute)}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
