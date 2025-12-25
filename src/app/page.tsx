'use client';

import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import LazySection from '@/components/LazySection';

// Dynamic imports for below-the-fold sections - reduces initial bundle
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
});

const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50 dark:bg-gray-900" />,
});

const Education = dynamic(() => import('@/components/sections/Education'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50 dark:bg-gray-900" />,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50 dark:bg-gray-900" />,
});

export default function Home() {
  return (
    <Layout>
      {/* Hero loads immediately - above the fold */}
      <Hero />

      {/* Below-the-fold sections lazy load when near viewport */}
      <LazySection rootMargin="200px">
        <About />
      </LazySection>

      <LazySection rootMargin="200px">
        <Skills />
      </LazySection>

      <LazySection rootMargin="200px">
        <Education />
      </LazySection>

      <LazySection rootMargin="200px">
        <Projects />
      </LazySection>

      <LazySection rootMargin="200px">
        <Experience />
      </LazySection>
 
      <LazySection rootMargin="200px">
        <Contact />
      </LazySection>
    </Layout>
  );
}

