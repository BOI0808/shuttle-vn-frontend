import { DashboardSummary } from "@/types";
import { mockBookings } from "./booking";

export const mockDashboardSummary: DashboardSummary = {
  todayRevenue: 4800000,
  todayBookings: 38,
  monthRevenue: 125000000,
  monthBookings: 850,
  pendingBookings: 8,
  unpaidInvoices: 12,
  occupancyRateToday: 82,
  revenueTrend: "+12% so hôm qua",
  bookingsTrend: "+5 so hôm qua",
  occupancyTrend: "+8% tuần này",
  revenueChart: [
    { date: "2026-09-13", revenue: 4200000, bookingCount: 30 },
    { date: "2026-09-14", revenue: 5800000, bookingCount: 42 },
    { date: "2026-09-15", revenue: 3500000, bookingCount: 25 },
    { date: "2026-09-16", revenue: 6200000, bookingCount: 45 },
    { date: "2026-09-17", revenue: 4800000, bookingCount: 35 },
    { date: "2026-09-18", revenue: 3900000, bookingCount: 28 },
    { date: "2026-09-19", revenue: 5100000, bookingCount: 36 },
  ],
  occupancyByCourtToday: [
    { courtId: 1, courtName: "Sân 1", totalSlots: 15, bookedSlots: 12, occupancyRate: 80 },
    { courtId: 2, courtName: "Sân 2", totalSlots: 15, bookedSlots: 14, occupancyRate: 93 },
  ],
  recentBookings: mockBookings.slice(0, 3),
  pendingBookingsList: mockBookings.filter(b => b.status === "PENDING"),
};
