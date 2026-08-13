export type CourtStatus = "ACTIVE" | "MAINTENANCE";

/** Trạng thái hiển thị của một slot trên grid (tính toán phía FE) */
export type SlotDisplayStatus = "AVAILABLE" | "BOOKED" | "CLOSED";

export interface Court {
  courtId: number;
  name: string;
  description: string;
  status: CourtStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Lịch mở/đóng sân theo ngày trong tuần.
 * dayOfWeek: 0 = Chủ nhật, 1 = Thứ 2, ..., 6 = Thứ 7 (ISO: 1=Mon … 7=Sun)
 */
export interface CourtSchedule {
  id: number;
  courtId: number;
  dayOfWeek: number; // 0–6
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
  isAvailable: boolean;
  updatedAt: string;
}

/**
 * Quy tắc giá theo khung giờ.
 * pricePerHour được tính theo số phút thực tế (BR-07).
 */
export interface PricingRule {
  id: number;
  courtId: number;
  dayOfWeek: number; // 0–6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  pricePerHour: number; // Decimal(10,2) — đơn vị VND
  updatedAt: string;
}

// ── Court Grid (tổng hợp FE) ──────────────────────────────────────────────────

export interface CourtSlot {
  courtId: number;
  date: string; // ISO yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  displayStatus: SlotDisplayStatus;
  bookingId: string | null;
  pricePerHour: number;
}

export interface CourtGridItem {
  court: Court;
  slots: CourtSlot[];
}

export interface CourtGridResponse {
  date: string;
  courts: CourtGridItem[];
}

// ── Requests ──────────────────────────────────────────────────────────────────

export interface CreateCourtRequest {
  name: string;
  description: string;
}

export interface UpdateCourtRequest {
  name?: string;
  description?: string;
  status?: CourtStatus;
}

export interface UpsertCourtScheduleRequest {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isAvailable: boolean;
}

export interface UpsertPricingRuleRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  pricePerHour: number;
}
