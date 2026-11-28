"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BookingDetailModal } from "@/components/booking/BookingDetailModal";
import { QuickLookupResults } from "@/components/booking/QuickLookupResults";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  OperationsEmptyCard,
  OperationsErrorCard,
  OperationsLoadingCard,
} from "@/components/ui/OperationsState";

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
    reset,
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
      void refetch();
      return;
    }
    setSubmittedKeyword(formData.keyword);
    setPageNumber(1);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-xs"
        onClick={(event) => {
          if (event.target === event.currentTarget && !selectedBookingId) {
            onClose();
          }
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-lookup-title"
          className="my-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2
              id="quick-lookup-title"
              className="font-display text-[18px] font-medium leading-[26px] text-ink"
            >
              Tra cứu nhanh đơn đặt sân
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="flex size-[36px] items-center justify-center rounded-[8px] text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                close
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto p-6">
            <form onSubmit={handleSubmit(handleLookup)} className="space-y-2">
              <Label htmlFor="quick-lookup-keyword">
                Mã đặt sân hoặc số điện thoại
              </Label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <Input
                    id="quick-lookup-keyword"
                    placeholder="Số điện thoại, email hoặc mã đặt sân (DS-…)"
                    icon={
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        search
                      </span>
                    }
                    error={errors.keyword?.message}
                    {...register("keyword")}
                  />
                </div>
                <Button type="submit" loading={isFetching}>
                  Tra cứu
                </Button>
              </div>
            </form>

            {!submittedKeyword && (
              <p className="border-t border-line py-6 text-center font-sans text-[14px] leading-[20px] text-ink-secondary">
                Nhập số điện thoại, email hoặc mã đặt sân rồi bấm Tra cứu.
              </p>
            )}

            {isLoading && (
              <div className="border-t border-line pt-5">
                <OperationsLoadingCard embedded rows={3} />
              </div>
            )}

            {isError && (
              <div className="border-t border-line pt-5">
                <OperationsErrorCard
                  embedded
                  title="Chưa thể tra cứu"
                  message={getErrorMessage(error)}
                  secondaryMessage="Giữ nguyên từ khóa để thử lại."
                  retryLabel="Thử lại"
                  onRetry={() => void refetch()}
                  footerNote=""
                />
              </div>
            )}

            {isEmpty && (
              <div className="border-t border-line pt-2">
                <OperationsEmptyCard
                  embedded
                  icon="search_off"
                  title="Không tìm thấy đơn phù hợp"
                  description="Kiểm tra lại mã đơn hoặc số điện thoại. Không hiển thị thông tin người khác khi không khớp."
                  actionLabel="Tra cứu lại"
                  onAction={() => {
                    reset();
                    setSubmittedKeyword("");
                    setPageNumber(1);
                  }}
                />
              </div>
            )}

            {data && !isEmpty && !isError && (
              <div className="border-t border-line pt-5">
                <QuickLookupResults
                  result={data}
                  onSelectBooking={setSelectedBookingId}
                  onPageChange={setPageNumber}
                />
              </div>
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