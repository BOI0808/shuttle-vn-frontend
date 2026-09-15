export type AccountStatus = "ACTIVE" | "LOCKED" | "DISABLED";
export type AccountTypeEnum = "CUSTOMER" | "EMPLOYEE";

export interface UserAccount {
  accountId: string;
  loginEmail: string;
  accountType: AccountTypeEnum;
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
  accountId: string | null;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
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

// ── Response ──────────────────────────────────────────────────────────────────

export interface RegisterResponse {
  accountId: string;
}

export interface MyProfile {
  accountId: string;
  fullName: string;
  phone: string;
  email: string;
  role: UserRole;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
}

export type UserRole = "Admin" | "Employee" | "Customer";
