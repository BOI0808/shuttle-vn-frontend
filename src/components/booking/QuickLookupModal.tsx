"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { QuickLookupResults } from "@/components/booking/QuickLookupResults";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useQuickLookup } from "@/hooks";

import { getErrorMessage } from "@/utils";

const PHONE_PATTERN = /^\+?\d{8,15}$/;
const BOOKING_CODE_PREFIX = "DS-";

function isSupportedKeyword(value: string): boolean {
  if (value.includes("@")) return true;
  if (value.toUpperCase().startsWith(BOOKING_CODE_PREFIX)) return true;
  return PHONE_PATTERN.test(value.replace(/[\s-]/g, ""));
}

const lookupSchema = z.object({
  keyword: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại, email hoặc mã đặt sân")
    .refine(
      isSupportedKeyword,
      "Nhập số điện thoại (8–15 chữ số), email hoặc mã đặt sân (DS-…)"
    ),
});

type LookupFormData = z.infer<typeof lookupSchema>;

interface QuickLookupModalProps {
  onClose: () => void;
}

export function QuickLookupModal({ onClose }: QuickLookupModalProps) {
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LookupFormData>({
    resolver: zodResolver(lookupSchema),
  });

  const { data, isLoading, isFetching, isError, error, refetch } =
    useQuickLookup(submittedKeyword, pageNumber);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedBookingId) {
        setSelectedBookingId(null);
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBookingId, onClose]);

  const isEmpty =
    data !== undefined &&
    data.customers.length === 0 &&
    data.bookings.totalCount === 0;

  const handleLookup = (formData: LookupFormData) => {
    if (formData.keyword === submittedKeyword && pageNumber === 1) {
      refetch();
      return;
    }
    setSubmittedKeyword(formData.keyword);
    setPageNumber(1);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-[2px]">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-lookup-title"
          className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-gray-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2
              id="quick-lookup-title"
              className="font-display text-[15px] font-bold text-gray-900"
            >
              Tra cứu nhanh
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="text-gray-400 hover:text-gray-700"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto p-6">
            <form
              onSubmit={handleSubmit(handleLookup)}
              className="flex items-start gap-3"
            >
              <Input
                aria-label="Từ khóa tra cứu"
                placeholder="Số điện thoại, email hoặc mã đặt sân (DS-…)"
                icon={
                  <span className="material-symbols-outlined text-[18px]">
                    search
                  </span>
                }
                error={errors.keyword?.message}
                {...register("keyword")}
              />
              <Button type="submit" className="w-auto" loading={isFetching}>
                Tra cứu
              </Button>
            </form>

            {!submittedKeyword && (
              <p className="py-6 text-center text-sm text-slate-500">
                Nhập số điện thoại, email hoặc mã đặt sân rồi bấm Tra cứu.
              </p>
            )}

            {isLoading && (
              <p className="py-6 text-center font-mono text-sm text-slate-500">
                Đang tra cứu...
              </p>
            )}

            {isError && (
              <div role="alert" className="py-6 text-center text-sm text-red-600">
                <p>{getErrorMessage(error)}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mx-auto mt-3 inline-flex w-auto"
                  onClick={() => refetch()}
                >
                  Thử lại
                </Button>
              </div>
            )}

            {isEmpty && (
              <p className="py-6 text-center text-sm text-slate-500">
                Không tìm thấy khách hàng hoặc đặt sân phù hợp.
              </p>
            )}

            {data && !isEmpty && !isError && (
              <QuickLookupResults
                result={data}
                onSelectBooking={setSelectedBookingId}
                onPageChange={setPageNumber}
              />
            )}
          </div>
        </div>
      </div>

      {selectedBookingId && (
        <BookingDetailModal
          bookingId={selectedBookingId}
          onClose={() => setSelectedBookingId(null)}
        />
      )}
    </>
  );
}