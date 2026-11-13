import { AuthUser } from "@/stores/auth.store";
import { UserAccount } from "@/types";

export function mapAccountToAuthUser(userAccount: UserAccount): AuthUser {
  if (userAccount.accountType === "Customer") {
    if (userAccount.customer === null) {
      throw new Error("Không tìm thấy hồ sơ khách hàng của tài khoản này.");
    }
    return {
      accountId: userAccount.accountId,
      fullName: userAccount.customer.fullName,
      phone: userAccount.customer.phone,
      email: userAccount.customer.email,
      role: "Customer",
    };
  }

  if (userAccount.employee === null) {
    throw new Error("Không tìm thấy hồ sơ nhân viên của tài khoản này.");
  }
  return {
    accountId: userAccount.accountId,
    fullName: userAccount.employee.fullName,
    phone: userAccount.employee.phone,
    email: userAccount.employee.email,
    role: userAccount.employee.isAdmin ? "Admin" : "Employee",
  };
}
