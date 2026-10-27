import type { components } from "@/api/schema";

import type { DateRangeParams } from "./api";
import type { BookingDetail } from "./booking";

export type RevenueGroupBy = components["schemas"]["RevenueGroupBy"];

export interface RevenueStats {
  date: string; // ISO yyyy-MM-dd
  revenue: number;
  bookingCount: number;
}

export interface CourtOccupancyStats {
  courtId: number;
  courtName: string;
  totalSlots: number;
  bookedSlots: number;
  occupancyRate: number; // 0–100
}

export interface DashboardSummary {
  todayRevenue: number;
  todayBookings: number;
  monthRevenue: number;
  monthBookings: number;
  pendingBookings: number; // trạng thái Pending cần xử lý
  unpaidInvoices: number; // hoá đơn Unpaid
  occupancyRateToday: number; // % tổng sân hôm nay
  revenueTrend?: string;
  bookingsTrend?: string;
  occupancyTrend?: string;
  revenueChart: RevenueStats[];
  occupancyByCourtToday: CourtOccupancyStats[];
  recentBookings: BookingDetail[];
  pendingBookingsList: BookingDetail[];
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
