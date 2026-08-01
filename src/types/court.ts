export type CourtStatus = 'Available' | 'Booked' | 'Maintenance' | 'Closed';

export type CourtType = 'Standard' | 'Premium' | 'VIP';

export interface Court {
  id: string;
  name: string;
  type: CourtType;
  pricePerHour: number;
  description: string;
  amenities: string[];
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CourtSlot {
  courtId: string;
  courtName: string;
  date: string; // ISO yyyy-MM-dd
  timeSlot: string; // e.g. "07:00"
  endTime: string; // e.g. "08:00"
  status: CourtStatus;
  bookingId: string | null;
}

export interface CourtGridResponse {
  date: string;
  courts: CourtGridItem[];
}

export interface CourtGridItem {
  court: Court;
  slots: CourtSlot[];
}
