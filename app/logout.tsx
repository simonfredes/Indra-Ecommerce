"use client";

import { cleanCarrito } from "@/components/cart/ShoppingCart";
import { signOut } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";


export default function Logout() {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    cleanCarrito().then(() =>  router.push(pathname));
    };

  return (
    <span
      className="cursor-pointer text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md shadow-md"
      onClick={handleLogout}
    >
      Logout
    </span>
  );
}
