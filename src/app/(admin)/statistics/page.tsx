import type { Metadata } from "next";

import { RoleGuard } from "@/components/auth/RoleGuard";
import StatisticsClient from "./StatisticsClient";

export const metadata: Metadata = { title: "Thống kê báo cáo" };

export default function StatisticsPage() {
  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <StatisticsClient />
    </RoleGuard>
  );
}