'use client';

import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-charcoal-800">
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me and my expertise"
        />

        <AnimatedElement>
          <div className="max-w-6xl mx-auto glass-card p-6 md:p-8 border border-white/20 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              {/* Left: Image */}
              <div className="md:col-span-2">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg ring-2 ring-teal-500/30">
                  <Image
                    src="/images/profile.jpg"
                    alt="Arunpandian C"
                    width={500}
                    height={500}
                    className="object-cover" 
                    priority
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div className="md:col-span-3 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-2xl">Arunpandian C</h3>
                  <p className="text-teal-600 dark:text-teal-400">Full Stack Developer</p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  An aspiring full-stack developer with a strong foundation in front-end and back-end technologies.
                  I have a passion for building responsive, scalable, and user-focused web applications.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I am committed to writing clean, efficient code and continuously learning new tools and frameworks.
                  My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side
                  logic to drive functionality, performance, and user satisfaction.
                </p>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
