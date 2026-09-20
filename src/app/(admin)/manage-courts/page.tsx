import type { Metadata } from 'next';
import ManageCourtsClient from './ManageCourtsClient';
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: 'Quản lý sân' };

export default function ManageCourtsPage() {
  return (
      <RoleGuard allowedRoles={['Admin', 'Employee']}>
        <ManageCourtsClient />
      </RoleGuard>
  )
}
