import type { Metadata } from 'next';
import LookupClient from './LookupClient';

export const metadata: Metadata = { title: 'Tra cứu đơn hàng' };

export default function LookupPage() {
  return <LookupClient />;
}
