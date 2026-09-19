import { RoleGuard } from "@/components/auth/RoleGuard";
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Xác nhận thanh toán' };

export default function PaymentsPage() {
  return (
      <RoleGuard allowedRoles={['Admin', 'Employee']}>
        <div>{/* PaymentConfirmation component sẽ được implement ở đây */}</div>
      </RoleGuard>
  )
}
