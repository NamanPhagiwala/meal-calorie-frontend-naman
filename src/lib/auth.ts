import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';

export const useAuthGuard = () => {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);
};
