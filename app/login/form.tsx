'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-auto max-w-md mt-10 p-6 bg-white shadow-lg rounded-lg"
      aria-labelledby="login-form-title"
    >
      <h2 id="login-form-title" className="text-2xl font-semibold text-center mb-6">Login</h2>
      <input
        name="email"
        className="border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:border-blue-500"
        type="email"
        placeholder="Email"
        required
        aria-label="Email"
      />
      <input
        name="password"
        className="border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:border-blue-500"
        type="password"
        placeholder="Password"
        required
        aria-label="Password"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        aria-label="Login"
      >
        Login
      </button>
      <p className="text-center text-gray-700">
        Don t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
      </p>
    </form>
  );
}
