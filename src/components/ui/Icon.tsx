'use client';

import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

// Type-safe icon component that renders Lucide icons by name
export default function Icon({ name, ...props }: IconProps) {
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as unknown as Record<string, ComponentType<LucideProps>>)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <IconComponent {...props} />;
}

// Pre-defined icon sets for common use cases
export const skillIcons: Record<string, string> = {
  HTML5: 'Globe',
  CSS3: 'Palette',
  JavaScript: 'Zap',
  'Tailwind CSS': 'Wind',
  Python: 'Terminal',
  Git: 'GitBranch',
  GitHub: 'Github',
  'VS Code': 'Code2',
  Postman: 'Send',
  Vercel: 'Triangle',
  Cursor: 'MousePointer',
  'Problem Solving': 'Puzzle',
  Communication: 'MessageCircle',
  'Team Collaboration': 'Users',
  Adaptability: 'RefreshCw',
};

export const contactIcons: Record<string, string> = {
  Phone: 'Phone',
  Email: 'Mail',
  LinkedIn: 'Linkedin',
  GitHub: 'Github',
};

export const experienceIcons: Record<string, string> = {
  Internship: 'Briefcase',
  Certificates: 'Award',
  Achievements: 'Target',
  Activities: 'Star',
};

