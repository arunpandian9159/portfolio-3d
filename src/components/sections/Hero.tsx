'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { typingTexts } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import FloatingShapes from '@/components/ui/FloatingShapes';

export default function Hero() {
  const { displayText } = useTypingAnimation({
    texts: typingTexts,
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-gray-50 to-gray-100 dark:from-charcoal-700 dark:via-charcoal-800 dark:to-slate-900">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100">
            ARUNPANDIAN C
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-gray-50 to-gray-100 dark:from-charcoal-700 dark:via-charcoal-800 dark:to-slate-900"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-black/30 pointer-events-none" />

      {/* Floating Shapes Background */}
      <FloatingShapes />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-400" />
          <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Welcome to my portfolio</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight"
        >
          <span className="inline-block">Hi, I&apos;m</span>{' '}
          <span className="inline-block bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 dark:from-teal-400 dark:via-teal-500 dark:to-cyan-500 bg-clip-text text-transparent">
            Arunpandian
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            <span className="inline-block min-h-[1.4em] min-w-[280px]">
              {displayText}
              <span className="animate-blink text-teal-500 dark:text-teal-400 font-light">|</span>
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Passionate about building responsive, scalable, and user-focused web applications with clean, efficient code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="primary"
            size="lg"
            href="#projects"
            className="w-full sm:w-auto group"
          >
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="#contact"
            className="w-full sm:w-auto"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <span className="text-xs font-medium uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">Scroll</span>
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
