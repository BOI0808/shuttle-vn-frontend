import axiosInstance from "@/lib/axios";
import {ApiResponse, CreateCustomerRequest, Customer, PaginatedResponse, PaginationParams,} from "@/types";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {mockCustomers} from "@/mocks/data";

export const customerService = {
  async getCustomers(params?: PaginationParams): Promise<PaginatedResponse<Customer>> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        items: mockCustomers,
        totalCount: mockCustomers.length,
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Customer>>>(
      `/customers`,
      { params }
    );
    return data.data;
  },

  async createCustomer(payload: CreateCustomerRequest): Promise<Customer> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        customerId: `CUST-${Math.floor(Math.random() * 1000)}`,
        accountId: null,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Customer>>(
        `/customers`,
        payload
    );
    return data.data;
  },
};
