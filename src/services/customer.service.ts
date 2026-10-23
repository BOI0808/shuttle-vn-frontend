import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  BookingListItem,
  CreateCustomerRequest,
  Customer,
  CustomerListItem,
  CustomerSearchParams,
  PaginatedResponse,
  PaginationParams,
  UpdateProfileRequest,
} from "@/types";
import { IS_MOCK, mockDelay } from "@/mocks/config";
import { mockAdminBookings, mockCustomers } from "@/mocks/data";

type PageParams = Pick<PaginationParams, "pageNumber" | "pageSize">;

function paginateMock<T>(
  items: T[],
  params?: PageParams
): PaginatedResponse<T> {
  const pageNumber = params?.pageNumber ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const start = (pageNumber - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    pageNumber,
    pageSize,
    totalCount: items.length,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

function findMockCustomer(id: string): CustomerListItem {
  const customer = mockCustomers.find((item) => item.customerId === id);
  if (!customer) throw new Error("Không tìm thấy khách hàng");
  return customer;
}

function setMockAccountStatus(
  accountId: string,
  status: "Active" | "Disabled"
): void {
  const customer = mockCustomers.find((item) => item.accountId === accountId);
  if (!customer) throw new Error("Không tìm thấy tài khoản");
  customer.accountStatus = status;
  customer.updatedAt = new Date().toISOString();
}

export const customerService = {
  async getCustomers(
    params?: CustomerSearchParams
  ): Promise<PaginatedResponse<CustomerListItem>> {
    if (IS_MOCK) {
      await mockDelay();
      const keyword = params?.keyword?.trim().toLowerCase();
      const matched = keyword
        ? mockCustomers.filter(
            (item) =>
              item.fullName.toLowerCase().includes(keyword) ||
              item.phone.includes(keyword) ||
              item.email.toLowerCase().includes(keyword)
          )
        : mockCustomers;
      return paginateMock(matched, params);
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<CustomerListItem>>
    >(`/accounts/customers`, { params });
    return data.data;
  },

  async getCustomerById(id: string): Promise<CustomerListItem> {
    if (IS_MOCK) {
      await mockDelay();
      return findMockCustomer(id);
    }
    const { data } = await axiosInstance.get<ApiResponse<CustomerListItem>>(
      `/accounts/customers/${id}`
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
        `/accounts/customers`,
        payload
    );
    return data.data;
  },

  async updateCustomer(
    id: string,
    payload: UpdateProfileRequest
  ): Promise<CustomerListItem> {
    if (IS_MOCK) {
      await mockDelay();
      const customer = findMockCustomer(id);
      customer.fullName = payload.fullName;
      customer.phone = payload.phone;
      customer.updatedAt = new Date().toISOString();
      return customer;
    }
    const { data } = await axiosInstance.put<ApiResponse<CustomerListItem>>(
      `/accounts/customers/${id}`,
      payload
    );
    return data.data;
  },

  async getCustomerBookings(
    customerId: string,
    params?: PageParams
  ): Promise<PaginatedResponse<BookingListItem>> {
    if (IS_MOCK) {
      await mockDelay();
      findMockCustomer(customerId);
      const bookings = mockAdminBookings
        .filter((item) => item.customerId === customerId)
        .sort((a, b) =>
          `${b.date}${b.startTime}`.localeCompare(`${a.date}${a.startTime}`)
        );
      return paginateMock<BookingListItem>(bookings, params);
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<BookingListItem>>
    >(`/accounts/customers/${customerId}/bookings`, { params });
    return data.data;
  },

  async lockAccount(accountId: string): Promise<void> {
    if (IS_MOCK) {
      await mockDelay();
      setMockAccountStatus(accountId, "Disabled");
      return;
    }
    await axiosInstance.post(`/accounts/${accountId}/lock`);
  },

  async unlockAccount(accountId: string): Promise<void> {
    if (IS_MOCK) {
      await mockDelay();
      setMockAccountStatus(accountId, "Active");
      return;
    }
    await axiosInstance.post(`/accounts/${accountId}/unlock`);
  },
};