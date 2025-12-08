'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award, Calendar } from 'lucide-react';
import { educationItems } from '@/data/portfolio';
import { EducationItem } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  RevealOnScroll,
  SpotlightCard,
  TiltedCard,
  GradientText,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
  BlurText,
} from '@/components/ui/ReactBits';

function TimelineItem({ item, index }: { item: EducationItem; index: number }) {
  const isLast = index === educationItems.length - 1;

  return (
    <StaggerItem>
      <div className="relative flex gap-6 group">
        {/* Timeline Line & Marker */}
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="relative z-10 flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl shadow-lg shadow-teal-500/25 flex items-center justify-center transition-all duration-300"
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </motion.div>

          {!isLast && (
            <motion.div
              className="w-0.5 flex-1 mt-3"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: 'linear-gradient(180deg, #14b8a6 0%, #06b6d4 50%, rgba(6, 182, 212, 0.2) 100%)',
              }}
            />
          )}
        </div>

        {/* Timeline Content */}
        <TiltedCard
          tiltStrength={5}
          glareEnabled={true}
          perspective={1200}
          className="flex-1 mb-8"
        >
          <SpotlightCard
            className="relative glass-card p-6 md:p-8 border border-white/20 dark:border-white/10 group-hover:shadow-xl group-hover:shadow-teal-500/10 transition-all duration-500 rounded-2xl overflow-hidden"
            spotlightColor="rgba(20, 184, 166, 0.1)"
            spotlightSize={300}
          >


            <div className="relative z-10">
              {/* Year and Grade badges */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 text-teal-700 dark:text-teal-300 rounded-full border border-teal-500/20 dark:border-teal-400/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-4 h-4" />
                  {item.year}
                </motion.span>
                <motion.span
                  className="inline-flex items-center gap-2 text-sm font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-5 h-5 text-amber-500" />
                  <GradientText colors={['#f59e0b', '#f97316', '#f59e0b']} animationSpeed={3}>
                    {item.grade}
                  </GradientText>
                </motion.span>
              </div>

              {/* Title with animation */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                <BlurText text={item.title} delay={index * 200} animateBy="words" />
              </h3>

              {/* Institution */}
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2 text-base md:text-lg">
                {item.institution}
              </p>

              {/* Location */}
              <motion.p
                className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <MapPin className="w-4 h-4" />
                {item.location}
              </motion.p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-teal-500/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </SpotlightCard>
        </TiltedCard>
      </div>
    </StaggerItem>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-padding bg-gradient-to-b from-cream-50 to-white dark:from-charcoal-700 dark:to-charcoal-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-20 right-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
          duration={12}
          distance={40}
        />
        <FloatingElement
          className="absolute bottom-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/5 to-teal-400/5 blur-3xl"
          duration={10}
          distance={30}
          delay={2}
        />

        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="edu-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#edu-dots)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <RevealOnScroll direction="up">
          <SectionHeader
            title="Education"
            subtitle="My academic journey and qualifications"
          />
        </RevealOnScroll>

        <StaggerContainer
          className="max-w-3xl mx-auto"
          staggerDelay={0.2}
          delayStart={0.1}
        >
          {educationItems.map((item, index) => (
            <TimelineItem
              key={`${item.year}-${item.title}`}
              item={item}
              index={index}
            />
          ))}
        </StaggerContainer>

        {/* Bottom decorative element */}
        <RevealOnScroll direction="up" delay={0.8}>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.div>
              <GradientText
                colors={['#14b8a6', '#06b6d4', '#14b8a6']}
                animationSpeed={4}
                className="text-sm font-medium"
              >
                Continuous Learner
              </GradientText>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
