export interface RevenueStats {
  date: string;
  revenue: number;
  bookingCount: number;
}

export interface OccupancyStats {
  courtId: string;
  courtName: string;
  totalSlots: number;
  bookedSlots: number;
  occupancyRate: number; // 0-100
}

export interface DashboardSummary {
  todayRevenue: number;
  todayBookings: number;
  monthRevenue: number;
  monthBookings: number;
  occupancyRateToday: number;
  pendingPayments: number;
  revenueChart: RevenueStats[];
  occupancyByCourtToday: OccupancyStats[];
}
