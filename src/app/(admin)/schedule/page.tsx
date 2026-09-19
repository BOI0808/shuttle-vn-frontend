import type { Metadata } from 'next';
import ScheduleClient from './ScheduleClient';

export const metadata: Metadata = { title: 'Quản lý lịch sân' };

export default function SchedulePage() {
  return <ScheduleClient />;
}
