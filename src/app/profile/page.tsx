'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-lg">Welcome, {user?.name}</h1>
    </div>
  );
}
