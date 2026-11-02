"use client";

import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import type { AuditQuery } from "@/types";

export function useAudits(params: AuditQuery) {
  return useQuery({
    queryKey: [...QUERY_KEYS.auditLogs, params],
    queryFn: () => auditService.getAudits(params),
    placeholderData: (previous) => previous,
  });
}
