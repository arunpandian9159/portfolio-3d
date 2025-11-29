'use client';

import { ButtonProps } from '@/types';
import { cn } from '@/utils/cn';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className,
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'active:scale-[0.98]'
  );

  const variants = {
    primary: cn(
      'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
      'text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30',
      'hover:-translate-y-0.5'
    ),
    outline: cn(
      'border-2 border-teal-500 text-teal-600 dark:border-teal-400 dark:text-teal-400',
      'hover:bg-teal-500 hover:text-white hover:border-teal-500',
      'dark:hover:bg-teal-400 dark:hover:text-gray-900 dark:hover:border-teal-400',
      'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/20'
    ),
    ghost: cn(
      'text-gray-600 dark:text-gray-400',
      'hover:text-teal-500 dark:hover:text-teal-400',
      'hover:bg-teal-50 dark:hover:bg-teal-900/20',
      'rounded-lg'
    ),
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-8 py-3.5 text-base rounded-xl gap-2',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();

          // Handle anchor links
          if (href.startsWith('#')) {
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const offsetTop = (targetElement as HTMLElement).offsetTop - 70;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }
          }
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
