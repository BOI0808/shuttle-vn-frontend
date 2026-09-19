import type { Metadata } from 'next';
import ManageCourtsClient from './ManageCourtsClient';

export const metadata: Metadata = { title: 'Quản lý sân' };

export default function ManageCourtsPage() {
  return <ManageCourtsClient />;
}
