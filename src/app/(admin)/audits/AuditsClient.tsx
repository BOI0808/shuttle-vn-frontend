"use client";

import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { useAudits } from "@/hooks";
import {
  ACCOUNT_STATUS_LABEL,
  ACTOR_TYPE_LABEL,
  BOOKING_STATUS_LABEL,
  COURT_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
} from "@/config/app";
import {
  formatCurrency,
  formatDateTimeVN,
  getErrorMessage,
} from "@/utils";
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

const ENTITY_LABEL: Record<string, string> = {
  UserAccount: "Tài khoản người dùng",
  Customer: "Khách hàng",
  Employee: "Nhân viên",
  BadmintonCourt: "Sân cầu lông",
  Court: "Sân cầu lông",
  CourtSchedule: "Lịch hoạt động sân",
  PricingRule: "Bảng giá sân",
  Booking: "Đơn đặt sân",
  BookingSlot: "Khung giờ đặt sân",
  BookingPriceSegment: "Chi tiết khung giá đơn",
  BookingStatusHistory: "Lịch sử trạng thái đơn",
  Invoice: "Hóa đơn",
  InvoiceDailyCounter: "Bộ đếm hóa đơn ngày",
  Payment: "Thanh toán",
  PaymentTransaction: "Giao dịch thanh toán",
  VerificationCode: "Mã xác minh",
  Notification: "Thông báo",
  IdempotencyRequest: "Yêu cầu chống trùng lặp",
  Audit: "Nhật ký hệ thống",
};

const FIELD_LABEL: Record<string, string> = {
  Id: "Mã bản ghi",
  Status: "Trạng thái",
  OldStatus: "Trạng thái cũ",
  NewStatus: "Trạng thái mới",
  UpdatedAt: "Cập nhật lúc",
  CreatedAt: "Tạo lúc",
  ChangedAt: "Thời điểm thay đổi",
  PaidAt: "Thanh toán lúc",
  ConfirmedAt: "Xác nhận lúc",
  CompletedAt: "Hoàn thành lúc",
  CancelledAt: "Hủy lúc",
  FullName: "Họ và tên",
  Name: "Tên",
  Phone: "Số điện thoại",
  Email: "Email",
  Description: "Mô tả",
  PricePerHour: "Đơn giá / giờ",
  TotalCost: "Tổng tiền",
  TotalAmount: "Tổng tiền",
  Subtotal: "Tạm tính",
  Amount: "Số tiền",
  OpenTime: "Giờ mở cửa",
  CloseTime: "Giờ đóng cửa",
  StartTime: "Giờ bắt đầu",
  EndTime: "Giờ kết thúc",
  IsAvailable: "Mở cửa",
  IsAdmin: "Quản trị viên",
  Reason: "Lý do",
  CancellationReason: "Lý do hủy",
  RejectReason: "Lý do từ chối",
  CancelReason: "Lý do hủy",
  CancellationActorType: "Tác nhân hủy",
  CancelledByEmployee: "Nhân viên hủy",
  CancelledByCustomer: "Khách hàng hủy",
  ConfirmedByEmployee: "Nhân viên xác nhận",
  CompletedByEmployee: "Nhân viên hoàn thành",
  PaidByEmployee: "Nhân viên thu tiền",
  PaymentMethod: "Phương thức thanh toán",
  FailedLoginCount: "Số lần đăng nhập sai",
  LockedUntil: "Khóa đến",
  DayOfWeek: "Thứ trong tuần",
  Date: "Ngày chơi",
  ActorType: "Tác nhân",
  BookingId: "Mã đơn đặt sân",
  BookingCode: "Mã đơn",
  CustomerId: "Mã khách hàng",
  EmployeeId: "Mã nhân viên",
  ChangedByEmployee: "Nhân viên thực hiện",
  ChangedByEmployeeId: "Mã nhân viên thực hiện",
  CourtId: "Mã sân",
  InvoiceId: "Mã hóa đơn",
  InvoiceNumber: "Số hóa đơn",
  InvoiceCode: "Mã hóa đơn",
  ReplacedInvoiceId: "Hóa đơn thay thế",
  UserAccountId: "Mã tài khoản",
  AccountId: "Mã tài khoản",
  QuoteFingerprint: "Chữ ký báo giá",
};

