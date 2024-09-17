'use client';
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function Login() {
    return (
        <span className="cursor-pointer text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-md"
          onClick={() => {
            signIn();
          }}
        >
          LogIn
        </span>
      );
}