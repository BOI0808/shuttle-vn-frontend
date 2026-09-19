import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  UserAccount,
  CreateEmployeeRequest,
  UpdateProfileRequest,
} from "@/types";

export const employeeService = {
  async getAllEmployees(
    params?: PaginationParams
  ): Promise<PaginatedResponse<UserAccount>> {
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<UserAccount>>
    >("/employees", { params });
    return data.data;
  },

  async getEmployeeById(id: string): Promise<UserAccount> {
    const { data } = await axiosInstance.get<ApiResponse<UserAccount>>(
      `/employees/${id}`
    );
    return data.data;
  },

  async createEmployee(payload: CreateEmployeeRequest): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      "/employees",
      payload
    );
    return data.data;
  },

  async updateEmployee(
    id: string,
    payload: UpdateProfileRequest
  ): Promise<UserAccount> {
    const { data } = await axiosInstance.put<ApiResponse<UserAccount>>(
      `/employees/${id}`,
      payload
    );
    return data.data;
  },

  async grantAdminRole(id: string): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/set-admin`
    );
    return data.data;
  },

  async lockEmployee(id: string): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/lock`
    );
    return data.data;
  },

  async unlockEmployee(id: string): Promise<UserAccount> {
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/unlock`
    );
    return data.data;
  },
};
