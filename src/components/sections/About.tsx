'use client';

import { motion } from 'framer-motion';
import { Code2, Layers, Wrench, Users } from 'lucide-react';
import { skillCategories } from '@/data/portfolio';
import { SkillCategory } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';

// Icon mapping for skill categories
const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Code2 className="w-5 h-5" />,
  'Backend': <Layers className="w-5 h-5" />,
  'Tools & Platforms': <Wrench className="w-5 h-5" />,
  'Soft Skills': <Users className="w-5 h-5" />,
};

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <AnimatedElement delay={index * 100}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-card p-5 h-full border border-white/20 dark:border-white/10 group hover:shadow-lg hover:shadow-teal-500/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
            {categoryIcons[category.title] || <Code2 className="w-5 h-5" />}
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {category.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: (index * 100 + skillIndex * 50) / 1000
              }}
              className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 text-teal-700 dark:text-teal-300 rounded-lg border border-teal-500/20 dark:border-teal-400/30"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatedElement>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-charcoal-800">
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me and my expertise"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* About Text */}
          <AnimatedElement>
            <div className="glass-card p-8 border border-white/20 dark:border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg text-white text-xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Arunpandian C</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                An aspiring full-stack developer with a strong foundation in front-end and back-end technologies.
                I have a passion for building responsive, scalable, and user-focused web applications.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I am committed to writing clean, efficient code and continuously learning new tools and frameworks.
                My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side
                logic to drive functionality, performance, and user satisfaction.
              </p>
            </div>
          </AnimatedElement>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
