import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Sorry, we couldn t find the page you are looking for.
        </p>
        <div className="mt-6">
          <Link href="/" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Return Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
