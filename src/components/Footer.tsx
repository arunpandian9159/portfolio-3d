'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp, Sparkles, Code2 } from 'lucide-react';
import {
  MagneticButton,
  FloatingElement,
  RevealOnScroll,
} from '@/components/ui/ReactBits';

const socialLinks = [
  { icon: Github, href: 'https://github.com/arunpandian9159', label: 'GitHub', color: '#333' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arunpandian-c/', label: 'LinkedIn', color: '#0077b5' },
  { icon: Mail, href: 'mailto:arunpandiancse25@gmail.com', label: 'Email', color: '#ea4335' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-100 to-white dark:from-charcoal-800 dark:to-charcoal-700 border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-2xl"
          duration={8}
          distance={15}
        />
        <FloatingElement
          className="absolute bottom-10 right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/5 to-teal-400/5 blur-xl"
          duration={6}
          distance={10}
          delay={2}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="py-12">
          {/* Back to top button with magnetic effect */}
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="flex justify-center mb-10">
              <MagneticButton strength={0.3}>
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </MagneticButton>
            </div>
          </RevealOnScroll>

          {/* Copyright with animated heart */}
          <RevealOnScroll direction="up" delay={0.4}>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center justify-center gap-2">
                <span>&copy; {new Date().getFullYear()}</span>
                <span className="font-semibold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Arunpandian C
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="flex items-center gap-1.5">
                  Made with
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </motion.span>
                  in India
                </span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center"
                >
                  <img
                    src="https://flagcdn.com/w40/in.png"
                    alt="India Flag"
                    className="w-5 h-auto rounded-sm shadow-sm"
                  />
                </motion.span>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </footer>
  );
}
