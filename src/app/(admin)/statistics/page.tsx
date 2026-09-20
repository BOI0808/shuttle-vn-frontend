import type { Metadata } from "next";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: "Thống kê báo cáo" };

export default function StatisticsPage() {
  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-slate-900">Thống kê báo cáo</h2>
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
          Chức năng thống kê báo cáo đang được phát triển.
        </div>
      </div>
    </RoleGuard>
  );
}
