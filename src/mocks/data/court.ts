import {
  Court,
  CourtGridResponse,
  CourtSlot,
  SlotDisplayStatus,
} from "@/types";

const SLOT_COUNT = 34;
const pad = (n: number) => String(n).padStart(2, "0");
const toHHMM = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

export const mockCourts: Court[] = [
  {
    courtId: 1,
    name: "Sân 1",
    description: "Sân cầu lông tiêu chuẩn, thảm tập luyện chuyên dụng",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    courtId: 2,
    name: "Sân 2",
    description: "Sân cầu lông tiêu chuẩn, ánh sáng tốt",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    courtId: 3,
    name: "Sân 3",
    description: "Sân đang bảo trì định kỳ",
    status: "Maintenance",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getMockCourtGrid = (date: string): CourtGridResponse => ({
  date,
  courts: mockCourts.map((court) => ({
    court,
    slots: Array.from({ length: SLOT_COUNT }, (_, i): CourtSlot => {
      const start = 5 * 60 + i * 30;
      const booked = (Math.floor(i / 3) + court.courtId) % 4 === 0;
      const displayStatus: SlotDisplayStatus =
        court.status !== "Active" ? "CLOSED" : booked ? "BOOKED" : "AVAILABLE";
      return {
        courtId: court.courtId,
        date,
        startTime: toHHMM(start),
        endTime: toHHMM(start + 30),
        displayStatus,
        bookingId:
          displayStatus === "BOOKED" ? `mock-b-${court.courtId}-${i}` : null,
        pricePerHour: start < 17 * 60 ? 60000 : 100000,
      };
    }),
  })),
});
