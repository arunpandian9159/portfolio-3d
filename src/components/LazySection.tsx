'use client';

import { useEffect, useState, ReactNode, useRef } from 'react';

interface LazyLoadProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    placeholder?: ReactNode;
} 
 
/**
 * Lazy load component that only renders children when visible in viewport
 * Uses IntersectionObserver for efficient detection
 */
export default function LazySection({
    children,
    threshold = 0.1,
    rootMargin = '100px',
    placeholder = null,
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasLoaded(true);
                    // Once loaded, disconnect observer
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, rootMargin]);

    return (
        <div ref={ref}>
            {hasLoaded ? children : placeholder}
        </div>
    );
}
