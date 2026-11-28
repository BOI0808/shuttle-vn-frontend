"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";

interface OperationsLoadingCardProps {
  title?: string;
  subtitle?: string;
  showStatsSkeleton?: boolean;
  rows?: number;
  embedded?: boolean;
  className?: string;
}

/**
 * Shared loading skeleton card matching Figma "Operations feedback · Trạng thái dùng chung" (3325:3308).
 */
export function OperationsLoadingCard({
  title = "Danh sách đang tải",
  subtitle = "Đang tải dữ liệu…",
  showStatsSkeleton = false,
  rows = 3,
  embedded = false,
  className,
}: OperationsLoadingCardProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={title}
      className={cn(
        !embedded && "overflow-hidden rounded-[12px] border border-line bg-white",
        className
      )}
    >
      {!embedded && (
        <div className="border-b border-line px-5 py-4">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            {title}
          </p>
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            {subtitle}
          </p>
        </div>
      )}

      <div className={cn("space-y-5", !embedded && "p-5")}>
        {showStatsSkeleton && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-[88px] animate-pulse rounded-[8px] bg-surface-bg p-3"
              >
                <div className="h-[8px] w-[100px] rounded-[4px] bg-line" />
                <div className="mt-3 h-[24px] w-[56px] rounded-[4px] bg-line" />
                <div className="mt-3 h-[6px] w-[116px] rounded-[3px] bg-line" />
              </div>
            ))}
          </div>
        )}

        <div className="animate-pulse space-y-4 rounded-[8px] bg-surface-bg p-4">
          {Array.from({ length: rows }, (_, row) => (
            <div key={row} className="flex items-center justify-between gap-4">
              <div className="h-[8px] w-[164px] max-w-[60%] rounded-[4px] bg-line" />
              <div className="h-[8px] w-[64px] rounded-[4px] bg-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface OperationsEmptyCardProps {
  headerTitle?: string;
  headerSubtitle?: string;
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  embedded?: boolean;
  className?: string;
}

/**
 * Shared empty/no-results feedback card matching Figma "Operations feedback · Trạng thái dùng chung" (3325:3332).
 */
export function OperationsEmptyCard({
  headerTitle,
  headerSubtitle,
  icon = "check_circle",
  title = "Không tìm thấy kết quả phù hợp",
  description = "Thử thay đổi từ khóa hoặc bộ lọc.",
  actionLabel,
  onAction,
  actionHref,
  embedded = false,
  className,
}: OperationsEmptyCardProps) {
  return (
    <div
      className={cn(
        !embedded && "overflow-hidden rounded-[12px] border border-line bg-white",
        className
      )}
    >
      {!embedded && headerTitle && (
        <div className="border-b border-line px-5 py-4">
          <p className="font-display text-[18px] font-medium leading-[26px] text-ink">
            {headerTitle}
          </p>
          {headerSubtitle && (
            <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
              {headerSubtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center px-5 py-8 text-center">
        <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            {icon}
          </span>
        </div>
        <p className="mt-5 font-sans text-[14px] font-semibold leading-[20px] text-ink">
          {title}
        </p>
        <p className="mt-1.5 max-w-md font-sans text-[14px] leading-[20px] text-ink-secondary">
          {description}
        </p>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="mt-5 inline-flex h-[44px] items-center justify-center rounded-[8px] border border-line-strong bg-white px-4 py-3 font-sans text-[14px] font-semibold leading-[20px] text-ink-secondary transition-colors hover:border-ink-muted hover:bg-surface-bg hover:text-ink"
          >
            {actionLabel}
          </Link>
        )}
        {actionLabel && !actionHref && onAction && (
          <Button
            type="button"
            variant="outline"
            onClick={onAction}
            className="mt-5"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface OperationsErrorCardProps {
  title?: string;
  message?: string;
  secondaryMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  footerNote?: string;
  embedded?: boolean;
  className?: string;
}

/**
 * Shared error feedback card matching Figma "Operations feedback · Trạng thái dùng chung" (3325:3345).
 */
export function OperationsErrorCard({
  title = "Không thể tải dữ liệu",
  message = "Vui lòng kiểm tra kết nối và thử lại.",
  secondaryMessage = "Dữ liệu chưa tải được, không phải dữ liệu bằng 0.",
  retryLabel = "Thử lại",
  onRetry,
  footerNote = "Giữ nguyên ngữ cảnh và các lựa chọn khi tải lại.",
  embedded = false,
  className,
}: OperationsErrorCardProps) {
  return (
    <div
      role="alert"
      className={cn(
        !embedded && "rounded-[12px] border border-line bg-white p-5",
        className
      )}
    >
      <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
        <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
          warning
        </span>
      </div>

      <h2 className="mt-5 font-display text-[18px] font-medium leading-[26px] text-ink">
        {title}
      </h2>

      <div className="mt-3 space-y-0.5 font-sans text-[14px] leading-[20px] text-ink-secondary">
        <p>{message}</p>
        {secondaryMessage && <p>{secondaryMessage}</p>}
      </div>

      {onRetry && (
        <div className="mt-5">
          <Button type="button" variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}

      {footerNote && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            {footerNote}
          </p>
        </div>
      )}
    </div>
  );
}

