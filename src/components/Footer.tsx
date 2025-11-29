'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/arunpandian9159', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arunpandian-c/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:arunpandiancse25@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-100 to-white dark:from-charcoal-800 dark:to-charcoal-700 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container-custom">
        <div className="py-12">
          {/* Back to top button */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group p-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 shadow-sm hover:shadow-md border border-gray-200/80 dark:border-gray-700/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
              <span>&copy; {new Date().getFullYear()} Arunpandian C.</span>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
