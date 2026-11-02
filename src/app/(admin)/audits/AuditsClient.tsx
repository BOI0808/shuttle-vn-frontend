"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { useAudits } from "@/hooks";
import { ACTOR_TYPE_LABEL } from "@/config/app";
import { formatDateTimeVN, getErrorMessage, cn } from "@/utils";
import type { ActorType } from "@/types";

const PAGE_SIZE = 20;
const COLUMN_COUNT = 5;

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

const ACTOR_BADGE: Record<ActorType, string> = {
  System: "bg-[#EDF3EC] text-[#346538] border-[#d7e3d6]",
  Employee: "bg-[#E1F3FE] text-[#1F6C9F] border-[#cde6f5]",
  Customer: "bg-[#FBF3DB] text-[#956400] border-[#f0e4bd]",
};

const ACTOR_OPTIONS: { value: "" | ActorType; label: string }[] = [
  { value: "", label: "Tất cả" },
  { value: "System", label: "Hệ thống" },
  { value: "Employee", label: "Nhân viên" },
  { value: "Customer", label: "Khách hàng" },
];

// Backend AuditInterceptor lưu Action = EntityState.ToString()
const ACTION_LABEL: Record<string, string> = {
  Added: "Tạo mới",
  Modified: "Cập nhật",
  Deleted: "Xoá",
};

const ACTION_BADGE: Record<string, string> = {
  Added: "bg-[#EDF3EC] text-[#346538] border-[#d7e3d6]",
  Modified: "bg-[#E1F3FE] text-[#1F6C9F] border-[#cde6f5]",
  Deleted: "bg-[#FBE4E4] text-[#9F2F2D] border-[#f2d3d3]",
};

const ACTION_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Tất cả" },
  { value: "Added", label: "Tạo mới" },
  { value: "Modified", label: "Cập nhật" },
  { value: "Deleted", label: "Xoá" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-mono uppercase tracking-[0.05em] text-[#787774]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-9 rounded-[7px] border border-[#e4e4e1] bg-white px-3 text-[13px] text-[#111111] outline-none transition-[border-color] focus:border-[#111111] placeholder:text-[#b5b3ae]";

export default function AuditsClient() {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [pageNumber, setPageNumber] = useState(1);
  const [dateError, setDateError] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useAudits({
    ActorType: applied.actorType || undefined,
    EntityName: applied.entityName || undefined,
    Action: applied.action || undefined,
    FromDate: applied.fromDate || undefined,
    ToDate: applied.toDate || undefined,
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
      <div className="rounded-xl border border-[#e4e4e1] bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Field label="Từ ngày">
            <input
              type="date"
              className={inputClass}
              value={draft.fromDate}
              onChange={(e) =>
                setDraft((d) => ({ ...d, fromDate: e.target.value }))
              }
            />
          </Field>
          <Field label="Đến ngày">
            <input
              type="date"
              className={inputClass}
              value={draft.toDate}
              onChange={(e) =>
                setDraft((d) => ({ ...d, toDate: e.target.value }))
              }
            />
          </Field>
          <Field label="Tác nhân">
            <select
              className={inputClass}
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
            </select>
          </Field>
          <Field label="Thao tác">
            <select
              className={inputClass}
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
            </select>
          </Field>
          <Field label="Đối tượng">
            <input
              className={inputClass}
              placeholder="Tên đối tượng"
              value={draft.entityName}
              onChange={(e) =>
                setDraft((d) => ({ ...d, entityName: e.target.value }))
              }
            />
          </Field>
        </div>

        {dateError && (
          <p role="alert" className="mt-3 text-xs text-[#9F2F2D]">
            {dateError}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="w-auto inline-flex"
            onClick={applyFilters}
          >
            Lọc
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-auto inline-flex"
            onClick={clearFilters}
          >
            Xóa lọc
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-[#e4e4e1] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fafaf8] text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                <th scope="col" className="px-5 py-3 border-b border-[#e4e4e1] font-semibold">
                  Thời điểm (UTC+7)
                </th>
                <th scope="col" className="px-5 py-3 border-b border-[#e4e4e1] font-semibold">
                  Tác nhân
                </th>
                <th scope="col" className="px-5 py-3 border-b border-[#e4e4e1] font-semibold">
                  Tên người thực hiện
                </th>
                <th scope="col" className="px-5 py-3 border-b border-[#e4e4e1] font-semibold">
                  Thao tác
                </th>
                <th scope="col" className="px-5 py-3 border-b border-[#e4e4e1] font-semibold">
                  Đối tượng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ed]">
              {loading && (
                <AuditRowSkeleton />
              )}
              {!loading && isError && (
                <tr>
                  <td colSpan={COLUMN_COUNT} className="px-5 py-10 text-center">
                    <p role="alert" className="text-[13px] text-[#9F2F2D]">
                      {getErrorMessage(error)}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-auto inline-flex mt-3"
                      onClick={() => refetch()}
                    >
                      Thử lại
                    </Button>
                  </td>
                </tr>
              )}
              {!loading && !isError && items.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMN_COUNT}
                    className="px-5 py-10 text-center text-[13px] text-[#787774]"
                  >
                    Không có bản ghi nào khớp bộ lọc.
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((audit) => (
                  <tr
                    key={audit.id}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-5 py-4 align-top">
                      <p className="text-[11px] font-mono text-[#787774]">
                        {audit.createdAt
                          ? formatDateTimeVN(audit.createdAt)
                          : "—"}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-top">
                      {audit.actorType ? (
                        <Badge
                          status="Completed"
                          className={cn("font-mono", ACTOR_BADGE[audit.actorType])}
                        >
                          {ACTOR_TYPE_LABEL[audit.actorType]}
                        </Badge>
                      ) : (
                        <span className="text-[13px] text-[#787774]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top">
                      {audit.actorType === "System" ? (
                        <span className="text-[13px] text-[#787774]">—</span>
                      ) : !audit.actorName || audit.actorName === "System" ? (
                        <span className="text-[13px] font-semibold text-[#9F2F2D]">
                          Hệ thống
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#111111]">
                          {audit.actorName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top">
                      {audit.action ? (
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-mono font-semibold tracking-[0.03em] border whitespace-nowrap",
                            ACTION_BADGE[audit.action] ??
                              "bg-[#f4f4f2] text-[#111111] border-[#e4e4e1]"
                          )}
                        >
                          {ACTION_LABEL[audit.action] ?? audit.action}
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#787774]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p className="text-[13px] text-[#111111]">
                        {audit.entityName ?? "—"}
                      </p>
                      {(audit.oldValue || audit.newValue) && (
                        <p className="mt-1 text-[11px] font-mono text-[#787774] leading-relaxed">
                          Trước: {audit.oldValue ?? "(chưa có)"}
                          <br />
                          Sau: {audit.newValue ?? "(chưa có)"}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

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

      <p className="text-[11px] font-mono text-[#b5b3ae]">
        Bảng chỉ đọc, bất biến. Không có thao tác thêm, sửa hoặc xóa.
      </p>
    </div>
  );
}

function AuditRowSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: COLUMN_COUNT }).map((_, j) => (
            <td key={j} className="px-5 py-4">
              <div className="h-3 animate-pulse rounded-md bg-[#eceaea] w-full max-w-[160px]" />
              <div className="mt-2 h-3 animate-pulse rounded-md bg-[#f0efed] w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
