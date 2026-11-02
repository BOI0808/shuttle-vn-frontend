import type { components } from "@/api/schema";

import type { DateRangeParams } from "./api";
import type { BookingListItem } from "./booking";

export type RevenueGroupBy = components["schemas"]["RevenueGroupBy"];

export interface RevenueChartPoint {
  date: string;
  revenue: number;
}

export interface RevenueReportParams extends DateRangeParams {
  groupBy: RevenueGroupBy;
}

export interface RevenuePeriod {
  periodStart: string;
  invoiceCount: number;
  revenue: number;
}

export interface RevenueReport {
  fromDate: string;
  toDate: string;
  groupBy: RevenueGroupBy;
  totalInvoices: number;
  totalRevenue: number;
  periods: RevenuePeriod[];
}

export type CourtUsageReportParams = RevenueReportParams;

export interface CourtUsageMetrics {
  bookingCount: number;
  bookedHours: number;
  completedCount: number;
  completedHours: number;
}

export interface CourtUsagePeriod extends CourtUsageMetrics {
  periodStart: string;
}

export interface CourtUsageCourt extends CourtUsageMetrics {
  courtId: number;
  courtName: string;
}

export interface CourtUsageReport extends CourtUsageMetrics {
  fromDate: string;
  toDate: string;
  groupBy: RevenueGroupBy;
  periods: CourtUsagePeriod[];
  courts: CourtUsageCourt[];
}

export interface DashboardSummary extends CourtUsageMetrics {
  date: string;
  revenue: number;
  paidInvoiceCount: number;
  pendingCount: number;
  courts: CourtUsageCourt[];
  pendingBookings: BookingListItem[];
}
