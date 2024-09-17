import { UsersTable } from '@/components/UsersTable'
import Link from 'next/link'
export default function UsersPage() {
    return (
        <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <UsersTable />
        </div>
        <Link href="/admin">
          <button className="btn btn-secondary py-2 text-lg mt-4">Back to Panel</button>
        </Link>
      </div>
    )
}