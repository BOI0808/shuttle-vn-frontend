import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { AuditPage, AuditQuery } from "@/types/audit";

export const auditService = {
  async getAudits(params: AuditQuery): Promise<AuditPage> {
    const { data } = await axiosInstance.get<ApiResponse<AuditPage>>(
      "/audits",
      { params },
    );
    return data.data;
  },
};
