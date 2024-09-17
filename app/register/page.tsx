'use client';
import { useSession } from 'next-auth/react';
import Form from './form';
import { redirect } from 'next/navigation';

export default function RegisterPage() {
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
