import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';
import { RoleGuard } from '@/components/auth/RoleGuard';

export const metadata: Metadata = { title: 'Bảng điều khiển' };

export default function DashboardPage() {
  return (
    <RoleGuard allowedRoles={['Admin']}>
      <DashboardClient />
    </RoleGuard>
  );
}
