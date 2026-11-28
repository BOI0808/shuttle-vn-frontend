"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomerFormModal } from "@/components/admin/CustomerFormModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { useCustomers } from "@/hooks";
import { ACCOUNT_STATUS_LABEL } from "@/config/app";
import { getErrorMessage } from "@/utils";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 400;

export default function CustomersClient() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput.trim());
      setPageNumber(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error, refetch } = useCustomers({
    keyword,
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Khách hàng
          </h1>
          <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            Danh bạ khách hàng và thông tin tài khoản
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          icon="person_add"
          onClick={() => setIsAddModalOpen(true)}
        >
          Thêm khách hàng
        </Button>
      </div>

      <section className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="p-5">
          <Label
            htmlFor="customer-search"
            className="mb-2 text-[14px] font-semibold leading-[20px] text-ink"
          >
            Tìm khách hàng
          </Label>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              id="customer-search"
              icon={
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  search
                </span>
              }
              placeholder="Tìm theo tên, số điện thoại hoặc email"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              containerClassName="min-w-[240px] flex-1 max-w-[736px]"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchInput("");
                setKeyword("");
                setPageNumber(1);
              }}
            >
              Xóa lọc
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div aria-busy="true">
            <div className="hidden h-[44px] grid-cols-4 items-center border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold text-ink-secondary md:grid">
              <span>Họ tên</span>
              <span>Số điện thoại</span>
              <span>Email</span>
              <span>Trạng thái</span>
            </div>
            <div className="space-y-4 p-5">
              {[0, 1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-1 gap-3 py-1.5 animate-pulse md:grid-cols-4"
                >
                  <div className="h-[16px] w-48 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-36 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-56 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-32 rounded-[8px] bg-surface-soft" />
                </div>
              ))}
              <div className="border-t border-line pt-4">
                <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink-secondary">
                  Đang tải danh sách khách hàng…
                </p>
                <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
                  Chưa có dữ liệu để xác định số lượng hoặc trạng thái tài khoản.
                </p>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="border-t border-line p-6"
          >
            <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                warning
              </span>
            </div>
            <h2 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
              Không thể tải danh sách khách hàng
            </h2>
            <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
              {getErrorMessage(error)}
            </p>
            <div className="mt-4">
              <Button type="button" variant="primary" onClick={() => refetch()}>
                Thử lại
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center border-t border-line px-6 py-12 text-center">
            <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                group
              </span>
            </div>
            <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
              {searchInput.trim()
                ? "Không tìm thấy kết quả"
                : "Chưa có khách hàng nào"}
            </p>
            <p className="mt-1 max-w-md font-sans text-[14px] text-ink-secondary">
              {searchInput.trim()
                ? "Không có khách hàng phù hợp với từ khóa sau khi tải thành công."
                : "Thêm khách hàng mới để bắt đầu quản lý hồ sơ và lịch sử đặt sân."}
            </p>
            {searchInput.trim() && (
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSearchInput("");
                    setKeyword("");
                    setPageNumber(1);
                  }}
                >
                  Xóa tìm kiếm
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Khách hàng
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Liên hệ
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Loại
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Trạng thái tài khoản
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Ngày đăng ký
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-semibold"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((cust) => (
                    <tr
                      key={cust.customerId}
                      className="transition-colors duration-100 hover:bg-surface-bg"
                    >
                      <td className="px-5 py-4 align-middle">
                        <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                          {cust.fullName}
                        </p>
                        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                          {cust.customerId}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <p className="font-sans text-[14px] leading-[20px] text-ink tabular-nums">
                          {cust.phone}
                        </p>
                        <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
                          {cust.email}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <Badge status={cust.hasAccount ? "Confirmed" : "Pending"}>
                          {cust.hasAccount ? "Thành viên" : "Vãng lai"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {cust.accountStatus ? (
                          <Badge status={cust.accountStatus}>
                            {ACCOUNT_STATUS_LABEL[cust.accountStatus]}
                          </Badge>
                        ) : (
                          <span className="font-sans text-[14px] text-ink-secondary">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-middle font-sans text-[14px] leading-[20px] text-ink-secondary tabular-nums">
                        {new Date(cust.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-5 py-4 text-right align-middle">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(`/customers/${cust.customerId}`)
                          }
                        >
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-line border-t border-line md:hidden">
              {items.map((cust) => (
                <div key={cust.customerId} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-sans text-[14px] font-semibold leading-[20px] text-ink">
                        {cust.fullName}
                      </p>
                      <p className="mt-0.5 font-sans text-[14px] text-ink-secondary tabular-nums">
                        {cust.phone}
                      </p>
                      <p className="truncate font-sans text-[12px] text-ink-secondary">
                        {cust.email}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge status={cust.hasAccount ? "Confirmed" : "Pending"}>
                        {cust.hasAccount ? "Thành viên" : "Vãng lai"}
                      </Badge>
                      {cust.accountStatus && (
                        <Badge status={cust.accountStatus}>
                          {ACCOUNT_STATUS_LABEL[cust.accountStatus]}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-sans text-[12px] text-ink-secondary tabular-nums">
                      Đăng ký:{" "}
                      {new Date(cust.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/customers/${cust.customerId}`)
                      }
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {data && <Pagination page={data} onPageChange={setPageNumber} />}

      {isAddModalOpen && (
        <CustomerFormModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
