'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import {
  SplitText,
  BlurText,
  MorphingText,
  MagneticButton,
  Orb,
  RevealOnScroll,
  ShinyText,
} from '@/components/ui/ReactBits';

const typingTexts = [
  'Full Stack Developer',
  'Python Developer',
  'Frontend Developer',
  'Problem Solver',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-gray-50 to-gray-100 dark:from-charcoal-700 dark:via-charcoal-800 dark:to-slate-900">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white-100">
            ARUNPANDIAN C
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Orb Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-gray-50 to-gray-100 dark:from-charcoal-700 dark:via-charcoal-800 dark:to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-[800px] max-h-[800px]">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={160}
              forceHoverState={false}
            />
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-black/30 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* Greeting Badge */}
        <RevealOnScroll direction="up" delay={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-400 animate-pulse" />
            <ShinyText
              text="Welcome to my portfolio"
              className="text-sm font-medium text-teal-700 dark:text-teal-300"
              speed={4}
            />
          </motion.div>
        </RevealOnScroll>

        {/* Name with Split Text Animation */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <BlurText
              text="Hi, I'm "
              className="text-gray-900 dark:text-gray-100"
              delay={0.3}
              animateBy="chars"
            />
            <span
              className="font-extrabold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]"
              style={{
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              <SplitText
                text="Arunpandian"
                delay={600}
                staggerDuration={0.05}
                animationFrom={{ opacity: 0, transform: 'translateY(40px) rotateX(-90deg)' }}
                animationTo={{ opacity: 1, transform: 'translateY(0) rotateX(0deg)' }}
                charClassName="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent"
              />
            </span>
          </h1>
        </div>

        {/* Morphing Role Text */}
        <RevealOnScroll direction="up" delay={0.5}>
          <div className="mb-8">
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 h-[1.5em] flex items-center justify-center">
              <span className="mr-2">I&apos;m a</span>
              <MorphingText
                texts={typingTexts}
                className="text-teal-600 dark:text-teal-400 font-bold"
                morphDuration={0.8}
                pauseDuration={2.5}
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Description with Blur Text */}
        <RevealOnScroll direction="up" delay={0.6}>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            <BlurText
              text="Passionate about building responsive, scalable, and user-focused web applications with clean, efficient code."
              delay={800}
              animateBy="words"
              direction="bottom"
            />
          </p>
        </RevealOnScroll>

        {/* CTA Buttons with Magnetic Effect */}
        <RevealOnScroll direction="up" delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton strength={0.2}>
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                className="w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Button
                variant="outline"
                size="lg"
                href="#contact"
                className="w-full sm:w-auto group"
              >
                <span>Get In Touch</span>
              </Button>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <motion.span
          className="text-xs font-medium uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
