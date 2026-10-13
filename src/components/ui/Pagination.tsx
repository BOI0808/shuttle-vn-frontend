import { Button } from "@/components/ui/Button";
import type { PaginatedResponse } from "@/types";

type PaginationInfo = Pick<
  PaginatedResponse<unknown>,
  "pageNumber" | "pageSize" | "totalCount" | "totalPages"
>;

interface PaginationProps {
  page: PaginationInfo;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
}

export function Pagination({ page, onPageChange, disabled }: PaginationProps) {
  if (page.totalCount === 0) return null;

  const totalPages = Math.max(1, page.totalPages);
  const from = (page.pageNumber - 1) * page.pageSize + 1;
  const to = Math.min(page.pageNumber * page.pageSize, page.totalCount);

  return (
    <div className="flex items-center justify-between gap-3 px-1 pt-4 text-xs text-gray-500">
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
        <span className="font-mono">
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