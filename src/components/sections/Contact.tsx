'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowRight, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';
import { ContactInfo, ContactFormData } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useNotificationContext } from '@/components/NotificationProvider';
import {
  RevealOnScroll,
  TiltedCard,
  SpotlightCard,
  GradientText,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  BlurText,
  ParticlesBackground,
} from '@/components/ui/ReactBits';

// Color mapping for contact items
const contactColors: Record<string, { from: string; to: string }> = {
  'Phone': { from: '#22c55e', to: '#16a34a' },
  'Email': { from: '#3b82f6', to: '#2563eb' },
  'LinkedIn': { from: '#0077b5', to: '#00a0dc' },
  'GitHub': { from: '#6e5494', to: '#333333' },
};

function ContactItem({ contact, index }: { contact: ContactInfo; index: number }) {
  const colors = contactColors[contact.title] || { from: '#14b8a6', to: '#06b6d4' };

  return (
    <StaggerItem>
      <TiltedCard
        tiltStrength={8}
        glareEnabled={true}
        perspective={1000}
        className="block"
      >
        <motion.a
          href={contact.href}
          target={contact.href.startsWith('http') ? '_blank' : undefined}
          rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="block"
        >
          <SpotlightCard
            className="relative glass-card p-5 md:p-6 flex items-center gap-4 group border border-white/20 dark:border-white/10 hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-500 rounded-xl overflow-hidden"
            spotlightColor={`${colors.from}12`}
            spotlightSize={250}
          >


            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                boxShadow: `0 8px 24px ${colors.from}30`,
              }}
              whileHover={{ rotate: 5 }}
            >
              <Icon
                name={contact.iconName}
                className="w-6 h-6 text-white"
                strokeWidth={2}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-0.5">
                {contact.title}
              </h3>
              <p className="text-sm truncate group-hover:underline underline-offset-2 transition-all" style={{ color: colors.from }}>
                {contact.value}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight className="w-5 h-5 text-teal-500 dark:text-teal-400" />
            </motion.div>
          </SpotlightCard>
        </motion.a>
      </TiltedCard>
    </StaggerItem>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showNotification } = useNotificationContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSuccess(true);
      showNotification('Message sent successfully! I will get back to you soon.', 'success');

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-charcoal-800 relative overflow-hidden">
      {/* Background decorations */}
      <ParticlesBackground
        className="absolute inset-0"
        particleCount={25}
        particleColor="rgba(20, 184, 166, 0.3)"
      />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement
          className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/5 blur-3xl"
          duration={10}
          distance={35}
        />
        <FloatingElement
          className="absolute bottom-20 left-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/5 to-purple-400/5 blur-3xl"
          duration={8}
          distance={25}
          delay={3}
        />
      </div>

      <div className="container-custom relative z-10">
        <RevealOnScroll direction="up">
          <SectionHeader
            title="Get In Touch"
            subtitle="Let's collaborate and build something amazing together"
          />
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4">
            <RevealOnScroll direction="left" delay={0.1}>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  <GradientText colors={['#14b8a6', '#06b6d4', '#14b8a6']} animationSpeed={4}>
                    Let&apos;s Connect
                  </GradientText>
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <BlurText
                    text="Feel free to reach out through any of these channels. I'm always excited to discuss new projects and opportunities!"
                    delay={0}
                    animateBy="words"
                  />
                </p>
              </div>
            </RevealOnScroll>

            <StaggerContainer staggerDelay={0.12} delayStart={0.2} className="space-y-4">
              {contactInfo.map((contact, index) => (
                <ContactItem
                  key={contact.title}
                  contact={contact}
                  index={index}
                />
              ))}
            </StaggerContainer>

            {/* Additional info */}
            <RevealOnScroll direction="up" delay={0.6}>
              <motion.div
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 border border-teal-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Quick Response Guaranteed
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I typically respond within 24 hours. Looking forward to hearing from you!
                    </p>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>

          {/* Contact Form */}
          <RevealOnScroll direction="right" delay={0.2}>
            <TiltedCard
              tiltStrength={5}
              glareEnabled={true}
              perspective={1200}
            >
              <SpotlightCard
                className="relative card p-8 md:p-10 rounded-2xl overflow-hidden"
                spotlightColor="rgba(20, 184, 166, 0.08)"
                spotlightSize={400}
              >


                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-teal-500" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Send me a message
                    </h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center py-12"
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                        >
                          <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          Message Sent!
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                          Thank you for reaching out. I&apos;ll get back to you soon!
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Input
                            label="Message"
                            type="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Tell me about your project or just say hello!"
                            rows={5}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <MagneticButton strength={0.15}>
                            <Button
                              type="submit"
                              variant="primary"
                              size="lg"
                              disabled={isSubmitting}
                              className="w-full group relative overflow-hidden"
                            >
                              <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                  <motion.span
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center"
                                  >
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sending...
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="send"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center"
                                  >
                                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    Send Message
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </Button>
                          </MagneticButton>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
