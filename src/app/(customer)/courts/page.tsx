import type { Metadata } from 'next';
import CourtsClient from './CourtsClient';

export const metadata: Metadata = { title: 'Danh sách sân' };

export default function CourtsPage() {
  return <CourtsClient />;
}
