import { BookingHistoryList } from "@/components/booking/BookingHistoryList";
import {Metadata} from "next";

export const metadata: Metadata = { title: "Lịch sử đặt sân" };

export default function MyBookingsPage() {
  return (
    <div className="max-w-[960px] mx-auto px-7 py-7">
      <BookingHistoryList />
    </div>
  );
}
