'use client';

import { motion } from 'framer-motion';
import { experienceItems } from '@/data/portfolio';
import { ExperienceItem } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader'; 
import AnimatedElement from '@/components/ui/AnimatedElement';
import Icon from '@/components/ui/Icon';
import { CheckCircle2 } from 'lucide-react';
 
 function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  return (
    <AnimatedElement delay={index * 150}>
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -8,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-card p-6 text-center h-full group border border-white/20 dark:border-white/10 hover:shadow-xl hover:shadow-teal-500/10"
      >
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon
            name={experience.iconName}
            className="w-7 h-7 text-white"
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {experience.title}
        </h3>

        {/* Description or List */}
        {experience.items ? (
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            {experience.items.map((item, itemIndex) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (index * 150 + itemIndex * 100) / 1000
                }}
                className="flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            {experience.description}
          </p>
        )}
      </motion.div>
    </AnimatedElement>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-cream-50 dark:bg-charcoal-700">
      <div className="container-custom">
        <SectionHeader title="Experience & Achievements" />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {experienceItems.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
