"use client";

import { useQuery } from "@tanstack/react-query";

import { quickLookupService } from "@/services";

import { QUERY_KEYS } from "@/config/app";

const PAGE_SIZE = 20;

export function useQuickLookup(keyword: string, pageNumber: number) {
  return useQuery({
    queryKey: QUERY_KEYS.quickLookup(keyword, pageNumber),
    queryFn: () =>
      quickLookupService.lookup(keyword, { pageNumber, pageSize: PAGE_SIZE }),
    enabled: keyword.length > 0,
    staleTime: 0,
    retry: false,
  });
}