export type AccountStatus = "Active" | "Disabled";
export type CodeType = "VerifyEmail" | "ResetPassword";
export type AccountType = "Customer" | "Employee";
export type UserRole = "Admin" | "Employee" | "Customer";

export interface UserAccount {
  accountId: string;
  accountType: AccountType;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
  customer: Customer | null;
  employee: Employee | null;
}

export interface Employee {
  employeeId: string;
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

export interface IssueCodeRequest {
  email: string;
  type: CodeType;
}

export interface CreateEmployeeRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface CreateCustomerRequest {
  fullName: string;
  phone: string;
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
}
// ── Response ──────────────────────────────────────────────────────────────────

export interface RegisterResponse {
  accountId: string;
}
