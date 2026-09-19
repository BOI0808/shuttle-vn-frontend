import type { Metadata } from 'next';
import CustomersClient from './CustomersClient';
import {RoleGuard} from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: 'Quản lý khách hàng '};

export function CustomersPage() {
  return (
      <RoleGuard allowedRoles={['Admin', 'Employee']}>
        <CustomersClient/>;
      </RoleGuard>
  )
}
