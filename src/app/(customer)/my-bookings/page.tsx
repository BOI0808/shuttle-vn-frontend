import { BookingHistoryList } from "@/components/booking/BookingHistoryList";

export const metadata = { title: "Lịch sử đặt sân – ShuttleVN" };

export default function MyBookingsPage() {
  return (
    <div className="max-w-[960px] mx-auto px-7 py-7">
      <BookingHistoryList />
    </div>
  );
}
