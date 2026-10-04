export type CourtStatus = "ACTIVE" | "MAINTENANCE" | "CLOSED";

export type SlotDisplayStatus = "AVAILABLE" | "BOOKED" | "CLOSED";

export interface Court {
  courtId: number;
  name: string;
  description: string;
  status: CourtStatus;
  isInUse?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourtSchedule {
  id: number;
  courtId: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isAvailable: boolean;
  updatedAt: string;
}

export interface PricingRule {
  id: number;
  courtId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  updatedAt: string;
}

// ── Court Grid (tổng hợp FE) ──────────────────────────────────────────────────

export interface CourtSlot {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
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

export interface UpdateCourtStatusRequest {
  status: CourtStatus;
  reason?: string;
}

export interface UpdateCourtStatusResult {
  court: Court;
  affectedUpcomingBookingsCount: number;
}
