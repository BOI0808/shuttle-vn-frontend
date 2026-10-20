import type { Metadata } from "next";
import GuestBookingClient from "./guest-booking-client";

export const metadata: Metadata = { title: "Đặt sân không cần tài khoản" };

export default function GuestBookingPage() {
  return <GuestBookingClient />;
}
