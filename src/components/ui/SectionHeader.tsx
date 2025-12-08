'use client';

import { motion } from 'framer-motion';
import { SectionHeaderProps } from '@/types';
import { cn } from '@/utils/cn';
import { SplitText, GradientText, BlurText } from '@/components/ui/ReactBits';

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title with animated gradient */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          <GradientText
            colors={['#1f2937', '#374151', '#1f2937']}
            animationSpeed={5}
            className="dark:hidden"
          >
            <SplitText
              text={title}
              delay={100}
              staggerDuration={0.04}
              animationFrom={{ opacity: 0, transform: 'translateY(20px)' }}
              animationTo={{ opacity: 1, transform: 'translateY(0)' }}
            />
          </GradientText>
          <GradientText
            colors={['#f3f4f6', '#e5e7eb', '#f3f4f6']}
            animationSpeed={5}
            className="hidden dark:inline-block"
          >
            <SplitText
              text={title}
              delay={100}
              staggerDuration={0.04}
              animationFrom={{ opacity: 0, transform: 'translateY(20px)' }}
              animationTo={{ opacity: 1, transform: 'translateY(0)' }}
            />
          </GradientText>
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
          >
            {/* Pulsing effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-teal-500"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.div
            className="h-px bg-gradient-to-l from-transparent to-teal-500"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Subtitle with blur animation */}
        {subtitle && (
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            <BlurText
              text={subtitle}
              delay={400}
              animateBy="words"
              direction="bottom"
            />
          </p>
        )}
      </motion.div>
    </div>
  );
}
