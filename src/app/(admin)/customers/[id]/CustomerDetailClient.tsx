"use client";

import Link from "next/link";

import { CustomerProfileForm } from "@/components/admin/CustomerProfileForm";
import { CustomerBookingsCard } from "@/components/admin/CustomerBookingsCard";
import { CustomerAccountCard } from "@/components/admin/CustomerAccountCard";
import { Button } from "@/components/ui/Button";
import { useCustomer } from "@/hooks";
import { getErrorMessage } from "@/utils";

interface CustomerDetailClientProps {
  id: string;
}

function CustomerDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-[12px] border border-line bg-white p-5 lg:col-span-8">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Thông tin cá nhân
          </p>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 h-[14px] w-20 rounded-[4px] bg-line" />
              <div className="flex h-[44px] items-center rounded-[8px] border border-line-strong bg-surface-soft px-3.5 font-sans text-[14px] text-ink-secondary">
                Đang tải…
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 h-[14px] w-14 rounded-[4px] bg-line" />
                <div className="flex h-[44px] items-center rounded-[8px] border border-line-strong bg-surface-soft px-3.5 font-sans text-[14px] text-ink-secondary">
                  Đang tải…
                </div>
              </div>
              <div>
                <div className="mb-2 h-[14px] w-24 rounded-[4px] bg-line" />
                <div className="flex h-[44px] items-center rounded-[8px] border border-line-strong bg-surface-soft px-3.5 font-sans text-[14px] text-ink-secondary">
                  Đang tải…
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 font-sans text-[12px] leading-[16px] text-ink-secondary">
            Đang tải hồ sơ. Chưa thể chỉnh sửa hoặc lưu.
          </p>
        </div>

        <div className="rounded-[12px] border border-line bg-white p-5 lg:col-span-4">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Tài khoản
          </p>
          <p className="mt-5 font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
            Trạng thái tài khoản
          </p>
          <div className="mt-2 h-[24px] w-40 animate-pulse rounded-[8px] bg-surface-soft" />
          <p className="mt-4 font-sans text-[14px] leading-[20px] text-ink-secondary">
            Đang tải quyền truy cập…
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="px-5 py-4">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Lịch sử đặt sân
          </p>
          <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
            Chỉ hiển thị lịch sử của khách hàng đang xem.
          </p>
        </div>
        <div className="space-y-4 border-t border-line p-5">
          {[0, 1].map((row) => (
            <div
              key={row}
              className="h-[20px] animate-pulse rounded-[8px] bg-surface-soft"
            />
          ))}
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            Đang tải lịch sử đặt sân…
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CustomerDetailClient({
  id,
}: CustomerDetailClientProps) {
  const { data: customer, isLoading, isError, error, refetch } =
    useCustomer(id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Hồ sơ khách hàng
          </h1>
          <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            Khách hàng / {customer ? customer.fullName : "Chi tiết tài khoản"}
          </p>
        </div>

        <Link
          href="/customers"
          className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-line-strong bg-white px-4 py-3 font-sans text-[14px] font-semibold leading-[20px] text-ink-secondary transition-colors duration-150 ease-out hover:border-ink-muted hover:bg-surface-bg hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Về danh sách
        </Link>
      </div>

      {isLoading ? (
        <CustomerDetailSkeleton />
      ) : isError || !customer ? (
        <div
          role="alert"
          className="max-w-xl rounded-[12px] border border-line bg-white p-5"
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
            Không thể tải hồ sơ khách hàng
          </h2>
          <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
            {getErrorMessage(error)}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="primary" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <CustomerProfileForm customer={customer} />
            </div>
            <div className="lg:col-span-4">
              <CustomerAccountCard customer={customer} />
            </div>
          </div>

          <CustomerBookingsCard customerId={customer.customerId} />
        </>
      )}
    </div>
  );
}
