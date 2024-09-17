'use client';
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Logout from "@/app/logout";
import Login from "@/app/login";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CartContext from "@/context/CartContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const totalItems = cart?.cartItems?.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0;
  const subtotal = cart?.cartItems?.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0).toFixed(2) || "0.00";

  useEffect(() => {
    if (status === "authenticated") {
      setIsAdmin(session?.user?.email === "admin@admin.com");
    }
  }, [status, session]);

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
  }, [status, session]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">Store</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-info">Subtotal: ${subtotal}</span>
              <div className="card-actions">
                <Link href="/carrito">
                  <button className="btn btn-primary btn-block">View cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {status === "authenticated" ? (
                <Image alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={100} height={100} />
              ) : (
                <Image alt="Default avatar" src="https://www.w3schools.com/w3images/avatar1.png" width={100} height={100} />
              )}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {status === "authenticated" ? (
              <>
                <Logout />
                {isAdmin && (
                  <li>
                    <Link href="/admin" className="btn btn-ghost text-md">
                      Panel Admin
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <Login />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
