import { Button } from "@/components/ui/Button";
import type { PaginatedResponse } from "@/types";

type PaginationInfo = Pick<
  PaginatedResponse<unknown>,
  "pageNumber" | "pageSize" | "totalCount" | "totalPages"
>;

interface PaginationProps {
  page?: PaginationInfo;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Pagination({
  page,
  onPageChange,
  disabled,
  loading = false,
}: PaginationProps) {
  if (loading && !page) {
    return (
      <div
        role="status"
        aria-busy="true"
        className="mt-4 flex min-h-[64px] flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line bg-white px-4 py-2.5 font-sans text-[12px] leading-[16px] text-ink-secondary"
      >
        <span>Chưa tải dữ liệu · Chưa xác định tổng số kết quả</span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled
            className="border-line-strong bg-surface-soft text-ink-secondary"
          >
            Trước
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled
            className="border-line-strong bg-surface-soft text-ink-secondary"
          >
            Sau
          </Button>
        </div>
      </div>
    );
  }

  if (!page || page.totalCount === 0) return null;

  const totalPages = Math.max(1, page.totalPages);
  const from = (page.pageNumber - 1) * page.pageSize + 1;
  const to = Math.min(page.pageNumber * page.pageSize, page.totalCount);

  return (
    <div className="flex items-center justify-between gap-3 px-1 pt-4 font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
      <span>
        {from}–{to} / {page.totalCount}
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page.pageNumber <= 1}
          onClick={() => onPageChange(page.pageNumber - 1)}
        >
          Trước
        </Button>
        <span className="px-1 font-medium text-ink">
          {page.pageNumber}/{totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page.pageNumber >= totalPages}
          onClick={() => onPageChange(page.pageNumber + 1)}
        >
          Sau
        </Button>
      </div>
    </div>
  );
}