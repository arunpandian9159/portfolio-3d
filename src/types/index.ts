export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SkillWithIcon {
  name: string;
  iconName: string;
  category: string;
  color: string;
}

export interface EducationItem {
  year: string;
  title: string;
  institution: string;
  location: string;
  grade: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  teamSize: number;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  iconName: string;
  title: string;
  description: string;
  items?: string[];
}

export interface ContactInfo {
  iconName: string;
  title: string;
  value: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface FloatingShape {
  id: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  animationDelay: number;
  animationDuration: number;
}

export interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export interface TimelineItemProps {
  item: EducationItem;
  index: number;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

export interface ContactItemProps {
  contact: ContactInfo;
  index: number;
}

export interface SkillCategoryProps {
  category: SkillCategory;
  index: number;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
}

export interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface UseScrollPositionReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down';
}

export interface UseTypingAnimationReturn {
  displayText: string;
  isTyping: boolean;
  currentIndex: number;
}
