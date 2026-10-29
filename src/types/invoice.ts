import type { ApiPaths, ApiSchemas } from "./api";

export type InvoiceDetail = ApiSchemas["InvoiceDetailDto"];
export type InvoiceQuery = NonNullable<ApiPaths["/api/invoices"]["get"]["parameters"]["query"]>;
export type PayInvoice = ApiSchemas["PayInvoiceDto"];

export interface PaymentAttempt {
  id: string;
  idempotencyKey: string;
  payload: PayInvoice;
}
