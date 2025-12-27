import Link from 'next/link';
 
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-gray-50 to-gray-100 dark:from-charcoal-700 dark:via-charcoal-800 dark:to-slate-900">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-teal-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link 
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
