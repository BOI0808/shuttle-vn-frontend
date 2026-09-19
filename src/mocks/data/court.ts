import { Court, CourtGridResponse } from "@/types";

export const mockCourts: Court[] = [
  {
    courtId: 1,
    name: "Sân 1",
    description: "Sân cầu lông tiêu chuẩn, thảm tập luyện chuyên dụng",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    courtId: 2,
    name: "Sân 2",
    description: "Sân cầu lông tiêu chuẩn, ánh sáng tốt",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    courtId: 3,
    name: "Sân 3",
    description: "Sân đang bảo trì định kỳ",
    status: "MAINTENANCE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getMockCourtGrid = (date: string): CourtGridResponse => {
  const timeSlots = [
    "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  return {
    date,
    courts: mockCourts.map(court => ({
      court,
      slots: timeSlots.slice(0, -1).map((time, index) => {
        const startTime = time;
        const endTime = timeSlots[index + 1];
        
        // Randomize status for demo
        let displayStatus: "AVAILABLE" | "BOOKED" | "CLOSED" = "AVAILABLE";
        const hour = parseInt(startTime.split(':')[0]);
        
        if (court.status === "MAINTENANCE") {
            displayStatus = "CLOSED";
        } else if (hour < 6 || hour > 21) {
            displayStatus = "CLOSED";
        } else if (Math.random() > 0.7) {
            displayStatus = "BOOKED";
        }

        return {
          courtId: court.courtId,
          date,
          startTime,
          endTime,
          displayStatus,
          bookingId: displayStatus === "BOOKED" ? `mock-b-${court.courtId}-${index}` : null,
          pricePerHour: 150000,
        };
      })
    }))
  };
};
