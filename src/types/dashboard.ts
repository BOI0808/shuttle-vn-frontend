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
  pendingBookings: number; // trạng thái PENDING cần xử lý
  unpaidInvoices: number; // hoá đơn UNPAID
  occupancyRateToday: number; // % tổng sân hôm nay
  revenueChart: RevenueStats[];
  occupancyByCourtToday: CourtOccupancyStats[];
}
