import axiosInstance from "@/lib/axios";
import {
  ApiResponse,
  CreateEmployeeRequest,
  PaginatedResponse,
  PaginationParams,
  UpdateProfileRequest,
  UserAccount,
} from "@/types";
import {IS_MOCK, mockDelay} from "@/mocks/config";
import {mockUserAccounts} from "@/mocks/data";

export const employeeService = {
  async getAllEmployees(
    params?: PaginationParams
  ): Promise<PaginatedResponse<UserAccount>> {
    if (IS_MOCK) {
      await mockDelay();
      const employees = mockUserAccounts.filter(
        (acc) => acc.accountType === "Employee"
      );
      return {
        items: employees,
        totalCount: employees.length,
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
        totalPages: 1,
      };
    }
    const { data } = await axiosInstance.get<
      ApiResponse<PaginatedResponse<UserAccount>>
    >(`/employees`, { params });
    return data.data;
  },

  async getEmployeeById(id: string): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const employee = mockUserAccounts.find((acc) => acc.employee?.employeeId === id);
      if (!employee) throw new Error("Không tìm thấy nhân viên");
      return employee;
    }
    const { data } = await axiosInstance.get<ApiResponse<UserAccount>>(
      `/employees/${id}`
    );
    return data.data;
  },

  async createEmployee(payload: CreateEmployeeRequest): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const newAccount: UserAccount = {
        accountId: `ACC-${Math.floor(Math.random() * 1000)}`,
        accountType: "Employee",
        status: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customer: null,
        employee: {
          employeeId: `EMP-${Math.floor(Math.random() * 1000)}`,
          fullName: payload.fullName,
          phone: payload.phone,
          email: payload.email,
          isAdmin: payload.isAdmin,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      mockUserAccounts.unshift(newAccount);
      return newAccount;
    }
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees`,
      payload
    );
    return data.data;
  },

  async updateEmployee(
    id: string,
    payload: UpdateProfileRequest
  ): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const account = mockUserAccounts.find((acc) => acc.employee?.employeeId === id);
      if (!account || !account.employee) throw new Error("Không tìm thấy nhân viên");
      account.employee.fullName = payload.fullName;
      account.employee.phone = payload.phone;
      account.updatedAt = new Date().toISOString();
      return account;
    }
    const { data } = await axiosInstance.put<ApiResponse<UserAccount>>(
      `/employees/${id}`,
      payload
    );
    return data.data;
  },

  async grantAdminRole(id: string): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const account =
          mockUserAccounts.find((acc) => acc.employee?.employeeId === id);
      if (!account || !account.employee) throw new Error("Không tìm thấy nhân viên");
      account.employee.isAdmin = true;
      account.updatedAt = new Date().toISOString();
      return account;
    }
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/set-admin`
    );
    return data.data;
  },

  async lockEmployee(id: string): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const account =
          mockUserAccounts.find((acc) => acc.employee?.employeeId === id);
      if (!account) throw new Error("Không tìm thấy tài khoản");
      account.status = "Disabled";
      account.updatedAt = new Date().toISOString();
      return account;
    }
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/lock`
    );
    return data.data;
  },

  async unlockEmployee(id: string): Promise<UserAccount> {
    if (IS_MOCK) {
      await mockDelay();
      const account =
          mockUserAccounts.find((acc) => acc.employee?.employeeId === id);
      if (!account) throw new Error("Không tìm thấy tài khoản");
      account.status = "Active";
      account.updatedAt = new Date().toISOString();
      return account;
    }
    const { data } = await axiosInstance.post<ApiResponse<UserAccount>>(
      `/employees/${id}/unlock`
    );
    return data.data;
  },
};
