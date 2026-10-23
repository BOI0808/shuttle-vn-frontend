"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  useLockCustomerAccount,
  useUnlockCustomerAccount,
} from "@/hooks";
import { ACCOUNT_STATUS_LABEL } from "@/config/app";
import type { CustomerListItem } from "@/types";
import { getErrorMessage } from "@/utils";

interface CustomerAccountCardProps {
  customer: CustomerListItem;
}

export function CustomerAccountCard({ customer }: CustomerAccountCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const lockMutation = useLockCustomerAccount();
  const unlockMutation = useUnlockCustomerAccount();

  const isActive = customer.accountStatus === "Active";
  const mutation = isActive ? lockMutation : unlockMutation;

  const handleConfirm = () => {
    if (!customer.accountId) return;
    mutation.mutate(
      { accountId: customer.accountId, customerId: customer.customerId },
      {
        onSuccess: () => {
          toast.success(isActive ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản");
          setIsConfirmOpen(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
          setIsConfirmOpen(false);
        },
      }
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h3 className="mb-3 text-[15px] font-bold text-slate-900">Tài khoản</h3>
      {customer.hasAccount && customer.accountStatus ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-slate-500">Trạng thái:</span>
            <Badge status={customer.accountStatus}>
              {ACCOUNT_STATUS_LABEL[customer.accountStatus]}
            </Badge>
          </div>
          <Button
            type="button"
            variant="outline"
            className={
              isActive
                ? "w-auto border-red-300 text-red-600 hover:bg-red-50"
                : "w-auto"
            }
            onClick={() => setIsConfirmOpen(true)}
          >
            {isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          </Button>
        </div>
      ) : (
        <p className="text-[13px] text-slate-500">
          Khách vãng lai, chưa có tài khoản đăng nhập.
        </p>
      )}

      {isConfirmOpen && (
        <ConfirmDialog
          title={isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          description={
            isActive
              ? `Khách "${customer.fullName}" sẽ không thể đăng nhập sau khi bị khóa.`
              : `Mở khóa tài khoản của "${customer.fullName}" và đặt lại số lần đăng nhập sai về 0.`
          }
          confirmLabel={isActive ? "Khóa tài khoản" : "Mở khóa"}
          variant={isActive ? "danger" : "warning"}
          isLoading={mutation.isPending}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </div>
  );
}