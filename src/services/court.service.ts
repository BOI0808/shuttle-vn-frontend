// import axiosInstance from "@/lib/axios";
// import {
//   ApiResponse,
//   Court,
//   CourtGridResponse,
//   PaginatedResponse,
//   PaginationParams,
// } from "@/types";

// export const courtService = {
//   async getCourts(
//     params?: PaginationParams
//   ): Promise<PaginatedResponse<Court>> {
//     const { data } = await axiosInstance.get<
//       ApiResponse<PaginatedResponse<Court>>
//     >("/courts", { params });
//     return data.data;
//   },

//   async getCourtById(id: string): Promise<Court> {
//     const { data } = await axiosInstance.get<ApiResponse<Court>>(
//       `/courts/${id}`
//     );
//     return data.data;
//   },

//   async getCourtGrid(date: string): Promise<CourtGridResponse> {
//     const { data } = await axiosInstance.get<ApiResponse<CourtGridResponse>>(
//       "/courts/grid",
//       { params: { date } }
//     );
//     return data.data;
//   },

//   async createCourt(payload: Omit<Court, "id" | "createdAt">): Promise<Court> {
//     const { data } = await axiosInstance.post<ApiResponse<Court>>(
//       "/courts",
//       payload
//     );
//     return data.data;
//   },

//   async updateCourt(
//     id: string,
//     payload: Partial<Omit<Court, "id" | "createdAt">>
//   ): Promise<Court> {
//     const { data } = await axiosInstance.put<ApiResponse<Court>>(
//       `/courts/${id}`,
//       payload
//     );
//     return data.data;
//   },

//   async deleteCourt(id: string): Promise<void> {
//     await axiosInstance.delete(`/courts/${id}`);
//   },
// };

//Mock API
// src/services/court.service.ts
import { CourtGridResponse } from "@/types";

export const courtService = {
  async getCourtGrid(date: string): Promise<CourtGridResponse> {
    // Giả lập delay mạng 500ms
    await new Promise((res) => setTimeout(res, 500));

    // Dữ liệu giả lập 3 sân mẫu
    return {
      date,
      courts: [1, 2, 3].map((id) => ({
        court: {
          courtId: id,
          name: `Sân số ${id}`,
          description: "Sân tiêu chuẩn thi đấu thảm PVC",
          status: id === 3 ? "MAINTENANCE" : "ACTIVE",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        slots: [
          // Giả lập slot 06:00 đã có người đặt
          {
            courtId: id,
            date,
            startTime: "06:00",
            endTime: "06:30",
            displayStatus: "BOOKED",
            bookingId: "mock-booking-id",
            pricePerHour: 100000,
          },
          // Giả lập slot 06:30 đã có người đặt
          {
            courtId: id,
            date,
            startTime: "06:30",
            endTime: "07:00",
            displayStatus: "BOOKED",
            bookingId: "mock-booking-id",
            pricePerHour: 100000,
          },
        ],
      })),
    };
  },
};