const ACTOR_TYPE_BY_INDEX = ["Hệ thống", "Nhân viên", "Khách hàng"];
const REASON_LABEL: Record<string, string> = {
  "Automatically settled after the booking end time passed.":
    "Tự động tất toán sau khi quá giờ kết thúc chơi.",
  "Booking created": "Tạo đơn đặt sân",
  "Booking confirmed": "Xác nhận đơn đặt sân",
  "Booking rejected": "Từ chối đơn đặt sân",
  "Booking cancelled": "Hủy đơn đặt sân",
  "Booking completed": "Hoàn thành lượt chơi",
  "Booking rescheduled": "Đổi lịch đặt sân",
  "Payment completed": "Thanh toán hóa đơn",
  "Invoice paid": "Đã thanh toán hóa đơn",
  "Account locked": "Khóa tài khoản",
  "Account unlocked": "Mở khóa tài khoản",
  "Cancelled by customer": "Khách hàng tự hủy",
  "Cancelled by employee": "Nhân viên hủy",
};

const ACCOUNT_STATUS_BY_INDEX = ["Hoạt động", "Đã khóa", "Chờ kích hoạt"];
const BOOKING_STATUS_BY_INDEX = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Hoàn thành",
  "Đã hủy",
];
const COURT_STATUS_BY_INDEX = ["Đang hoạt động", "Bảo trì", "Đóng cửa"];
const INVOICE_STATUS_BY_INDEX = [
  "Chưa thanh toán",
  "Đã thanh toán",
  "Đã hủy",
  "Đã hoàn tiền",
];

function resolveEntityFilter(rawInput: string): {
  EntityName?: string;
  SearchTerm?: string;
} {
  const trimmed = rawInput.trim();
  if (!trimmed) return {};
  const normalized = trimmed.toLowerCase();

  // Exact or case-insensitive match against backend entity keys
  const keyMatch = Object.keys(ENTITY_LABEL).find(
    (key) => key.toLowerCase() === normalized
  );
  if (keyMatch) {
    return { EntityName: keyMatch };
  }

  // Exact match against Vietnamese label
  const exactLabelMatches = Object.entries(ENTITY_LABEL).filter(
    ([, label]) => label.toLowerCase() === normalized
  );
  if (exactLabelMatches.length === 1) {
    return { EntityName: exactLabelMatches[0][0] };
  }

  // Substring match against Vietnamese label (when unique)
  const partialLabelMatches = Object.entries(ENTITY_LABEL).filter(([, label]) =>
    label.toLowerCase().includes(normalized)
  );
  if (partialLabelMatches.length === 1) {
    return { EntityName: partialLabelMatches[0][0] };
  }

  // Fallback to backend ILike SearchTerm (searches EntityName, EntityId, actor name)
  return { SearchTerm: trimmed };
}

function formatEntityLabel(entityName?: string | null): string {
  if (!entityName) return "—";
  return ENTITY_LABEL[entityName] ?? entityName;
}

