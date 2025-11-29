'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Users, FolderOpen } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { Project } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';

function ProjectCard({ project, index }: { project: Project; index: number }) {
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

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <AnimatedElement delay={index * 200}>
      <motion.div
        ref={cardRef}
        className="project-card-3d group relative h-full"
        style={{ perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="glass-card p-6 h-full transform-gpu border border-white/20 dark:border-white/10 relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: isHovered ? mousePosition.y : 0,
            rotateY: isHovered ? mousePosition.x : 0,
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(45, 166, 178, 0.25)'
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          {/* Project Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-1">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:text-gray-400 dark:hover:text-teal-400 dark:hover:bg-teal-900/30 transition-all duration-200"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:text-gray-400 dark:hover:text-teal-400 dark:hover:bg-teal-900/30 transition-all duration-200"
                  aria-label="View live project"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Project Description */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 relative z-10 text-sm">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 text-teal-700 dark:text-teal-300 rounded-full border border-teal-500/20 dark:border-teal-400/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Meta */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 relative z-10 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Users className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" />
            <span>Team of {project.teamSize}</span>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
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

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-white dark:bg-charcoal-800">
      <div className="container-custom">
        <SectionHeader title="Projects" />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
