'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { educationItems } from '@/data/portfolio';
import { EducationItem } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';

function TimelineItem({ item, index }: { item: EducationItem; index: number }) {
  const isLast = index === educationItems.length - 1;

  return ( 
    <AnimatedElement delay={index * 200}>
      <div className="relative flex gap-6 group"> 
        {/* Timeline Line & Marker */}
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative z-10 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg shadow-teal-500/25 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-teal-500/30 transition-all duration-300"
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </motion.div>
          {!isLast && (
            <div className="w-0.5 flex-1 bg-gradient-to-b from-teal-500 to-teal-200 dark:from-teal-400 dark:to-teal-800 mt-2"></div>
          )}
        </div>

        {/* Timeline Content */}
        <motion.div
          whileHover={{ x: 8 }}
          className="flex-1 glass-card p-6 border border-white/20 dark:border-white/10 mb-8 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 text-teal-700 dark:text-teal-300 rounded-full border border-teal-500/20 dark:border-teal-400/30">
              📅 {item.year}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
              <Award className="w-4 h-4" />
              {item.grade}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {item.title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">
            {item.institution}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {item.location}
          </p>
        </motion.div>
      </div>
    </AnimatedElement>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-padding bg-gradient-to-b from-cream-50 to-white dark:from-charcoal-700 dark:to-charcoal-800">
      <div className="container-custom">
        <SectionHeader
          title="Education"
          subtitle="My academic journey and qualifications"
        />

        <div className="max-w-3xl mx-auto">
          {educationItems.map((item, index) => (
            <TimelineItem
              key={`${item.year}-${item.title}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
