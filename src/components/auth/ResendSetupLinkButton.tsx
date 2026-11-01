"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import { useAuth } from "@/hooks/useAuth";

import { getErrorMessage, getRetryAfterSeconds } from "@/utils";

const DEFAULT_COOLDOWN_SECONDS = 60;

function formatWait(seconds: number): string {
  return seconds >= 60 ? `${Math.ceil(seconds / 60)} phút` : `${seconds} giây`;
}

interface ResendSetupLinkButtonProps {
  email: string;
}

export function ResendSetupLinkButton({ email }: ResendSetupLinkButtonProps) {
  const { resendSetupLink, isResendingSetupLink } = useAuth();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = () => {
    resendSetupLink(
      { email },
      {
        onSuccess: () => {
          toast.success(
            "Nếu email thuộc tài khoản đang chờ kích hoạt, liên kết mới đã được gửi. Vui lòng kiểm tra hộp thư."
          );
          setCooldown(DEFAULT_COOLDOWN_SECONDS);
        },
        onError: (error) => {
          const retryAfter = getRetryAfterSeconds(error);
          if (retryAfter) {
            setCooldown(retryAfter);
            toast.error(
              `Bạn thao tác quá nhanh. Vui lòng thử lại sau ${formatWait(retryAfter)}.`
            );
            return;
          }
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-auto"
      loading={isResendingSetupLink}
      disabled={cooldown > 0}
      onClick={handleResend}
    >
      {cooldown > 0
        ? `Gửi lại sau ${formatWait(cooldown)}`
        : "Gửi lại liên kết mới"}
    </Button>
  );
}
