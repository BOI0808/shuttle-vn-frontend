import type { Metadata } from 'next';
import ScheduleClient from './ScheduleClient';
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = { title: 'Quản lý lịch sân' };

export default function SchedulePage() {
  return (
      <RoleGuard allowedRoles={['Admin', 'Employee']}>
        <ScheduleClient />;
      </RoleGuard>
  )
}
