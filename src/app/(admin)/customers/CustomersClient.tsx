"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { useCustomers } from "@/hooks";
import { ACCOUNT_STATUS_LABEL } from "@/config/app";
import { getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 400;
const COLUMN_COUNT = 6;

export default function CustomersClient() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput.trim());
      setPageNumber(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useCustomers({
    keyword,
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Quản lý khách hàng</h2>
        <input
          className="w-full max-w-[320px] rounded-[7px] border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          placeholder="Tìm theo tên, SĐT, email..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                  Khách hàng
                </th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                  Liên hệ
                </th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                  Loại
                </th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                  Trạng thái tài khoản
                </th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold">
                  Ngày đăng ký
                </th>
                <th className="px-5 py-3 border-b border-slate-100 font-semibold text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td
                    colSpan={COLUMN_COUNT}
                    className="px-5 py-8 text-center text-slate-500 font-mono"
                  >
                    Đang tải...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td
                    colSpan={COLUMN_COUNT}
                    className="px-5 py-8 text-center text-sm text-red-600"
                  >
                    {getErrorMessage(error)}
                  </td>
                </tr>
              )}
              {data && items.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMN_COUNT}
                    className="px-5 py-8 text-center text-sm text-slate-500"
                  >
                    Không tìm thấy khách hàng nào.
                  </td>
                </tr>
              )}
              {items.map((cust) => (
                <tr
                  key={cust.customerId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-bold text-slate-900">
                      {cust.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cust.customerId}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] text-slate-700">{cust.phone}</p>
                    <p className="text-[11px] text-slate-400">{cust.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={cust.hasAccount ? "Confirmed" : "Pending"}>
                      {cust.hasAccount ? "Thành viên" : "Vãng lai"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    {cust.accountStatus ? (
                      <Badge status={cust.accountStatus}>
                        {ACCOUNT_STATUS_LABEL[cust.accountStatus]}
                      </Badge>
                    ) : (
                      <span className="text-[13px] text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[11px] font-mono text-slate-500">
                    {new Date(cust.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-auto inline-flex"
                      onClick={() => router.push(`/customers/${cust.customerId}`)}
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data && <Pagination page={data} onPageChange={setPageNumber} />}
    </div>
  );
}