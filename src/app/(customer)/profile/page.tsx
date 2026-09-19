import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = { title: 'Thông tin cá nhân' };

export default function ProfilePage() {
  return <ProfileClient />;
}
