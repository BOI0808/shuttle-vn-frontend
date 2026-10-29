import axiosInstance from "@/lib/axios";
import { ApiResponse, PaginationParams, QuickLookupResult } from "@/types";

type PageParams = Pick<PaginationParams, "pageNumber" | "pageSize">;

export const quickLookupService = {
  async lookup(keyword: string, page: PageParams): Promise<QuickLookupResult> {
    const { data } = await axiosInstance.get<ApiResponse<QuickLookupResult>>(
      "/quick-lookup",
      { params: { keyword, ...page } }
    );
    return data.data;
  },
};