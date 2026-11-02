import type { Metadata } from "next";
import { RoleGuard } from "@/components/auth/RoleGuard";
import AuditsClient from "./AuditsClient";

export const metadata: Metadata = { title: "Nhật ký hoạt động" };

export default function AuditsPage() {
  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <AuditsClient />
    </RoleGuard>
  );
}
