'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillsWithIcons } from '@/data/portfolio';
import { SkillWithIcon } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Icon from '@/components/ui/Icon';

function SkillCard({ skill, index }: { skill: SkillWithIcon; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setMousePosition({
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <AnimatedElement delay={index * 100}>
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          className="glass-card p-6 h-full text-center relative overflow-hidden border border-white/20 dark:border-white/10"
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: isHovered ? -mousePosition.y : 0,
            rotateY: isHovered ? mousePosition.x : 0,
            translateZ: isHovered ? 30 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Background gradient effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-xl`}
          />

          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300`}
            style={{ transform: 'translateZ(-10px)' }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`mb-4 transform-gpu flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg`}
              animate={{
                rotateY: isHovered ? mousePosition.x * 2 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icon
                name={skill.iconName}
                className="w-8 h-8 text-white drop-shadow-sm"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Skill Name */}
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
              {skill.name}
            </h3>

            {/* Category */}
            <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
              {skill.category}
            </p>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            animate={{
              x: isHovered ? '200%' : '-100%',
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatedElement>
  );
}

export default function Skills() {
  const categories = ['Frontend', 'Backend', 'Tools', 'Soft Skills'];

  return (
    <section id="skills" className="section-padding bg-cream-50 dark:bg-charcoal-700">
      <div className="container-custom">
        <SectionHeader 
          title="Skills & Technologies" 
          subtitle="Technologies and tools I work with to bring ideas to life"
        />
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {skillsWithIcons.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
            />
          ))}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-4 py-2 bg-white dark:bg-charcoal-800 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {category}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
