export type AccountStatus = "ACTIVE" | "LOCKED" | "DISABLED";

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

// ── Requests ──────────────────────────────────────────────────────────────────

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface CreateEmployeeRequest {
  username: string;
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

// ── Response ──────────────────────────────────────────────────────────────────

/** Trả về sau login / refresh */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  account: UserAccount;
  employee: Employee | null;
  customer: Customer | null;
}

/** Vai trò được suy ra từ dữ liệu (không phải enum từ server) */
export type UserRole = "Admin" | "Employee" | "Customer";
