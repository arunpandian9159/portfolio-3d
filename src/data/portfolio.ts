import { SkillCategory, EducationItem, Project, ExperienceItem, ContactInfo, NavItem } from '@/types';

export const navItems: NavItem[] = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const typingTexts = [
  'Full Stack Developer',
  'Python Developer',
  'Frontend Developer'
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    skills: ['Python']
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Cursor']
  },
  {
    title: 'Soft Skills',
    skills: ['Problem Solving', 'Communication', 'Team Collaboration', 'Adaptability']
  }
];

// Skills with Lucide icon names for the dedicated skills section
export const skillsWithIcons = [
  { name: 'HTML5', iconName: 'Globe', category: 'Frontend', color: 'from-orange-500 to-red-500' },
  { name: 'CSS3', iconName: 'Palette', category: 'Frontend', color: 'from-blue-500 to-blue-600' },
  { name: 'JavaScript', iconName: 'Zap', category: 'Frontend', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Tailwind CSS', iconName: 'Wind', category: 'Frontend', color: 'from-cyan-500 to-blue-500' },
  { name: 'Python', iconName: 'Terminal', category: 'Backend', color: 'from-green-500 to-blue-500' },
  { name: 'Git', iconName: 'GitBranch', category: 'Tools', color: 'from-orange-600 to-red-600' },
  { name: 'GitHub', iconName: 'Github', category: 'Tools', color: 'from-gray-700 to-gray-900' },
  { name: 'VS Code', iconName: 'Code2', category: 'Tools', color: 'from-blue-600 to-blue-700' },
  { name: 'Postman', iconName: 'Send', category: 'Tools', color: 'from-orange-500 to-orange-600' },
  { name: 'Vercel', iconName: 'Triangle', category: 'Tools', color: 'from-black to-gray-800' },
  { name: 'Cursor', iconName: 'MousePointer', category: 'Tools', color: 'from-purple-500 to-purple-600' },
  { name: 'Problem Solving', iconName: 'Puzzle', category: 'Soft Skills', color: 'from-green-500 to-teal-500' },
  { name: 'Communication', iconName: 'MessageCircle', category: 'Soft Skills', color: 'from-blue-500 to-indigo-500' },
  { name: 'Team Collaboration', iconName: 'Users', category: 'Soft Skills', color: 'from-purple-500 to-pink-500' },
  { name: 'Adaptability', iconName: 'RefreshCw', category: 'Soft Skills', color: 'from-teal-500 to-cyan-500' },
];

export const educationItems: EducationItem[] = [
  {
    year: '2021-2025',
    title: 'Bachelor of Technology in CSE',
    institution: 'Manakula Vinayagar Institute of Technology',
    location: 'Puducherry',
    grade: 'CGPA: 7.6'
  },
  {
    year: '2020-2021',
    title: 'Higher Secondary Course (HSC)',
    institution: 'Amalorpavam Higher Secondary School',
    location: 'Puducherry',
    grade: 'Percentage: 87%'
  },
  {
    year: '2018-2019',
    title: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Amalorpavam Higher Secondary School',
    location: 'Puducherry',
    grade: 'Percentage: 82%'
  }
];

export const projects: Project[] = [
  {
    title: 'Vehicle Detection & Identification',
    description: 'The project is designed to detect and identify vehicles. It is also used for security purposes by detecting the vehicle\'s number plate.',
    technologies: ['Python'],
    teamSize: 3
  },
  {
    title: 'NFT Certification System',
    description: 'A decentralized certification system for digital artwork that uses NFT technology on the Polygon blockchain. The platform ensures authenticity, ownership, and provenance tracking of digital art with tamper-proof NFT certificates.',
    technologies: ['JavaScript', 'Solidity'],
    teamSize: 3
  }
];

export const experienceItems: ExperienceItem[] = [
  {
    iconName: 'Briefcase',
    title: 'Internship',
    description: 'Frontend development intern at Tripmilestone Tours Pvt Ltd'
  },
  {
    iconName: 'Award',
    title: 'Certificates',
    description: '',
    items: [
      'Python (Certiport)',
      'ICT Learnathon 2023',
      'Skill-a-thon 2024'
    ]
  },
  {
    iconName: 'Target',
    title: 'Achievements',
    description: 'Typewriting-Distinction (Senior)'
  },
  {
    iconName: 'Star',
    title: 'Activities',
    description: 'Participated in NSS activities like cycle rally and NCC Air Force'
  }
];

export const contactInfo: ContactInfo[] = [
  {
    iconName: 'Phone',
    title: 'Phone',
    value: '+91 8072396488',
    href: 'tel:+918072396488'
  },
  {
    iconName: 'Mail',
    title: 'Email',
    value: 'arunpandiancse25@gmail.com',
    href: 'mailto:arunpandiancse25@gmail.com'
  },
  {
    iconName: 'Linkedin',
    title: 'LinkedIn',
    value: 'linkedin.com/in/arunpandian-c/',
    href: 'https://www.linkedin.com/in/arunpandian-c/'
  },
  {
    iconName: 'Github',
    title: 'GitHub',
    value: 'github.com/arunpandian9159',
    href: 'https://github.com/arunpandian9159'
  }
];
