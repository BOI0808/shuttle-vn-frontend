"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import {
  CreateEmployeeRequest,
  UpdateProfileRequest,
  PaginationParams,
} from "@/types";

export function useEmployees(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.employees, params],
    queryFn: () => employeeService.getAllEmployees(params),
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEmployeeRequest) =>
      employeeService.createEmployee(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employees }),
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProfileRequest;
    }) => employeeService.updateEmployee(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employees }),
  });
}

export function useLockEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeeService.lockEmployee(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employees }),
  });
}

export function useUnlockEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeeService.unlockEmployee(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employees }),
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeeService.deleteEmployee(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employees }),
  });
}
