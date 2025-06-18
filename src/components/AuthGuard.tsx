'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  useEffect(() => { if (status === 'unauthenticated') signIn(); }, [status]);
  if (status !== 'authenticated') return <div>Loading...</div>;
  return <>{children}</>;
}