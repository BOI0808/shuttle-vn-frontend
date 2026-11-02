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
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="h-[220px] animate-pulse rounded-xl bg-slate-200/60" />
      <div className="h-[220px] animate-pulse rounded-xl bg-slate-200/60" />
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
      <h2 className="font-display text-[15px] font-bold text-slate-900">
        {title}
      </h2>

      {isLoading && <ReportSkeleton />}

      {isError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{getErrorMessage(error)}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-auto"
            onClick={onRetry}
          >
            Thử lại
          </Button>
        </div>
      )}

      {!isLoading && !isError && children}
    </section>
  );
}

