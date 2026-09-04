import { Badge } from "@/components/ui/Badge";
import { BOOKING_STATUS_LABEL } from "@/config/app";
import { formatCurrency } from "@/utils";
import type { BookingDetail } from "@/types";

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  valueClassName?: string;
}

function InfoRow({ icon, label, value, valueClassName }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0">
      <span className="flex items-center gap-1.5 text-[13px] text-gray-400">
        <span className="material-symbols-outlined text-[15px]">{icon}</span>
        {label}
      </span>
      <span
        className={`text-[13px] font-semibold text-gray-900 ${
          valueClassName ?? ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

interface BookingLookupResultProps {
  notFoundCode: string | null;
  booking: BookingDetail | null;
}

export function BookingLookupResult({
  notFoundCode,
  booking,
}: BookingLookupResultProps) {
  if (notFoundCode) {
    return (
      <div className="mt-5 fade-in">
        <div
          className="bg-white rounded-[14px] px-7 py-10 text-center"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
        >
          <span className="material-symbols-outlined text-[48px] text-gray-300 block mb-3.5">
            search_off
          </span>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-2">
            Không tìm thấy đơn
          </h2>
          <p className="text-[13px] text-gray-400 mb-1">
            Hệ thống không tìm thấy đơn đặt sân với thông tin bạn cung cấp.
          </p>
          <p className="text-xs text-gray-400">
            Kiểm tra lại mã{" "}
            <span className="font-mono text-gray-500">{notFoundCode}</span>
          </p>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="mt-5 fade-in">
      <div
        className="bg-white rounded-[14px] p-[22px]"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap mb-[18px] pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1 flex-wrap">
              <span className="font-mono text-[15px] font-bold text-emerald-500 tracking-[0.05em]">
                {booking.bookingCode}
              </span>
              <Badge status={booking.status}>
                {BOOKING_STATUS_LABEL[booking.status]}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 m-0">
              Tạo lúc {booking.createdAt}
            </p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="mb-[18px]">
          <InfoRow icon="sports_tennis" label="Sân" value={booking.courtName} />
          <InfoRow icon="calendar_today" label="Ngày" value={booking.date} />
          <InfoRow
            icon="schedule"
            label="Khung giờ"
            value={`${booking.startTime} – ${booking.endTime}`}
            valueClassName="font-mono"
          />
          <InfoRow
            icon="person"
            label="Khách hàng"
            value={booking.customerName}
          />
          <InfoRow
            icon="payments"
            label="Số tiền"
            value={formatCurrency(booking.totalCost)}
            valueClassName="font-mono text-emerald-600"
          />
        </div>

        {/* Hotline */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-1.5">
            Cần hỗ trợ về đơn đặt sân này?
          </p>
          <a
            href="tel:19001234"
            className="inline-flex items-center gap-1.5 text-emerald-500 text-[13px] font-semibold no-underline hover:text-emerald-600"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            Hotline: 1900 1234
          </a>
        </div>
      </div>

      {/* Status notices */}
      {booking.status === "COMPLETED" && (
        <div className="mt-3 fade-in">
          <div className="flex items-start gap-2.5 px-3.5 py-2.5 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
            <span className="material-symbols-outlined text-[16px] text-green-600 flex-shrink-0 mt-px">
              check_circle
            </span>
            <p className="m-0">
              Đơn này đã <strong>hoàn thành</strong>. Cảm ơn bạn đã sử dụng dịch
              vụ ShuttleVN!
            </p>
          </div>
        </div>
      )}
      {booking.status === "CANCELLED" && (
        <div className="mt-3 fade-in">
          <div className="flex items-start gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            <span className="material-symbols-outlined text-[16px] text-red-600 flex-shrink-0 mt-px">
              cancel
            </span>
            <p className="m-0">
              Đơn này đã bị <strong>hủy</strong>. Bạn có thể{" "}
              <a
                href="/courts"
                className="text-red-600 font-semibold underline"
              >
                đặt sân mới
              </a>{" "}
              tại đây.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
