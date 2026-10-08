import type { components } from "@/api/schema";

export type CourtStatus = components["schemas"]["CourtStatus"];
export type SlotDisplayStatus = "AVAILABLE" | "BOOKED" | "CLOSED";

export interface Court {
  courtId: number;
  name: string;
  description: string;
  status: CourtStatus;
  isInUse?: boolean;
  createdAt: string;
  updatedAt: string;
  courtSchedules?: CourtSchedule[];
  pricingRules?: PricingRule[];
}

export interface CourtSchedule {
  scheduleId: number;
  courtId: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PricingRule {
  pricingRuleId: number;
  courtId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  createdAt: string;
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
  defaultOpenTime: string;
  defaultCloseTime: string;
  defaultPricePerHour: number;
}

export interface UpdateCourtRequest {
  name?: string;
  description?: string;
}

export interface UpdateCourtScheduleRequest {
  openTime: string;
  closeTime: string;
  isAvailable: boolean;
}

export interface CreatePricingRuleRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  pricePerHour: number;
}

export type UpdatePricingRuleRequest = CreatePricingRuleRequest;

export interface UpdateCourtStatusRequest {
  status: CourtStatus;
  reason?: string;
}
