import type { Metadata } from "next";

import { RoleGuard } from "@/components/auth/RoleGuard";
import BookingDetailClient from "./BookingDetailClient";

export const metadata: Metadata = { title: "Chi tiết đặt sân" };

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id } = await params;

  return (
    <RoleGuard allowedRoles={["Admin", "Employee"]}>
      <BookingDetailClient id={id} />
    </RoleGuard>
  );
}