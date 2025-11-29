'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Moon, Sun, Menu, X, Home, User, Wrench, GraduationCap, FolderOpen, Briefcase, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { navItems } from '@/data/portfolio';
import { NavItem } from '@/types';

// Icon mapping for nav items
const navIcons: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  About: <User className="w-4 h-4" />,
  Skills: <Wrench className="w-4 h-4" />,
  Education: <GraduationCap className="w-4 h-4" />,
  Projects: <FolderOpen className="w-4 h-4" />,
  Experience: <Briefcase className="w-4 h-4" />,
  Contact: <Mail className="w-4 h-4" />,
};

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        const sectionId = section.getAttribute('id');

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    setIsMobileMenuOpen(false);
  };

  const isScrolled = scrollY > 50;

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-teal-500/30">
                  <Image src="/icon-144.png" alt="Logo" fill className="object-cover" priority />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Arunpandian</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/60 dark:bg-charcoal-800/60 backdrop-blur-lg border-b border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('#hero')}
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Go to hero</span>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-teal-500/30">
                <Image src="/icon-144.png" alt="Logo" fill className="object-cover" priority />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Arunpandian</span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-full p-1.5 backdrop-blur-sm">
              {navItems.map((item: NavItem) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-3 pt-3 pb-4 space-y-1 border-t border-gray-200/50 dark:border-gray-700/50" role="menu">
                {navItems.map((item: NavItem, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      <span className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                        {navIcons[item.label]}
                      </span>
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
