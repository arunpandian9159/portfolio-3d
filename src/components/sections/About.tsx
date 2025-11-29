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

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* About Text with Profile Image */}
          <AnimatedElement>
            <div className="glass-card p-8 border border-white/20 dark:border-white/10 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg ring-2 ring-teal-500/30">
                  <Image
                    src="/images/profile.jpg"
                    alt="Arunpandian C"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Arunpandian C</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">Full Stack Developer</p>
                </div>
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
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
