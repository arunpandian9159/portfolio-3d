'use client';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-700 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  ); 
}
 