'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Moon, Sun, Menu, X, Home, User, Wrench, GraduationCap, FolderOpen, Briefcase, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { navItems } from '@/data/portfolio';
import { NavItem } from '@/types';
import { MagneticButton } from '@/components/ui/ReactBits';

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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
        ? 'bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-gray-700/50'
        : 'bg-white/60 dark:bg-charcoal-800/60 backdrop-blur-lg border-b border-transparent'
        }`}
    > 
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Magnetic Effect */}
          <MagneticButton strength={0.15}>
            <motion.button
              onClick={() => handleNavClick('#hero')}
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg will-change-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="sr-only">Go to hero</span>
              <div className="flex items-center gap-2">
                <motion.div
                  className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-teal-500/30 shadow-lg hover:ring-teal-500/50 will-change-transform"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(20, 184, 166, 0.4)',
                      '0 0 15px rgba(20, 184, 166, 0.3)',
                      '0 0 0 rgba(20, 184, 166, 0.4)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  <Image src="/icon-144.png" alt="Logo" fill className="object-cover" priority />
                </motion.div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                    Arunpandian
                  </span>
                </div>
              </div>
            </motion.button>
          </MagneticButton>

          {/* Desktop Navigation with Enhanced Styling */}
          <div className="hidden md:block">
            <div className="relative flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-full p-1.5 backdrop-blur-sm overflow-hidden will-change-auto">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(90deg, rgba(20, 184, 166, 0.05) 0%, transparent 50%, rgba(6, 182, 212, 0.05) 100%)',
                    'linear-gradient(90deg, rgba(6, 182, 212, 0.05) 0%, transparent 50%, rgba(20, 184, 166, 0.05) 100%)',
                    'linear-gradient(90deg, rgba(20, 184, 166, 0.05) 0%, transparent 50%, rgba(6, 182, 212, 0.05) 100%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {navItems.map((item: NavItem, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <MagneticButton key={item.href} strength={0.1}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-out ${isActive
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full will-change-transform"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                            mass: 0.8,
                            restDelta: 0.001
                          }}
                        >
                          {/* Shimmer effect on active */}
                          <motion.div
                            className="absolute inset-0 rounded-full opacity-50"
                            animate={{
                              background: [
                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                              ],
                              backgroundPosition: ['200% 0', '-200% 0'],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                            style={{ backgroundSize: '200% 100%' }}
                          />
                        </motion.div>
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.08, type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            {navIcons[item.label]}
                          </motion.span>
                        )}
                        {item.label}
                      </span>
                    </button>
                  </MagneticButton>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle with Enhanced Animation */}
            <MagneticButton strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm overflow-hidden will-change-transform"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: theme === 'dark'
                      ? '0 0 15px rgba(250, 204, 21, 0.3)'
                      : '0 0 15px rgba(99, 102, 241, 0.3)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />

                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.8 }}
                    >
                      <Moon className="w-5 h-5 relative z-10" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.8 }}
                    >
                      <Sun className="w-5 h-5 relative z-10" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm will-change-transform"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with Enhanced Animations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.25 }
              }}
              className="md:hidden overflow-hidden will-change-auto"
            >
              <div className="px-3 pt-3 pb-4 space-y-1 border-t border-gray-200/50 dark:border-gray-700/50" role="menu">
                {navItems.map((item: NavItem, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04,
                        type: 'spring',
                        stiffness: 350,
                        damping: 25
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className={`relative flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150 ease-out overflow-hidden will-change-transform ${isActive
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            ],
                            backgroundPosition: ['200% 0', '-200% 0'],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                          style={{ backgroundSize: '200% 100%' }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {navIcons[item.label]}
                      </span>
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="ml-auto relative z-10"
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.span>
                      )}
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
