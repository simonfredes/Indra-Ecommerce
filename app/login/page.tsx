'use client';
import Form from './form';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form />
    </div>
  );
}
