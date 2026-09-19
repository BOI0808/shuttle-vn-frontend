"use client";

import { useQuery } from "@tanstack/react-query";
import { courtService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ManageCourtsClient() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.courts,
    queryFn: () => courtService.getCourts(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Quản lý sân</h2>
        <Button size="sm" className="w-auto">
          <span className="material-symbols-outlined text-[16px] mr-1">add</span>
          Thêm sân mới
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Tên sân</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Mô tả</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Ngày tạo</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500 font-mono">Đang tải...</td></tr>
              ) : data?.items.map((court) => (
                <tr key={court.courtId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-[13px] font-bold text-slate-900">{court.name}</td>
                  <td className="px-5 py-4 text-[13px] text-slate-600">{court.description}</td>
                  <td className="px-5 py-4">
                    <Badge status={court.status === "ACTIVE" ? "COMPLETED" : "CANCELLED"}>
                      {court.status === "ACTIVE" ? "Hoạt động" : "Bảo trì"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[11px] font-mono text-slate-500">{new Date(court.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="outline" size="sm" className="w-auto inline-flex">Sửa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
