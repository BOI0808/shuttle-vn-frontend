"use client";

import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function CustomersClient() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.customers,
    queryFn: () => customerService.getCustomers(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Quản lý khách hàng</h2>
        <Button size="sm" className="w-auto">
          <span className="material-symbols-outlined text-[16px] mr-1">person_add</span>
          Thêm khách hàng
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Khách hàng</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Liên hệ</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Loại</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">Ngày đăng ký</th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500 font-mono">Đang tải...</td></tr>
              ) : data?.items.map((cust) => (
                <tr key={cust.customerId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-bold text-slate-900">{cust.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{cust.customerId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] text-slate-700">{cust.phone}</p>
                    <p className="text-[11px] text-slate-400">{cust.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={cust.accountId ? "CONFIRMED" : "PENDING"}>
                      {cust.accountId ? "Thành viên" : "Vãng lai"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[11px] font-mono text-slate-500">{new Date(cust.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="outline" size="sm" className="w-auto inline-flex">Chi tiết</Button>
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
