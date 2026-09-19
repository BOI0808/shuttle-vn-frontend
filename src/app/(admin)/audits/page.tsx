import type { Metadata } from "next";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: "Lịch sử hệ thống" };

export default function AuditsPage() {
  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-slate-900">Lịch sử hệ thống</h2>
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
          Chức năng lịch sử hệ thống đang được phát triển.
        </div>
      </div>
    </RoleGuard>
  );
}