function formatAuditFieldValue(
  key: string,
  value: unknown,
  entityName?: string | null
): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Có" : "Không";

  if (key === "ActorType" || key === "CancellationActorType") {
    if (typeof value === "number") {
      return ACTOR_TYPE_BY_INDEX[value] ?? String(value);
    }
    if (typeof value === "string" && value in ACTOR_TYPE_LABEL) {
      return ACTOR_TYPE_LABEL[value as ActorType];
    }
  }

  if (key === "Status" || key === "OldStatus" || key === "NewStatus") {
    if (typeof value === "number") {
      if (entityName === "UserAccount")
        return ACCOUNT_STATUS_BY_INDEX[value] ?? String(value);
      if (entityName === "Booking" || entityName === "BookingStatusHistory")
        return BOOKING_STATUS_BY_INDEX[value] ?? String(value);
      if (entityName === "Court" || entityName === "BadmintonCourt")
        return COURT_STATUS_BY_INDEX[value] ?? String(value);
      if (entityName === "Invoice")
        return INVOICE_STATUS_BY_INDEX[value] ?? String(value);
    }
    if (typeof value === "string") {
      return (
        ACCOUNT_STATUS_LABEL[value] ??
        BOOKING_STATUS_LABEL[value] ??
        COURT_STATUS_LABEL[value] ??
        INVOICE_STATUS_LABEL[value] ??
        value
      );
    }
  }

  if (
    (key === "Reason" ||
      key === "CancellationReason" ||
      key === "RejectReason" ||
      key === "CancelReason") &&
    typeof value === "string"
  ) {
    return REASON_LABEL[value] ?? value;
  }

  if (key === "PaymentMethod") {
    if (value === 0 || value === "Cash") return "Tiền mặt";
    if (value === 1 || value === "Bank") return "Chuyển khoản";
  }

  if (
    typeof value === "number" &&
    (key === "PricePerHour" || key === "TotalCost" || key === "Amount")
  ) {
    return formatCurrency(value);
  }

  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
  ) {
    return formatDateTimeVN(value);
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function AuditValuePanel({
  title,
  rawValue,
  entityName,
}: {
  title: string;
  rawValue?: string | null;
  entityName?: string | null;
}) {
  let entries: { label: string; value: string }[] | null = null;
  if (rawValue) {
    try {
      const parsed = JSON.parse(rawValue);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        entries = Object.entries(parsed).map(([key, val]) => ({
          label: FIELD_LABEL[key] ?? key,
          value: formatAuditFieldValue(key, val, entityName),
        }));
      }
    } catch {
      entries = null;
    }
  }

  return (
    <div className="rounded-[8px] border border-line bg-surface-bg p-4">
      <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-ink-secondary">
        {title}
      </p>
      {!rawValue ? (
        <p className="mt-3 font-sans text-[14px] text-ink-secondary">
          Không có dữ liệu
        </p>
      ) : entries && entries.length > 0 ? (
        <dl className="mt-3 space-y-2">
          {entries.map((item) => (
            <div
              key={item.label}
              className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-line/60 pb-1.5 last:border-b-0 last:pb-0"
            >
              <dt className="font-sans text-[12px] font-medium text-ink-secondary">
                {item.label}
              </dt>
              <dd className="font-sans text-[13px] font-medium text-ink tabular-nums">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-3 whitespace-pre-wrap break-words font-sans text-[13px] leading-[20px] text-ink">
          {rawValue}
        </p>
      )}
    </div>
  );
}

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
              Chi tiết thay đổi 
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
                {formatEntityLabel(audit.entityName)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AuditValuePanel
              title="TRƯỚC"
              rawValue={audit.oldValue}
              entityName={audit.entityName}
            />
            <AuditValuePanel
              title="SAU"
              rawValue={audit.newValue}
              entityName={audit.entityName}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-line bg-surface-bg px-6 py-4">
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

  const entityFilter = resolveEntityFilter(applied.entityName);

  const { data, isLoading, isFetching, isError, error, refetch } = useAudits({
    ActorType: applied.actorType || undefined,
    ...entityFilter,
    Action: applied.action || undefined,
    FromDate: applied.fromDate
      ? new Date(`${applied.fromDate}T00:00:00+07:00`).toISOString()
      : undefined,
    ToDate: applied.toDate
      ? new Date(`${applied.toDate}T23:59:59.999+07:00`).toISOString()
      : undefined,
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
    const isSame =
      draft.fromDate === applied.fromDate &&
      draft.toDate === applied.toDate &&
      draft.actorType === applied.actorType &&
      draft.entityName === applied.entityName &&
      draft.action === applied.action;
    setApplied(draft);
    setPageNumber(1);
    if (isSame) {
      void refetch();
    }
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters();
        }}
        className="rounded-[12px] border border-line bg-white p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="audit-from-date">Từ ngày</Label>
            <CustomDatePicker
              id="audit-from-date"
              className="relative"
              fullWidth
              allowClear
              placeholder="Chọn ngày"
              value={draft.fromDate}
              onChange={(dateStr) =>
                setDraft((d) => ({ ...d, fromDate: dateStr }))
              }
            />
          </div>
          <div>
            <Label htmlFor="audit-to-date">Đến ngày</Label>
            <CustomDatePicker
              id="audit-to-date"
              className="relative"
              fullWidth
              allowClear
              placeholder="Chọn ngày"
              value={draft.toDate}
              onChange={(dateStr) =>
                setDraft((d) => ({ ...d, toDate: dateStr }))
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
            Xóa lọc
          </Button>
          <Button type="submit" variant="primary">
            Tìm kiếm
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
      </form>

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
                  {items.map((audit) => {
                    const isUnidentifiedActor =
                      !audit.actorName || audit.actorName === "System";
                    const isCustomerAnonymous =
                      audit.actorType === "Customer" && isUnidentifiedActor;
                    const isSystemDisplayName =
                      audit.actorType !== "System" &&
                      audit.actorType !== "Customer" &&
                      isUnidentifiedActor;
                    return (
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
                        ) : isCustomerAnonymous ? (
                          <span className="font-sans text-[14px] text-ink-secondary">
                            Khách vãng lai / Chưa đăng nhập
                          </span>
                        ) : isSystemDisplayName ? (
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
                        {isSystemDisplayName
                          ? "—"
                          : formatEntityLabel(audit.entityName)}
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-line border-t border-line md:hidden">
              {items.map((audit) => (
                <div key={audit.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[14px] font-semibold text-ink">
                        {formatEntityLabel(audit.entityName)}
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
