import type { Metadata } from "next";

import { RoleGuard } from "@/components/auth/RoleGuard";
import AllBookingsClient from "./AllBookingsClient";

export const metadata: Metadata = { title: "Đặt sân toàn hệ thống" };

interface AllBookingsPageProps {
  searchParams: Promise<{ customerId?: string | string[] }>;
}

export default async function AllBookingsPage({
  searchParams,
}: AllBookingsPageProps) {
  const { customerId } = await searchParams;

  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <AllBookingsClient
        initialCustomerId={
          typeof customerId === "string" && customerId !== ""
            ? customerId
            : undefined
        }
      />
    </RoleGuard>
  );
}