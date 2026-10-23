import type { Metadata } from "next";

import { RoleGuard } from "@/components/auth/RoleGuard";
import CustomerDetailClient from "./CustomerDetailClient";

export const metadata: Metadata = { title: "Chi tiết khách hàng" };

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;

  return (
    <RoleGuard allowedRoles={["Admin", "Employee"]}>
      <CustomerDetailClient id={id} />
    </RoleGuard>
  );
}