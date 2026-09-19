import type { Metadata } from "next";
import EmployeesClient from "@/app/(admin)/employees/EmployeesClient";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: "Quản lý nhân viên " };

export default function EmployeesPage() {
  return (
    <RoleGuard allowedRoles={['Admin']}>
      <EmployeesClient />
    </RoleGuard>
  );
}
