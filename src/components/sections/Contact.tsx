'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, ArrowRight } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';
import { ContactInfo, ContactFormData } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon'; 
import { useNotificationContext } from '@/components/NotificationProvider'; 

function ContactItem({ contact, index }: { contact: ContactInfo; index: number }) {
  return (
    <AnimatedElement delay={index * 100}>
      <motion.a
        href={contact.href}
        target={contact.href.startsWith('http') ? '_blank' : undefined}
        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{
          scale: 1.02,
          x: 8
        }}
        className="glass-card p-5 flex items-center gap-4 group border border-white/20 dark:border-white/10 hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-teal-500/25 transition-all duration-300">
          <Icon
            name={contact.iconName}
            className="w-5 h-5 text-white"
            strokeWidth={2}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">
            {contact.title}
          </h3>
          <p className="text-teal-600 dark:text-teal-400 text-sm truncate group-hover:underline underline-offset-2">
            {contact.value}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 dark:group-hover:text-teal-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
      </motion.a>
    </AnimatedElement>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      showNotification('Message sent successfully! I will get back to you soon.', 'success');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-charcoal-800">
      <div className="container-custom">
        <SectionHeader title="Get In Touch" />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((contact, index) => (
              <ContactItem
                key={contact.title}
                contact={contact}
                index={index}
              />
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedElement delay={200}>
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
                
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
                
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
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
