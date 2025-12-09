"use client"

import { useState } from "react"
import { ExternalLink, X, Download, Github, ChevronRight, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/ui/SectionHeader"
import {
  RevealOnScroll,
  TiltedCard,
  SpotlightCard,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "@/components/ui/ReactBits"

const projectsData = [
  {
    id: "jez-cabs",
    title: "Jez Cabs Management Platform",
    shortTitle: "Jez Cabs",
    description:
      "A comprehensive, production-ready multi-tenant SaaS platform for B2B cab rental companies. Features fleet management, bookings, driver coordination, maintenance scheduling, and invoicing.",
    tech: ["NestJS", "React", "PostgreSQL", "MongoDB", "TypeScript"],
    teamSize: 1,
    color: { from: "#22c55e", to: "#16a34a" },
    featured: true,
    github: "https://github.com/arunpandian9159/Jez-Cabs-Management-Platform",
    live: "https://jez-cabs-management-frontend.vercel.app/",
  },
  {
    id: "nft-certification",
    title: "NFT Based Certification System",
    shortTitle: "NFT Certification",
    description:
      "A decentralized certification system for digital artwork leveraging NFT technology on the Polygon blockchain. Ensures authenticity, ownership, and provenance tracking.",
    tech: ["JavaScript", "Solidity", "Polygon", "Web3"],
    teamSize: 3,
    color: { from: "#8b5cf6", to: "#6366f1" },
    featured: true,
    github: "https://github.com/arunpandian9159/NFT-PROJECT",
  },
  {
    id: "internbyte",
    title: "Internship Management System",
    shortTitle: "Internbyte",
    description:
      "Internbyte is a comprehensive internship management platform designed to streamline student onboarding, course management, and academic tracking.",
    tech: ["Next.js", "TypeScript", "SQL"],
    teamSize: 4,
    color: { from: "#3b82f6", to: "#2563eb" },
    live: "https://internbyte.com",
  },
  {
    id: "travel-crm",
    title: "Travel Industry CRM Platform",
    shortTitle: "Travel CRM",
    description:
      "A comprehensive Customer Relationship Management system designed specifically for the travel and tourism industry.",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    teamSize: 5,
    color: { from: "#f59e0b", to: "#d97706" },
  },
]

interface ProjectCardProps {
  project: typeof projectsData[0] & { github?: string; live?: string }
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <StaggerItem>
      <TiltedCard
        tiltStrength={8}
        glareEnabled={true}
        perspective={1000}
        className="h-full cursor-pointer"
      >
        <SpotlightCard
          className="h-full rounded-2xl overflow-hidden"
          spotlightColor={`${project.color.from}20`}
          spotlightSize={300}
        >
          <motion.div
            className="relative h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 group"
            onClick={onClick}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >


            {/* Featured badge */}
            {project.featured && (
              <motion.div
                className="absolute top-4 right-4 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              </motion.div>
            )}

            {/* Card header with gradient icon */}
            <div className="relative z-10 mb-4 flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${project.color.from}, ${project.color.to})`,
                }}
              >
                <Github className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="relative z-10 text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + techIndex * 0.1 }}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${project.color.from}15, ${project.color.to}15)`,
                    border: `1px solid ${project.color.from}30`,
                  }}
                >
                  <span className="text-teal-700 dark:text-teal-300">{tech}</span>
                </motion.span>
              ))}
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>Team of {project.teamSize}</span>
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="View Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="View Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live View</span>
                    </a>
                  )}
                </div>
              </div>

              <motion.div
                className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium text-sm"
                whileHover={{ x: 5 }}
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${project.color.from}05, ${project.color.to}05)`,
              }}
            />
          </motion.div>
        </SpotlightCard>
      </TiltedCard>
    </StaggerItem>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <>
      <section id="projects" className="section-padding !pt-1 md:!pt-1 bg-white dark:bg-charcoal-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement
            className="absolute top-20 left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
            duration={12}
            distance={40}
          />
          <FloatingElement
            className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/5 to-pink-400/5 blur-3xl"
            duration={10}
            distance={30}
            delay={3}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll direction="up">
            <SectionHeader
              title="Projects"
              subtitle="Showcasing my latest work and achievements"
            />
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            staggerDelay={0.2}
            delayStart={0.1}
          >
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project.id)}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Project Details
                  </span>
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.button>
                </div>

                {selectedProject === "nft-certification" && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        NFT Based Certification System for Digital Artwork
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        This project presents a decentralized certification system for digital artwork leveraging
                        Non-Fungible Token (NFT) technology on the Polygon blockchain. The system ensures authenticity,
                        ownership verification, and provenance tracking for digital art pieces, providing artists and
                        collectors with a secure and transparent platform for digital art certification.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RevealOnScroll direction="left" delay={0.2}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Conference Presentation</h5>
                          <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-4 mb-4">
                            <Image
                              src="/SRM Conference image.jpg"
                              alt="Conference Presentation"
                              width={400}
                              height={300}
                              className="w-full rounded-lg mb-3"
                            />
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              Presented at the 2nd International Conference on Data Science and Business Systems
                              (ICDSBS 2025) at SRM Institute of Science and Technology, Chennai.
                            </p>
                          </div>
                        </div>
                      </RevealOnScroll>

                      <RevealOnScroll direction="right" delay={0.3}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Certificate of Presentation</h5>
                          <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-4 mb-4">
                            <Image
                              src="/certificate of presentation.png"
                              alt="Certificate of Presentation"
                              width={400}
                              height={300}
                              className="w-full rounded-lg mb-3"
                            />
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              Official certificate recognizing the presentation of the research paper.
                            </p>
                          </div>
                        </div>
                      </RevealOnScroll>
                    </div>

                    <RevealOnScroll direction="up" delay={0.4}>
                      <div>
                        <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Publication Details</h5>
                        <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-6">
                          <div className="space-y-3">
                            <p className="text-gray-700 dark:text-gray-200"><strong>Paper ID:</strong> 622</p>
                            <p className="text-gray-700 dark:text-gray-200"><strong>Conference:</strong> 2nd International Conference on Data Science and Business Systems (ICDSBS 2025)</p>
                            <p className="text-gray-700 dark:text-gray-200"><strong>Venue:</strong> SRM Institute of Science and Technology, Chennai</p>
                            <p className="text-gray-700 dark:text-gray-200"><strong>Date:</strong> 17-18 April 2025</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                              <MagneticButton strength={0.15}>
                                <a
                                  href="https://ieeexplore.ieee.org/document/11031552"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                  <span>View on IEEE Xplore</span>
                                </a>
                              </MagneticButton>
                              <MagneticButton strength={0.15}>
                                <a
                                  href="/622_Final Camera Ready Copy.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                  <Download className="w-5 h-5" />
                                  <span>Download PDF</span>
                                </a>
                              </MagneticButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RevealOnScroll direction="up" delay={0.5}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Technical Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {["JavaScript", "Solidity", "Polygon Blockchain", "NFT", "Smart Contracts", "Web3"].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <Badge variant="secondary" className="bg-teal-500/20 text-teal-700 dark:text-teal-300">
                                  {tech}
                                </Badge>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </RevealOnScroll>

                      <RevealOnScroll direction="up" delay={0.6}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Key Features</h5>
                          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            {[
                              "Decentralized certification system",
                              "NFT-based ownership verification",
                              "Polygon blockchain integration",
                              "Provenance tracking",
                              "Smart contract automation",
                            ].map((feature, i) => (
                              <motion.li
                                key={feature}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                              >
                                <span className="text-teal-500 mt-1">•</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </RevealOnScroll>
                    </div>
                  </motion.div>
                )}

                {selectedProject === "jez-cabs" && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Jez Cabs Management Platform
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        A comprehensive, production-ready multi-tenant SaaS platform designed specifically for B2B cab rental companies.
                        The platform enables businesses to efficiently manage their entire cab rental operations including vehicle fleet
                        management, bookings, driver coordination, maintenance scheduling, and invoicing. Built on a Modular Monolith
                        Architecture, it provides clear separation of concerns with event-driven communication, making it scalable and
                        ready for future microservices extraction when needed.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700">
                          Role: Full Stack Developer
                        </Badge>
                        <a
                          href="https://github.com/arunpandian9159/Jez-Cabs-Management-Platform"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium text-sm transition-colors"
                        >
                          <Github className="w-4 h-4" /> View Source
                        </a>
                        <a
                          href="https://jez-cabs-management-frontend.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      </div>
                    </div>

                    {/* Core Business Features */}
                    <RevealOnScroll direction="up" delay={0.2}>
                      <div>
                        <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Core Business Features</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { module: "Identity & Access", features: "Multi-tenant registration, JWT auth, RBAC" },
                            { module: "Cab Inventory", features: "Fleet CRUD, Status tracking, Document expiry alerts" },
                            { module: "Booking & Rental", features: "Bookings management, Availability checking" },
                            { module: "Driver Management", features: "Driver profiles, License tracking, Assignments" },
                            { module: "GPS & Telematics", features: "Real-time location, Geofencing, Route playback" },
                            { module: "Invoicing", features: "Auto invoice generation, PDF & email delivery" },
                          ].map((item, i) => (
                            <motion.div
                              key={item.module}
                              className="bg-gray-100 dark:bg-white/5 rounded-lg p-3"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                            >
                              <p className="font-semibold text-green-600 dark:text-green-400 text-sm">{item.module}</p>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">{item.features}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RevealOnScroll direction="up" delay={0.3}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Backend Stack</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {["NestJS", "PostgreSQL", "MongoDB", "JWT", "RabbitMQ", "TypeORM", "Swagger"].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.05 }}
                              >
                                <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                                  {tech}
                                </Badge>
                              </motion.span>
                            ))}
                          </div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3 mt-4">Frontend Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {["React 18", "TypeScript", "Vite", "Material-UI", "React Query", "Leaflet"].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                              >
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                                  {tech}
                                </Badge>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </RevealOnScroll>

                      <RevealOnScroll direction="up" delay={0.4}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Security Features</h5>
                          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            {[
                              "JWT token-based authentication",
                              "Password hashing with bcrypt",
                              "Role-based access control (RBAC)",
                              "Multi-tenant data isolation",
                              "Rate limiting on public endpoints",
                              "SQL injection & XSS protection",
                            ].map((feature, i) => (
                              <motion.li
                                key={feature}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                              >
                                <span className="text-green-500 mt-1">🔐</span>
                                <span className="text-sm">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </RevealOnScroll>
                    </div>

                    <RevealOnScroll direction="up" delay={0.5}>
                      <div>
                        <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Architecture & DevOps</h5>
                        <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">Modular Monolith</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Architecture</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">Docker</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Containerization</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">Jest</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Testing</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">ESLint</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Code Quality</p>
                            </div>
                          </div>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <MagneticButton strength={0.15}>
                              <a
                                href="https://github.com/arunpandian9159/Jez-Cabs-Management-Platform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                              >
                                <Github className="w-5 h-5" />
                                <span>View on GitHub</span>
                              </a>
                            </MagneticButton>
                            <MagneticButton strength={0.15}>
                              <a
                                href="https://jez-cabs-management-frontend.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                              >
                                <ExternalLink className="w-5 h-5" />
                                <span>Live Demo</span>
                              </a>
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </motion.div>
                )}

                {selectedProject === "internbyte" && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Internship Management System (Internbyte)
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        Internbyte is a comprehensive internship management platform designed to streamline student
                        onboarding, course management, and academic tracking. It features secure authentication, real-time
                        database integration, and automated certificate generation. The system supports attendance tracking,
                        quizzes, and instructor management with a responsive, mobile-first interface. This project simplifies
                        administrative tasks for colleges and students, enhancing efficiency in internship programs.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700">
                          Role: Frontend Developer
                        </Badge>
                        <a
                          href="https://internbyte.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-sm transition-colors"
                        >
                          Visit Live Site <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RevealOnScroll direction="up" delay={0.2}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Technical Stack</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {["Next.js", "TypeScript", "SQL", "React", "Tailwind CSS"].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                                  {tech}
                                </Badge>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </RevealOnScroll>

                      <RevealOnScroll direction="up" delay={0.3}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Key Features</h5>
                          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            {[
                              "Student onboarding & tracking",
                              "Course & instructor management",
                              "Automated certificate generation",
                              "Secure authentication",
                              "Real-time database integration",
                              "Responsive mobile-first interface",
                            ].map((feature, i) => (
                              <motion.li
                                key={feature}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </RevealOnScroll>
                    </div>
                  </motion.div>
                )}

                {selectedProject === "travel-crm" && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Travel Industry CRM Platform
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        A comprehensive Customer Relationship Management system designed specifically for the travel
                        and tourism industry. It streamlines Quotes management, Leads management, Follow ups, invoice generator,
                        and travel itinerary tracking through an integrated platform. The system enables travel agencies and
                        operators to efficiently manage client relationships, automate workflows, and enhance customer
                        engagement while maintaining centralized access to booking history, preferences, and communication logs.
                      </p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700">
                          Role: Frontend Developer
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RevealOnScroll direction="up" delay={0.2}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Technical Stack</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {["TypeScript", "React", "Modern Web Tech", "Redux", "Tailwind CSS"].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 dark:text-orange-300">
                                  {tech}
                                </Badge>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </RevealOnScroll>

                      <RevealOnScroll direction="up" delay={0.3}>
                        <div>
                          <h5 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">Key Features</h5>
                          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            {[
                              "Quotes & Leads management",
                              "Invoice generator",
                              "Travel itinerary tracking",
                              "Automated workflows",
                              "Centralized booking history",
                              "Customer engagement tools",
                            ].map((feature, i) => (
                              <motion.li
                                key={feature}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                              >
                                <span className="text-orange-500 mt-1">•</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </RevealOnScroll>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
