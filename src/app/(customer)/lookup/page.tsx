"use client";

import { useState } from "react";
import { BookingLookupForm } from "@/components/booking/BookingLookupForm";
import { BookingLookupResult } from "@/components/booking/BookingLookupResult";
import { useBookingLookup } from "@/hooks/useBooking";
import type { BookingDetail } from "@/types";

export default function LookupPage() {
  const [notFoundCode, setNotFoundCode] = useState<string | null>(null);
  const [foundBooking, setFoundBooking] = useState<BookingDetail | null>(null);

  const { mutate: lookup } = useBookingLookup();

  function handleSubmit(code: string, contact: string) {
    lookup(code, {
      onSuccess: (booking) => {
        const contactMatch = !contact || booking.customerPhone === contact;
        if (contactMatch) {
          setFoundBooking(booking);
          setNotFoundCode(null);
        } else {
          setFoundBooking(null);
          setNotFoundCode(code);
        }
      },
      onError: () => {
        setFoundBooking(null);
        setNotFoundCode(code);
      },
    });
  }

  const hasResult = notFoundCode !== null || foundBooking !== null;

  return (
    <div className="max-w-[560px] mx-auto px-4 py-11 pb-16">
      {/* Page header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-[14px] bg-green-50 border border-green-200 mb-3.5">
          <span className="material-symbols-outlined text-[26px] text-emerald-500">
            manage_search
          </span>
        </div>
        <h1 className="font-display text-[22px] font-bold text-gray-900 mb-1.5">
          Tra cứu đơn đặt sân
        </h1>
        <p className="text-[13px] text-gray-400">
          Nhập mã đặt sân để kiểm tra thông tin chi tiết
        </p>
      </div>

      <BookingLookupForm onSubmit={handleSubmit} />

      {hasResult && (
        <BookingLookupResult
          notFoundCode={notFoundCode}
          booking={foundBooking}
        />
      )}
    </div>
  );
}
