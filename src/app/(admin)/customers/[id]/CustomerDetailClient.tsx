"use client";

import Link from "next/link";

import { CustomerProfileForm } from "@/components/admin/CustomerProfileForm";
import { CustomerBookingsCard } from "@/components/admin/CustomerBookingsCard";
import { useCustomer } from "@/hooks";
import { getErrorMessage } from "@/utils";

interface CustomerDetailClientProps {
  id: string;
}

export default function CustomerDetailClient({
  id,
}: CustomerDetailClientProps) {
  const { data: customer, isLoading, error } = useCustomer(id);

  if (isLoading) {
    return (
      <p className="py-8 text-center font-mono text-sm text-slate-500">
        Đang tải hồ sơ khách hàng...
      </p>
    );
  }

  if (!customer) {
    return (
      <p className="py-8 text-center text-sm text-red-600">
        {getErrorMessage(error)}
      </p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{customer.fullName}</h2>
        <Link
          href="/customers"
          className="text-[13px] text-emerald-700 hover:underline"
        >
          ← Về danh sách khách hàng
        </Link>
      </div>

    <CustomerProfileForm customer={customer} />
    <CustomerBookingsCard customerId={customer.customerId} />
    </div>
  );
}