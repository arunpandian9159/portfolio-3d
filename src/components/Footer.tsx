'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp, Sparkles, Code2 } from 'lucide-react';
import {
  GradientText,
  MagneticButton,
  FloatingElement,
  RevealOnScroll,
  ShinyText,
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

          {/* Quote section */}
          <RevealOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 border border-teal-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Code2 className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  <ShinyText text="Building the future, one line of code at a time" speed={5} />
                </span>
                <Sparkles className="w-4 h-4 text-teal-500" />
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Social Links with enhanced hover effects */}
          <RevealOnScroll direction="up" delay={0.3}>
            <div className="flex justify-center gap-5 mb-10">
              {socialLinks.map((social, index) => (
                <MagneticButton key={social.label} strength={0.25}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group relative p-4 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-md hover:shadow-xl border border-gray-200/80 dark:border-gray-700/50 transition-all duration-300 overflow-hidden"
                    aria-label={social.label}
                  >
                    {/* Hover background effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${social.color}10, ${social.color}20)`,
                      }}
                    />
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        border: `2px solid ${social.color}40`,
                      }}
                    />
                    <social.icon
                      className="w-6 h-6 relative z-10 transition-colors duration-300 group-hover:text-teal-500 dark:group-hover:text-teal-400"
                    />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </RevealOnScroll>

          {/* Copyright with animated heart */}
          <RevealOnScroll direction="up" delay={0.4}>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center justify-center gap-2">
                <span>&copy; {new Date().getFullYear()}</span>
                <GradientText
                  colors={['#14b8a6', '#06b6d4', '#14b8a6']}
                  animationSpeed={4}
                  className="font-semibold"
                >
                  Arunpandian C
                </GradientText>
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
                >
                  🇮🇳
                </motion.span>
              </p>

              {/* Tech stack badges */}
              <motion.div
                className="mt-4 flex flex-wrap items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {['Next.js', 'React', 'Tailwind', 'Framer Motion'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-md"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </footer>
  );
}
