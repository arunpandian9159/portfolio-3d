'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { AnimatedElementProps } from '@/types';
import { cn } from '@/utils/cn';

export default function AnimatedElement({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className,
}: AnimatedElementProps) {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeIn: 'animate-fade-in',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
      style={{
        transitionDelay: hasIntersected ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
