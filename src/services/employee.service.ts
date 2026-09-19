import axiosInstance from "@/lib/axios";
import {ApiResponse, CreateEmployeeRequest, Employee, PaginatedResponse, PaginationParams,} from "@/types";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {mockEmployees} from "@/mocks/data";

export const employeeService = {
  async getEmployees(params?: PaginationParams): Promise<PaginatedResponse<Employee>> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        items: mockEmployees,
        totalCount: mockEmployees.length,
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Employee>>>(
      `/employees`,
      { params }
    );
    return data.data;
  },

  async createEmployee(payload: CreateEmployeeRequest): Promise<Employee> {
    if (IS_MOCK) {
      await mockDelay();
      return {
        employeeId: `EMP-${Math.floor(Math.random() * 1000)}`,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await axiosInstance.post<ApiResponse<Employee>>(
        `/employees`,
        payload
    );
    return data.data;
  },
};
