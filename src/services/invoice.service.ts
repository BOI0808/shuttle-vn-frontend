import axiosInstance from "@/lib/axios";
import type { ApiSchemas, InvoiceDetail, InvoiceQuery, PayInvoice } from "@/types";
import { ApiBusinessError } from "@/utils";
type InvoicePage = ApiSchemas["InvoiceDetailDtoPagedResult"];

function unwrap<T>(response: { success?: boolean; data?: T | null; message?: string | null; errors?: Record<string, string[]> | null }): T {
  if (!response.success || response.data == null) {
    const message = response.message ?? "Không nhận được dữ liệu hóa đơn.";
    throw new ApiBusinessError(message, { message, errors: response.errors });
  }
  return response.data;
}

export const invoiceService = {
  async getInvoices(params: InvoiceQuery): Promise<InvoicePage> {
    const { data } = await axiosInstance.get<ApiSchemas["InvoiceDetailDtoPagedResultApiResponse"]>("/invoices", { params });
    return unwrap(data);
  },
  async getInvoice(id: string): Promise<InvoiceDetail> {
    const { data } = await axiosInstance.get<ApiSchemas["InvoiceDetailDtoApiResponse"]>(`/invoices/${encodeURIComponent(id)}`);
    return unwrap(data);
  },
  async getHistory(id: string): Promise<InvoiceDetail[]> {
    const { data } = await axiosInstance.get<ApiSchemas["InvoiceDetailDtoIReadOnlyListApiResponse"]>(`/invoices/${encodeURIComponent(id)}/history`);
    return unwrap(data);
  },
  async payInvoice(id: string, payload: PayInvoice, idempotencyKey: string): Promise<InvoiceDetail> {
    const { data } = await axiosInstance.patch<ApiSchemas["InvoiceDetailDtoApiResponse"]>(
      `/invoices/${encodeURIComponent(id)}/pay`, payload,
      { headers: { "Idempotency-Key": idempotencyKey } },
    );
    return unwrap(data);
  },
};
