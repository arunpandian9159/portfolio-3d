'use client';

import { motion } from 'framer-motion';
import { experienceItems } from '@/data/portfolio';
import { ExperienceItem } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import Icon from '@/components/ui/Icon';
import { CheckCircle2, Sparkles } from 'lucide-react';
import {
  RevealOnScroll,
  TiltedCard,
  SpotlightCard,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from '@/components/ui/ReactBits';

// Color mapping for each experience type
const experienceColors: Record<string, { from: string; to: string }> = {
  'Internship': { from: '#14b8a6', to: '#06b6d4' },
  'Certificates': { from: '#f59e0b', to: '#f97316' },
  'Achievements': { from: '#8b5cf6', to: '#a855f7' },
  'Activities': { from: '#ec4899', to: '#f43f5e' },
};

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const colors = experienceColors[experience.title] || { from: '#14b8a6', to: '#06b6d4' };

  return (
    <StaggerItem>
      <TiltedCard
        tiltStrength={10}
        glareEnabled={true}
        perspective={1000}
        className="h-full"
      >
        <SpotlightCard
          className="relative glass-card p-6 md:p-8 text-center h-full group border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden"
          spotlightColor={`${colors.from}15`}
          spotlightSize={300}
        >


          <div className="relative z-10">
            {/* Icon with gradient and animation */}
            <motion.div
              className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                boxShadow: `0 8px 32px ${colors.from}40`,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                boxShadow: `0 12px 40px ${colors.from}50`,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon
                name={experience.iconName}
                className="w-8 h-8 text-white"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold mb-4 transition-colors">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                }}
              >
                {experience.title}
              </span>
            </h3>

            {/* Description or List */}
            {experience.items ? (
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                {experience.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: itemIndex * 0.15
                    }}
                    className="flex items-center justify-center gap-2 group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: colors.from }}
                      />
                    </motion.div>
                    <span className="group-hover/item:text-gray-900 dark:group-hover/item:text-gray-200 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {experience.description}
              </motion.p>
            )}
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg"
              style={{ borderColor: `${colors.from}40` }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-lg"
              style={{ borderColor: `${colors.to}40` }}
            />
          </div>
        </SpotlightCard>
      </TiltedCard>
    </StaggerItem>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-cream-50 dark:bg-charcoal-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
          duration={10}
          distance={35}
        />
        <FloatingElement
          className="absolute top-1/2 right-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/5 to-pink-400/5 blur-3xl"
          duration={8}
          distance={25}
          delay={2}
        />
        <FloatingElement
          className="absolute bottom-10 left-1/3 w-56 h-56 rounded-full bg-gradient-to-br from-amber-400/5 to-orange-400/5 blur-3xl"
          duration={12}
          distance={30}
          delay={4}
        />
      </div>

      <div className="container-custom relative z-10">
        <RevealOnScroll direction="up">
          <SectionHeader title="Experience & Achievements" />
        </RevealOnScroll>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.15}
          delayStart={0.1}
        >
          {experienceItems.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
            />
          ))}
        </StaggerContainer>

        {/* Stats section */}
        <RevealOnScroll direction="up" delay={0.6}>
          <div className="mt-16 max-w-4xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { value: 1, suffix: '+', label: 'Internship' },
                { value: 3, suffix: '+', label: 'Certifications' },
                { value: 2, suffix: '+', label: 'Projects' },
                { value: 5, suffix: '+', label: 'Activities' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* Bottom decoration */}
        <RevealOnScroll direction="up" delay={0.8}>
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 border border-teal-500/20 dark:border-teal-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" />
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Building experience every day
              </span>
            </motion.div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
