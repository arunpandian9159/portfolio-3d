'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Code2, Zap, Heart } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  RevealOnScroll,
  TiltedCard,
  SpotlightCard,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/ReactBits';
 
const aboutStats = [
  { icon: Code2, label: 'Projects', value: '6+' },
  { icon: Zap, label: 'Technologies', value: '10+' },
  { icon: Heart, label: 'Happy Clients', value: '5+' },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-charcoal-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
          duration={8}
          distance={30}
        />
        <FloatingElement
          className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/5 to-teal-400/5 blur-2xl"
          duration={6}
          distance={20}
          delay={2}
        />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me and my expertise"
        />

        <RevealOnScroll direction="up" delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <SpotlightCard
              className="glass-card p-6 md:p-10 border border-white/20 dark:border-white/10 rounded-2xl"
              spotlightColor="rgba(20, 184, 166, 0.08)"
              spotlightSize={400}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                {/* Left: Image with Tilt Effect */}
                <div className="lg:col-span-2">
                  <RevealOnScroll direction="left" delay={0.2}>
                    <TiltedCard
                      tiltStrength={10}
                      glareEnabled={true}
                      perspective={1200}
                      className="group"
                    >
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-2 ring-teal-500/30 group-hover:ring-teal-500/50 transition-all duration-500">
                        <Image
                          src="/images/profile.jpg"
                          alt="Arunpandian C"
                          width={500}
                          height={500}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Decorative corner accents */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-teal-400/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-teal-400/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </TiltedCard>
                  </RevealOnScroll>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3 space-y-6">
                  <RevealOnScroll direction="right" delay={0.3}>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-3xl md:text-4xl mb-2">
                        Arunpandian C
                      </h3>
                      <p className="text-teal-600 dark:text-teal-400 font-medium text-lg">Full Stack Developer</p>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll direction="right" delay={0.4}>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                        An aspiring full-stack developer with a strong foundation in front-end and back-end technologies. I have a passion for building responsive, scalable, and user-focused web applications.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                        I am committed to writing clean, efficient code and continuously learning new tools and frameworks.
                        My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side
                        logic to drive functionality, performance, and user satisfaction.
                      </p>
                    </div>
                  </RevealOnScroll>

                  {/* Stats Grid */}
                  <StaggerContainer className="grid grid-cols-3 gap-4 pt-4" staggerDelay={0.15} delayStart={0.5}>
                    {aboutStats.map((stat, index) => (
                      <StaggerItem key={stat.label}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="text-center p-4 rounded-xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 border border-teal-500/10 dark:border-teal-400/20 hover:border-teal-500/30 transition-all duration-300"
                        >
                          <stat.icon className="w-6 h-6 mx-auto mb-2 text-teal-500 dark:text-teal-400" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
