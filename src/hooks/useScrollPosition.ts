'use client';

import { useEffect, useState } from 'react';
import { UseScrollPositionReturn } from '@/types';

export function useScrollPosition(): UseScrollPositionReturn {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    const throttledUpdateScrollPosition = throttle(updateScrollPosition, 16);

    window.addEventListener('scroll', throttledUpdateScrollPosition);

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollPosition);
    };
  }, []);

  return { scrollY, scrollDirection };
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
