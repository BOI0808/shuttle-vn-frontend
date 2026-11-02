import { DashboardSummary } from "@/types";
import { mockAdminBookings } from "./booking";

export const mockDashboardSummary: DashboardSummary = {
  date: "2026-09-19",
  revenue: 4800000,
  paidInvoiceCount: 32,
  bookingCount: 38,
  bookedHours: 46.5,
  completedCount: 24,
  completedHours: 30,
  pendingCount: 8,
  courts: [
    {
      courtId: 1,
      courtName: "Sân 1",
      bookingCount: 20,
      bookedHours: 24,
      completedCount: 14,
      completedHours: 17,
    },
    {
      courtId: 2,
      courtName: "Sân 2",
      bookingCount: 18,
      bookedHours: 22.5,
      completedCount: 10,
      completedHours: 13,
    },
  ],
  pendingBookings: mockAdminBookings.filter((b) => b.status === "Pending"),
};
