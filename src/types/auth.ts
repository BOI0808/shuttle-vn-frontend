export type AccountStatus = "Active" | "Disabled";

export type CodeType = "VerifyEmail" | "ResetPassword";

export interface UserAccount {
  accountId: string;
  username: string;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  employeeId: string;
  accountId: string;
  fullName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  customerId: string;
  accountId: string | null; // NULL nếu là khách vãng lai
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfile {
  fullName: string;
  phone: string;
  email: string;
}

export interface AuthResponse {
  account: UserAccount;
  employee: Employee | null;
  customer: Customer | null;
}

// ── Requests ──────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface IssueCodeRequest {
  email: string;
  type: CodeType;
}

export interface CreateEmployeeRequest {
  password: string;
  fullName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

export interface CreateCustomerRequest {
  fullName: string;
  phone: string;
  email: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Vai trò được suy ra từ dữ liệu (không phải enum từ server) */
export type UserRole = "Admin" | "Employee" | "Customer";
