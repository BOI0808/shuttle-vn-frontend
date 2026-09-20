import { mockCustomer, mockEmployee, mockAdmin } from "./auth";
import { Customer, Employee } from "@/types";

export const mockCustomers: Customer[] = [
  mockCustomer,
  {
    customerId: "c2",
    accountId: "a4",
    fullName: "Trần Thị B",
    phone: "0907654321",
    email: "customer2@gmail.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    customerId: "c3",
    accountId: null,
    fullName: "Lê Văn C",
    phone: "0912334455",
    email: "customer3@gmail.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockEmployees: Employee[] = [
  mockEmployee,
  mockAdmin,
  {
    employeeId: "e3",
    fullName: "Phạm Văn D",
    phone: "0988776655",
    email: "staff2@shuttlevn.com",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
