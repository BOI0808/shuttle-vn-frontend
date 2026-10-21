import type { Metadata } from "next";
import GuestBookingClient from "./guest-booking-client";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Đặt sân không cần tài khoản" };

export default function GuestBookingPage() {
  return <Suspense fallback={<p>Đang tải...</p>}>
    <GuestBookingClient />;
  </Suspense>
}
