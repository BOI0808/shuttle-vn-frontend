import type { components, paths } from "@/api/schema";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type ApiSchemas = components["schemas"];
export type ApiPaths = paths;
export type AccountDto = ApiSchemas["AccountDto"];
export type AuditDto = ApiSchemas["AuditDto"];
export type BadmintonCourtDto = ApiSchemas["BadmintonCourt"];
export type BookingDto = ApiSchemas["BookingDto"];
export type BookingDetailDto = ApiSchemas["BookingDetailDto"];
export type BookingListItemDto = ApiSchemas["BookingListItemDto"];
export type BookingStatusHistoryDto = ApiSchemas["BookingStatusHistoryDto"];
export type PricePreviewDto = ApiSchemas["PricePreviewResponse"];
export type CustomerDto = ApiSchemas["Customer"];
export type CustomerListItemDto = ApiSchemas["CustomerListItemDto"];
export type EmployeeDto = ApiSchemas["Employee"];
export type InvoiceDto = ApiSchemas["InvoiceDto"];
export type CourtScheduleDto = ApiSchemas["CourtSchedule"];
export type CourtSlotDto = ApiSchemas["CourtSlotDto"];
export type PricingRuleDto = ApiSchemas["PricingRule"];
export type CreateBookingDto = ApiSchemas["CreateBookingDto"];
export type QuickBookingDto = ApiSchemas["QuickBookingDto"];
export type CancelBookingDto = ApiSchemas["CancelBookingDto"];
export type ConfirmBookingDto = ApiSchemas["ConfirmBookingDto"];
export type RejectBookingDto = ApiSchemas["RejectBookingDto"];
export type CreateCourtDto = ApiSchemas["CreateCourtDto"];
export type UpdateCourtDto = ApiSchemas["UpdateCourtDto"];
export type UpdateCourtStatusDto = ApiSchemas["UpdateCourtStatusDto"];
export type UpdateCourtScheduleDto = ApiSchemas["UpdateCourtScheduleDto"];
export type SavePricingRuleDto = ApiSchemas["SavePricingRuleDto"];
export type CreateEmployeeDto = ApiSchemas["CreateEmployeeDto"];
export type CustomerProfileDto = ApiSchemas["CustomerProfileDto"];
export type UpdateProfileDto = ApiSchemas["UpdateProfileDto"];
export type LoginDto = ApiSchemas["LoginDto"];
export type RegisterDto = ApiSchemas["RegisterDto"];
export type CodeRequestDto = ApiSchemas["CodeRequestDto"];
export type ResetPasswordDto = ApiSchemas["ResetPasswordDto"];
export type ChangePasswordDto = ApiSchemas["ChangePasswordDto"];
export type BookingQuery = NonNullable<ApiPaths["/api/admin/bookings"]["get"]["parameters"]["query"]>;

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDesc?: boolean;
}

export interface DateRangeParams {
  fromDate: string; // ISO yyyy-MM-dd
  toDate: string;
}
