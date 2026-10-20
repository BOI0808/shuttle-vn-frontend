import type { Metadata } from "next";
import MemberBookingClient from "./member-booking-client";

export const metadata: Metadata = { title: "Xác nhận đặt sân" };

export default function BookingPage() {
  return <MemberBookingClient />;
}
