'use client';

import { motion } from 'framer-motion';
import { SectionHeaderProps } from '@/types';
import { cn } from '@/utils/cn';

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          {title}
        </h2>

        {/* Animated divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            className="h-px bg-gradient-to-r from-transparent to-teal-500"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
          />
          <motion.div
            className="h-px bg-gradient-to-l from-transparent to-teal-500"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
