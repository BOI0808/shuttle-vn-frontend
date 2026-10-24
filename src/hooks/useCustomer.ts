"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { customerService } from "@/services";
import { QUERY_KEYS } from "@/config/app";
import {
  CreateCustomerRequest,
  CustomerSearchParams,
  PaginationParams,
  UpdateProfileRequest,
} from "@/types";

type PageParams = Pick<PaginationParams, "pageNumber" | "pageSize">;

interface UpdateCustomerVariables {
  id: string;
  payload: UpdateProfileRequest;
}

interface CustomerAccountVariables {
  accountId: string;
  customerId: string;
}

export function useCustomers(params?: CustomerSearchParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.customers, params],
    queryFn: () => customerService.getCustomers(params),
    placeholderData: keepPreviousData,
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.customer(id),
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
  });
}

export function useCustomerBookings(customerId: string, params?: PageParams) {
  return useQuery({
    queryKey: QUERY_KEYS.customerBookings(customerId, params),
    queryFn: () => customerService.getCustomerBookings(customerId, params),
    enabled: !!customerId,
    placeholderData: keepPreviousData,
  });
}

function useInvalidateCustomerQueries() {
  const queryClient = useQueryClient();
  return (customerId: string) =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers }),
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.customer(customerId),
      }),
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.customerBookings(customerId),
      }),
    ]);
}

export function useUpdateCustomer() {
  const invalidate = useInvalidateCustomerQueries();
  return useMutation({
    mutationFn: ({ id, payload }: UpdateCustomerVariables) =>
      customerService.updateCustomer(id, payload),
    onSuccess: (_data, { id }) => invalidate(id),
  });
}

export function useLockCustomerAccount() {
  const invalidate = useInvalidateCustomerQueries();
  return useMutation({
    mutationFn: ({ accountId }: CustomerAccountVariables) =>
      customerService.lockAccount(accountId),
    onSuccess: (_data, { customerId }) => invalidate(customerId),
  });
}

export function useUnlockCustomerAccount() {
  const invalidate = useInvalidateCustomerQueries();
  return useMutation({
    mutationFn: ({ accountId }: CustomerAccountVariables) =>
      customerService.unlockAccount(accountId),
    onSuccess: (_data, { customerId }) => invalidate(customerId),
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCustomerRequest) =>
      customerService.createCustomer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
    },
  });
}