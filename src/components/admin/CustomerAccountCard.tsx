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
  const isPending = customer.accountStatus === "PendingActivation";
  const mutation = isActive ? lockMutation : unlockMutation;

  const handleConfirm = () => {
    if (!customer.accountId) return;
    mutation.mutate(
      { accountId: customer.accountId, customerId: customer.customerId },
      {
        onSuccess: () => {
          toast.success(
            isActive ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản"
          );
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
    <div className="flex h-full flex-col justify-between rounded-[12px] border border-line bg-white p-5">
      <div>
        <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          Tài khoản
        </h2>

        {customer.hasAccount && customer.accountStatus ? (
          <div className="mt-5 space-y-4">
            <div>
              <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                Trạng thái tài khoản
              </p>
              <div className="mt-2">
                <Badge status={customer.accountStatus}>
                  {ACCOUNT_STATUS_LABEL[customer.accountStatus]}
                </Badge>
              </div>
            </div>

            {isPending ? (
              <p className="font-sans text-[14px] leading-[20px] text-ink-secondary">
                Khách chưa đặt mật khẩu nên chưa thể khóa hoặc mở khóa. Liên kết
                thiết lập có hiệu lực 24 giờ; khi hết hạn, khách tự yêu cầu gửi
                lại liên kết mới.
              </p>
            ) : (
              <div className="pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className={
                    isActive
                      ? "border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                      : undefined
                  }
                  onClick={() => setIsConfirmOpen(true)}
                >
                  {isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-5 font-sans text-[14px] leading-[20px] text-ink-secondary">
            Khách vãng lai, chưa có tài khoản đăng nhập.
          </p>
        )}
      </div>

      <p className="mt-6 font-sans text-[12px] leading-[16px] text-ink-secondary">
        Thao tác theo trạng thái thực tế Active / Disabled.
      </p>

      {isConfirmOpen && (
        <ConfirmDialog
          title={
            isActive
              ? "Khóa tài khoản khách hàng?"
              : "Mở khóa tài khoản khách hàng?"
          }
          description={
            isActive
              ? `Tài khoản "${customer.fullName}" sẽ bị vô hiệu hóa quyền truy cập. Hãy kiểm tra đúng hồ sơ trước khi tiếp tục.`
              : `Tài khoản của "${customer.fullName}" được phép truy cập lại và đặt lại số lần đăng nhập sai về 0.`
          }
          confirmLabel={isActive ? "Xác nhận khóa" : "Mở khóa"}
          variant={isActive ? "danger" : "warning"}
          isLoading={mutation.isPending}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </div>
  );
}
