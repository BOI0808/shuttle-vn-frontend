"use client";

import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { useAudits } from "@/hooks";
import { ACTOR_TYPE_LABEL } from "@/config/app";
import { formatDateTimeVN, getErrorMessage } from "@/utils";
import type { ActorType, Audit } from "@/types";

const PAGE_SIZE = 20;

interface Filters {
  fromDate: string;
  toDate: string;
  actorType: "" | ActorType;
  entityName: string;
  action: string;
}

const EMPTY_FILTERS: Filters = {
  fromDate: "",
  toDate: "",
  actorType: "",
  entityName: "",
  action: "",
};

const ACTOR_BADGE_STATUS: Record<
  ActorType,
  "Completed" | "Confirmed" | "Pending"
> = {
  System: "Completed",
  Employee: "Confirmed",
  Customer: "Pending",
};

const ACTOR_OPTIONS: { value: "" | ActorType; label: string }[] = [
  { value: "", label: "Tất cả tác nhân" },
  { value: "System", label: "Hệ thống" },
  { value: "Employee", label: "Nhân viên" },
  { value: "Customer", label: "Khách hàng" },
];

const ACTION_LABEL: Record<string, string> = {
  Added: "Tạo mới",
  Modified: "Cập nhật",
  Deleted: "Xóa",
};

const ACTION_BADGE_STATUS: Record<
  string,
  "Completed" | "Confirmed" | "Cancelled"
> = {
  Added: "Completed",
  Modified: "Confirmed",
  Deleted: "Cancelled",
};

const ACTION_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Tất cả thao tác" },
  { value: "Added", label: "Tạo mới" },
  { value: "Modified", label: "Cập nhật" },
  { value: "Deleted", label: "Xóa" },
];

