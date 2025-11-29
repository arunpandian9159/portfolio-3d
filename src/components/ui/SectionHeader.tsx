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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          <span className="inline-block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500" />
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500" />
        </div>
        {subtitle && (
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
