"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courtService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import {
  CreateCourtRequest,
  CreatePricingRuleRequest,
  UpdateCourtRequest,
  UpdateCourtScheduleRequest,
  UpdateCourtStatusRequest,
  UpdatePricingRuleRequest,
} from "@/types";

export function useCourts() {
  return useQuery({
    queryKey: QUERY_KEYS.courts,
    queryFn: courtService.getCourts,
  });
}

export function useCourtGrid(date: string) {
  return useQuery({
    queryKey: QUERY_KEYS.courtGrid(date),
    queryFn: () => courtService.getCourtGrid(date),
    refetchInterval: 1000 * 30,
  });
}

export function useCourt(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.court(id),
    queryFn: () => courtService.getCourtById(id),
    enabled: id > 0,
  });
}

function useInvalidateCourts() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courts });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courtGrids });
  };
}

export function useCreateCourt() {
  const invalidate = useInvalidateCourts();
  return useMutation({ mutationFn: (payload: CreateCourtRequest) => courtService.createCourt(payload), onSuccess: invalidate });
}

export function useUpdateCourt() {
  const invalidate = useInvalidateCourts();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCourtRequest }) => courtService.updateCourt(id, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateCourtStatus() {
  const invalidate = useInvalidateCourts();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCourtStatusRequest }) => courtService.updateCourtStatus(id, payload),
    onSuccess: invalidate,
  });
}

export function useCourtSchedules(courtId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.courtSchedules(courtId),
    queryFn: () => courtService.getCourtSchedules(courtId),
    enabled: courtId > 0,
  });
}

export function useUpdateCourtSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courtId, dayOfWeek, payload }: { courtId: number; dayOfWeek: number; payload: UpdateCourtScheduleRequest }) => courtService.updateCourtSchedule(courtId, dayOfWeek, payload),
    onSuccess: (_, { courtId }) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courtSchedules(courtId) }),
  });
}

export function usePricingRules(courtId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.pricingRules(courtId),
    queryFn: () => courtService.getPricingRules(courtId),
    enabled: courtId > 0,
  });
}

export function useCreatePricingRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courtId, payload }: { courtId: number; payload: CreatePricingRuleRequest }) => courtService.createPricingRule(courtId, payload),
    onSuccess: (_, { courtId }) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pricingRules(courtId) }),
  });
}

export function useUpdatePricingRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courtId, pricingRuleId, payload }: { courtId: number; pricingRuleId: number; payload: UpdatePricingRuleRequest }) => courtService.updatePricingRule(courtId, pricingRuleId, payload),
    onSuccess: (_, { courtId }) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pricingRules(courtId) }),
  });
}

export function useDeletePricingRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courtId, pricingRuleId }: { courtId: number; pricingRuleId: number }) => courtService.deletePricingRule(courtId, pricingRuleId),
    onSuccess: (_, { courtId }) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pricingRules(courtId) }),
  });
}
