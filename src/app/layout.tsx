import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({ subsets: ['latin'] });  

export const metadata: Metadata = {
  title: 'Arunpandian C - Full Stack Developer',
  description: 'Portfolio of Arunpandian C, an aspiring full-stack developer with expertise in frontend and backend technologies.',
  keywords: ['Full Stack Developer', 'React', 'Python', 'JavaScript', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Arunpandian C' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Arunpandian C - Full Stack Developer',
    description: 'Portfolio of Arunpandian C, an aspiring full-stack developer with expertise in frontend and backend technologies.',
    type: 'website',
    locale: 'en_US',
  },  
  twitter: {
    card: 'summary_large_image',
    title: 'Arunpandian C - Full Stack Developer',
    description: 'Portfolio of Arunpandian C, an aspiring full-stack developer with expertise in frontend and backend technologies.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
