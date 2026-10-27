import type { components } from "@/api/schema";

import type { PaginatedResponse } from "./api";
import type { CustomerListItem } from "./auth";
import type { BookingListItem } from "./booking";

export type QuickLookupMatchType = components["schemas"]["QuickLookupMatchType"];

export interface QuickLookupResult {
  matchType: QuickLookupMatchType;
  customers: CustomerListItem[];
  bookings: PaginatedResponse<BookingListItem>;
}