function AuditDetailDialog({
  audit,
  onClose,
}: {
  audit: Audit;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[12px] border border-line bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              Chi tiết thay đổi · Chỉ đọc
            </h2>
            <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
              Nội dung bất biến được ghi nhận bởi hệ thống kiểm toán.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="inline-flex size-[36px] shrink-0 items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              close
            </span>
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                Thời gian (UTC+7)
              </p>
              <p className="mt-1 font-sans text-[14px] text-ink tabular-nums">
                {audit.createdAt ? formatDateTimeVN(audit.createdAt) : "—"}
              </p>
            </div>
            <div>
              <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                Tác nhân
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {audit.actorType ? (
                  <Badge status={ACTOR_BADGE_STATUS[audit.actorType]}>
                    {ACTOR_TYPE_LABEL[audit.actorType]}
                  </Badge>
                ) : (
                  <span className="font-sans text-[14px] text-ink-secondary">
                    —
                  </span>
                )}
                {audit.actorName && audit.actorType !== "System" && (
                  <span className="font-sans text-[13px] text-ink">
                    {audit.actorName}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                Thao tác
              </p>
              <div className="mt-1">
                {audit.action ? (
                  <Badge
                    status={ACTION_BADGE_STATUS[audit.action] ?? "NoInvoice"}
                  >
                    {ACTION_LABEL[audit.action] ?? audit.action}
                  </Badge>
                ) : (
                  <span className="font-sans text-[14px] text-ink-secondary">
                    —
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                Đối tượng
              </p>
              <p className="mt-1 font-sans text-[14px] font-medium text-ink">
                {audit.entityName ?? "—"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[8px] border border-line bg-surface-bg p-4">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-ink-secondary">
                TRƯỚC · BEFORE
              </p>
              <pre className="mt-3 max-h-[260px] overflow-auto whitespace-pre-wrap break-words font-sans text-[13px] leading-[20px] text-ink tabular-nums">
                {audit.oldValue || "(chưa có)"}
              </pre>
            </div>
            <div className="rounded-[8px] border border-line bg-surface-bg p-4">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-ink-secondary">
                SAU · AFTER
              </p>
              <pre className="mt-3 max-h-[260px] overflow-auto whitespace-pre-wrap break-words font-sans text-[13px] leading-[20px] text-ink tabular-nums">
                {audit.newValue || "(chưa có)"}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-bg px-6 py-4">
          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
            Nội dung dài: vùng đọc độc lập; không có thao tác sửa hoặc xóa.
          </p>
          <Button type="button" variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuditsClient() {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [pageNumber, setPageNumber] = useState(1);
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useAudits({
    ActorType: applied.actorType || undefined,
    EntityName: applied.entityName || undefined,
    Action: applied.action || undefined,
    FromDate: applied.fromDate || undefined,
    ToDate: applied.toDate ? `${applied.toDate}T23:59:59.999Z` : undefined,
    PageNumber: pageNumber,
    PageSize: PAGE_SIZE,
  });

  const loading = isLoading || isFetching;
  const items = data?.items ?? [];

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilters = () => {
    if (draft.fromDate && draft.toDate && draft.fromDate > draft.toDate) {
      setDateError("Từ ngày không được lớn hơn Đến ngày.");
      return;
    }
    setDateError(null);
    setApplied(draft);
    setPageNumber(1);
  };

  const clearFilters = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setDateError(null);
    setPageNumber(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
          Nhật ký hoạt động
        </h1>
        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
          Nhật ký kiểm toán hệ thống · Chỉ đọc, không thể sửa hoặc xóa
        </p>
      </div>

      <section className="rounded-[12px] border border-line bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="audit-from-date">Từ ngày</Label>
            <Input
              id="audit-from-date"
              type="date"
              value={draft.fromDate}
              onChange={(e) =>
                setDraft((d) => ({ ...d, fromDate: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="audit-to-date">Đến ngày</Label>
            <Input
              id="audit-to-date"
              type="date"
              value={draft.toDate}
              onChange={(e) =>
                setDraft((d) => ({ ...d, toDate: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="audit-actor">Tác nhân</Label>
            <Select
              id="audit-actor"
              value={draft.actorType}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  actorType: e.target.value as Filters["actorType"],
                }))
              }
            >
              {ACTOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="audit-action">Thao tác</Label>
            <Select
              id="audit-action"
              value={draft.action}
              onChange={(e) =>
                setDraft((d) => ({ ...d, action: e.target.value }))
              }
            >
              {ACTION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[240px] flex-1">
            <Label htmlFor="audit-entity">Đối tượng</Label>
            <Input
              id="audit-entity"
              icon={
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  search
                </span>
              }
              placeholder="Tìm theo tên đối tượng"
              value={draft.entityName}
              onChange={(e) =>
                setDraft((d) => ({ ...d, entityName: e.target.value }))
              }
            />
          </div>
          <Button type="button" variant="outline" onClick={clearFilters}>
            Đặt lại
          </Button>
          <Button type="button" variant="primary" onClick={applyFilters}>
            Lọc nhật ký
          </Button>
        </div>

        {dateError && (
          <p
            role="alert"
            className="mt-3 font-sans text-[12px] leading-[16px] text-status-danger"
          >
            {dateError}
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="px-5 py-4">
          <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
            Hoạt động hệ thống
          </h2>
          <p className="mt-1 font-sans text-[12px] leading-[16px] text-ink-secondary">
            {loading
              ? "Đang tải nhật ký…"
              : "Chọn Chi tiết để xem đầy đủ giá trị Trước và Sau cạnh nhau."}
          </p>
        </div>

        {loading ? (
          <div aria-busy="true">
            <div className="hidden h-[44px] grid-cols-5 items-center border-y border-line bg-surface-bg px-5 font-sans text-[12px] font-semibold text-ink-secondary md:grid">
              <span>Thời gian</span>
              <span>Tác nhân</span>
              <span>Thao tác</span>
              <span>Đối tượng</span>
              <span>Chi tiết</span>
            </div>
            <div className="space-y-4 p-5">
              {[0, 1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-1 gap-3 py-1.5 animate-pulse md:grid-cols-5"
                >
                  <div className="h-[16px] w-36 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-44 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-28 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-44 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-24 rounded-[8px] bg-surface-soft" />
                </div>
              ))}
              <p className="border-t border-line pt-4 font-sans text-[12px] leading-[16px] text-ink-secondary">
                Chọn một bản ghi sau khi tải để xem giá trị Trước và Sau cạnh
                nhau.
              </p>
            </div>
          </div>
        ) : isError ? (
          <div role="alert" className="border-t border-line p-6">
            <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                warning
              </span>
            </div>
            <h3 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
              Không tải được nhật ký
            </h3>
            <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
              {getErrorMessage(error)} Các bộ lọc hiện tại được giữ nguyên.
            </p>
            <div className="mt-4">
              <Button
                type="button"
                variant="primary"
                onClick={() => refetch()}
              >
                Thử lại
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center border-t border-line px-6 py-12 text-center">
            <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                history
              </span>
            </div>
            <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
              Không có nhật ký phù hợp
            </p>
            <p className="mt-1 max-w-md font-sans text-[14px] text-ink-secondary">
              Thử đổi thời gian hoặc đặt lại bộ lọc.
            </p>
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={clearFilters}>
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Thời điểm (UTC+7)
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Tác nhân
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Tên người thực hiện
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Thao tác
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Đối tượng
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-semibold"
                    >
                      Chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((audit) => (
                    <tr
                      key={audit.id}
                      className="transition-colors duration-100 hover:bg-surface-bg"
                    >
                      <td className="px-5 py-4 align-middle font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                        {audit.createdAt
                          ? formatDateTimeVN(audit.createdAt)
                          : "—"}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {audit.actorType ? (
                          <Badge status={ACTOR_BADGE_STATUS[audit.actorType]}>
                            {ACTOR_TYPE_LABEL[audit.actorType]}
                          </Badge>
                        ) : (
                          <span className="font-sans text-[14px] text-ink-secondary">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {audit.actorType === "System" ? (
                          <span className="font-sans text-[14px] text-ink-secondary">
                            —
                          </span>
                        ) : !audit.actorName ||
                          audit.actorName === "System" ? (
                          <span className="font-sans text-[14px] font-semibold text-status-danger">
                            Hệ thống
                          </span>
                        ) : (
                          <span className="font-sans text-[14px] text-ink">
                            {audit.actorName}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {audit.action ? (
                          <Badge
                            status={
                              ACTION_BADGE_STATUS[audit.action] ?? "NoInvoice"
                            }
                          >
                            {ACTION_LABEL[audit.action] ?? audit.action}
                          </Badge>
                        ) : (
                          <span className="font-sans text-[14px] text-ink-secondary">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-middle font-sans text-[14px] text-ink">
                        {audit.entityName ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-right align-middle">
                        {audit.oldValue || audit.newValue ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAudit(audit)}
                          >
                            Chi tiết
                          </Button>
                        ) : (
                          <span className="font-sans text-[12px] text-ink-secondary">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-line border-t border-line md:hidden">
              {items.map((audit) => (
                <div key={audit.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[14px] font-semibold text-ink">
                        {audit.entityName ?? "—"}
                      </p>
                      <p className="mt-0.5 font-sans text-[12px] text-ink-secondary tabular-nums">
                        {audit.createdAt
                          ? formatDateTimeVN(audit.createdAt)
                          : "—"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {audit.actorType && (
                        <Badge status={ACTOR_BADGE_STATUS[audit.actorType]}>
                          {ACTOR_TYPE_LABEL[audit.actorType]}
                        </Badge>
                      )}
                      {audit.action && (
                        <Badge
                          status={
                            ACTION_BADGE_STATUS[audit.action] ?? "NoInvoice"
                          }
                        >
                          {ACTION_LABEL[audit.action] ?? audit.action}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {(audit.oldValue || audit.newValue) && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAudit(audit)}
                      >
                        Chi tiết
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {data && (
        <Pagination
          page={{
            pageNumber: data.pageNumber ?? 1,
            pageSize: data.pageSize ?? PAGE_SIZE,
            totalCount: data.totalCount ?? 0,
            totalPages: data.totalPages ?? 1,
          }}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      )}
      {selectedAudit && (
        <AuditDetailDialog
          audit={selectedAudit}
          onClose={() => setSelectedAudit(null)}
        />
      )}
    </div>
  );
}
