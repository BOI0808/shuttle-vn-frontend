import type { Metadata } from "next";
import MemberBookingClient from "./member-booking-client";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Xác nhận đặt sân" };

export default function BookingPage() {
  return <Suspense fallback={<p>Đang tải...</p>}>
    <MemberBookingClient />;
  </Suspense>
}
