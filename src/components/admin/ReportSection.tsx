import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { getErrorMessage } from "@/utils";

interface ReportSectionProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  children: ReactNode;
}

function ReportSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[12px] border border-line bg-white p-5"
      aria-busy="true"
    >
      <div className="h-[16px] w-40 animate-pulse rounded-[4px] bg-line" />
      <div className="h-[140px] animate-pulse rounded-[8px] bg-surface-bg" />
    </div>
  );
}

export function ReportSection({
  title,
  isLoading,
  isError,
  error,
  onRetry,
  children,
}: ReportSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {title && (
        <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
          {title}
        </h2>
      )}

      {isLoading && <ReportSkeleton />}

      {isError && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-line bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                warning
              </span>
            </div>
            <div>
              <p className="font-sans text-[14px] font-semibold text-ink">
                Không thể tải dữ liệu báo cáo
              </p>
              <p className="font-sans text-[12px] text-ink-secondary">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Thử lại
          </Button>
        </div>
      )}

      {!isLoading && !isError && children}
    </section>
  );
}

