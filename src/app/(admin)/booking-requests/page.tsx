import type { Metadata } from "next";

import { RoleGuard } from "@/components/auth/RoleGuard";
import BookingRequestsClient from "./BookingRequestsClient";

export const metadata: Metadata = { title: "Yêu cầu đặt sân" };

export default function BookingRequestsPage() {
  return (
    <RoleGuard allowedRoles={["Admin", "Employee"]}>
      <BookingRequestsClient />
    </RoleGuard>
  );
}