'use client';

import { Code2, Layers, Wrench, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';
import { SkillCategory } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  RevealOnScroll,
  TiltedCard,
  SpotlightCard,
  GradientText,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
  BorderBeam,
} from '@/components/ui/ReactBits';

// Icon mapping for skill categories
const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Code2 className="w-6 h-6" />,
  'Backend': <Layers className="w-6 h-6" />,
  'Tools & Platforms': <Wrench className="w-6 h-6" />,
  'Soft Skills': <Users className="w-6 h-6" />,
};

const categoryColors: Record<string, { from: string; to: string }> = {
  'Frontend': { from: '#14b8a6', to: '#06b6d4' },
  'Backend': { from: '#0d9488', to: '#0891b2' },
  'Tools & Platforms': { from: '#0891b2', to: '#0284c7' },
  'Soft Skills': { from: '#0284c7', to: '#14b8a6' },
};

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const colors = categoryColors[category.title] || { from: '#14b8a6', to: '#06b6d4' };

  return (
    <StaggerItem>
      <TiltedCard
        tiltStrength={8}
        glareEnabled={true}
        perspective={1000}
        className="h-full"
      >
        <SpotlightCard
          className="relative glass-card p-6 h-full border border-white/20 dark:border-white/10 group hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 rounded-2xl overflow-hidden"
          spotlightColor="rgba(20, 184, 166, 0.12)"
          spotlightSize={250}
        >
          {/* Animated border beam */}
          <BorderBeam
            size={150}
            duration={12}
            colorFrom={colors.from}
            colorTo={colors.to}
            delay={index * 0.5}
          />

          <div className="relative z-10">
            {/* Icon with gradient background */}
            <motion.div
              className="flex items-center gap-4 mb-5"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg text-white transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {categoryIcons[category.title] || <Code2 className="w-6 h-6" />}
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {category.title}
              </h3>
            </motion.div>

            {/* Skills tags with stagger animation */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: skillIndex * 0.08,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
                  }}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg border cursor-default transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.from}10, ${colors.to}10)`,
                    borderColor: `${colors.from}30`,
                    color: 'inherit',
                  }}
                >
                  <span className="text-teal-700 dark:text-teal-300">
                    {skill}
                  </span>
                </motion.span>
              ))}
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg"
              style={{ borderColor: `${colors.from}40` }}
            />
          </div>
        </SpotlightCard>
      </TiltedCard>
    </StaggerItem>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-cream-50 dark:bg-charcoal-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
          duration={10}
          distance={40}
        />
        <FloatingElement
          className="absolute bottom-10 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/5 to-teal-400/5 blur-3xl"
          duration={8}
          distance={30}
          delay={3}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="skill-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skill-grid)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <RevealOnScroll direction="up">
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Technologies and tools I work with to bring ideas to life"
          />
        </RevealOnScroll>

        {/* Skills Grid using StaggerContainer */}
        <StaggerContainer
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.15}
          delayStart={0.2}
        >
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </StaggerContainer>

        {/* Bottom decorative element */}
        <RevealOnScroll direction="up" delay={0.6}>
          <div className="mt-12 text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 border border-teal-500/20 dark:border-teal-400/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <GradientText
                colors={['#14b8a6', '#06b6d4', '#14b8a6']}
                animationSpeed={3}
                className="text-sm font-semibold"
              >
                Always learning & growing
              </GradientText>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.span>
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
