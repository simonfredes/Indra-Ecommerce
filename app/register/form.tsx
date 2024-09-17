'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Form() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    if (response.ok) {
      setMessage("User registered successfully!");
    } else {
      setMessage("Error registering user. Please try again.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg"
        aria-labelledby="register-form-title"
      >
        <h2 id="register-form-title" className="text-2xl font-semibold text-center mb-6">Register</h2>
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
          aria-label="Register"
        >
          Register
        </button>
        <p className="text-center text-gray-700">
          Do you already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded shadow-md max-w-md text-center" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}
