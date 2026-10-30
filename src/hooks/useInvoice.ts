"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/app";
import { invoiceService } from "@/services";
import type { InvoiceQuery, PayInvoice } from "@/types";

export function useInvoices(params: InvoiceQuery) {
  return useQuery({
    queryKey: [...QUERY_KEYS.invoices, params],
    queryFn: () => invoiceService.getInvoices(params),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.invoice(id),
    queryFn: () => invoiceService.getInvoice(id),
    enabled: !!id,
  });
}

export function useInvoiceHistory(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.invoice(id), "history"],
    queryFn: () => invoiceService.getHistory(id),
    enabled: !!id,
  });
}

export function usePayInvoice() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: {
      id: string; payload: PayInvoice; idempotencyKey: string;
    }) => invoiceService.payInvoice(id, payload, idempotencyKey),
    retry: false,
    onSettled: () => Promise.all([
      QUERY_KEYS.invoices, ["invoice"], ["booking-invoice"],
      QUERY_KEYS.bookings, ["booking"], ["booking-code"], QUERY_KEYS.myBookings,
      QUERY_KEYS.pendingBookingsAll, QUERY_KEYS.adminBookingsAll,
      ["booking-detail"], ["customer-bookings"], QUERY_KEYS.courtGrids,
      QUERY_KEYS.dashboard, ["revenue-stats"], ["quick-lookup"], QUERY_KEYS.auditLogs,
    ].map((queryKey) => client.invalidateQueries({ queryKey }))),
  });
}
