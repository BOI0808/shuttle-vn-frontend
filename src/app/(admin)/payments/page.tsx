import { RoleGuard } from "@/components/auth/RoleGuard";
import { InvoiceList } from "@/components/payment/InvoiceList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hóa đơn và thanh toán" };

export default function PaymentsPage() {
  return (
    <RoleGuard allowedRoles={["Admin", "Employee"]}>
      <InvoiceList />
    </RoleGuard>
  );
}
