'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (!session?.user?.email || session.user.email !== "admin@admin.com")) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user || session.user.email !== "admin@admin.com") {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Panel Admin</h1>
      <div className="w-full max-w-md space-y-4 mt-4">
        <Link href="/admin/products">
          <button className="w-full btn btn-primary py-2 text-lg mb-4">Products</button>
        </Link>
        <Link href="/admin/users">
          <button className="w-full btn btn-primary py-2 text-lg mb-4">Users</button>
        </Link>
        <Link href="/admin/orders">
          <button className="w-full btn btn-primary py-2 text-lg mb-4">Orders</button>
        </Link>
        <Link href="/">
          <button className="w-full btn btn-secondary py-2 text-lg mb-4">Back to Store</button>
        </Link>
      </div>
    </div>
  );
}
