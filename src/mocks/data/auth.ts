import { UserAccount, Customer, Employee } from "@/types";

export const mockCustomer: Customer = {
  customerId: "c1",
  accountId: "a1",
  fullName: "Nguyễn Văn A",
  phone: "0901234567",
  email: "customer@shuttlevn.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockEmployee: Employee = {
  employeeId: "e1",
  fullName: "Trần Thị B",
  phone: "0907654321",
  email: "staff@shuttlevn.com",
  isAdmin: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockAdmin: Employee = {
  employeeId: "e2",
  fullName: "Lê Văn C",
  phone: "0912334455",
  email: "admin@shuttlevn.com",
  isAdmin: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockUserAccounts: UserAccount[] = [
  {
    accountId: "a1",
    accountType: "Customer",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customer: mockCustomer,
    employee: null,
  },
  {
    accountId: "a2",
    accountType: "Employee",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customer: null,
    employee: mockEmployee,
  },
  {
    accountId: "a3",
    accountType: "Employee",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customer: null,
    employee: mockAdmin,
  },
];
