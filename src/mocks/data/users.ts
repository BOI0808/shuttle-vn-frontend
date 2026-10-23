import { mockCustomer, mockEmployee, mockAdmin } from "./auth";
import { CustomerListItem, Employee } from "@/types";

export const mockCustomers: CustomerListItem[] = [
  { ...mockCustomer, hasAccount: true, accountStatus: "Active" },
  {
    customerId: "c2",
    accountId: "a4",
    fullName: "Trần Thị B",
    phone: "0907654321",
    email: "customer2@gmail.com",
    hasAccount: true,
    accountStatus: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    customerId: "c3",
    accountId: null,
    fullName: "Lê Văn C",
    phone: "0912334455",
    email: "customer3@gmail.com",
    hasAccount: false,
    accountStatus: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];