'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';

// ============================================
// SPLIT TEXT ANIMATION
// ============================================
interface SplitTextProps {
    text: string;
    className?: string;
    charClassName?: string;
    delay?: number;
    animationFrom?: { opacity: number; transform: string };
    animationTo?: { opacity: number; transform: string };
    threshold?: number;
    splitType?: 'chars' | 'words';
    staggerDuration?: number;
    onAnimationComplete?: () => void;
}

export function SplitText({
    text,
    className = '',
    charClassName = '',
    delay = 0,
    animationFrom = { opacity: 0, transform: 'translateY(40px)' },
    animationTo = { opacity: 1, transform: 'translateY(0)' },
    threshold = 0.1,
    splitType = 'chars',
    staggerDuration = 0.03,
    onAnimationComplete,
}: SplitTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const [hasAnimated, setHasAnimated] = useState(false);

    const elements = useMemo(() => {
        if (splitType === 'words') {
            return text.split(' ').map((word, i, arr) => ({
                content: word + (i < arr.length - 1 ? ' ' : ''),
                key: `word-${i}`,
            }));
        }
        return text.split('').map((char, i) => ({
            content: char === ' ' ? '\u00A0' : char,
            key: `char-${i}`,
        }));
    }, [text, splitType]);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(true);
                if (onAnimationComplete) {
                    setTimeout(onAnimationComplete, elements.length * staggerDuration * 1000);
                }
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, hasAnimated, delay, elements.length, staggerDuration, onAnimationComplete]);

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {elements.map((el, index) => (
                <motion.span
                    key={el.key}
                    className={`inline-block ${charClassName}`}
                    initial={animationFrom}
                    animate={hasAnimated ? animationTo : animationFrom}
                    transition={{
                        duration: 0.5,
                        delay: index * staggerDuration,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {el.content}
                </motion.span>
            ))}
        </span>
    );
}

// ============================================
// BLUR TEXT ANIMATION
// ============================================
interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    direction?: 'top' | 'bottom';
    threshold?: number;
    animateBy?: 'words' | 'chars';
}

export function BlurText({
    text,
    className = '',
    delay = 0,
    direction = 'bottom',
    threshold = 0.1,
    animateBy = 'words',
}: BlurTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const elements = useMemo(() => {
        if (animateBy === 'words') {
            return text.split(' ').map((word, i, arr) => ({
                content: word + (i < arr.length - 1 ? ' ' : ''),
                key: `word-${i}`,
            }));
        }
        return text.split('').map((char, i) => ({
            content: char === ' ' ? '\u00A0' : char,
            key: `char-${i}`,
        }));
    }, [text, animateBy]);

    const yOffset = direction === 'top' ? -20 : 20;

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {elements.map((el, index) => (
                <motion.span
                    key={el.key}
                    className="inline-block"
                    initial={{ opacity: 0, filter: 'blur(10px)', y: yOffset }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: delay + index * 0.04,
                        ease: 'easeOut',
                    }}
                >
                    {el.content}
                </motion.span>
            ))}
        </span>
    );
}

// ============================================
// SHINY TEXT ANIMATION
// ============================================
interface ShinyTextProps {
    text: string;
    className?: string;
    shimmerWidth?: number;
    speed?: number;
    disabled?: boolean;
}

export function ShinyText({
    text,
    className = '',
    shimmerWidth = 100,
    speed = 3,
    disabled = false,
}: ShinyTextProps) {
    return (
        <span
            className={`inline-block bg-clip-text ${className}`}
            style={{
                backgroundImage: disabled
                    ? 'linear-gradient(90deg, currentColor, currentColor)'
                    : `linear-gradient(90deg, currentColor 0%, currentColor 40%, rgba(255,255,255,0.9) 50%, currentColor 60%, currentColor 100%)`,
                backgroundSize: `${shimmerWidth}% 100%`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: disabled ? 'currentColor' : 'transparent',
                animation: disabled ? 'none' : `shimmer ${speed}s linear infinite`,
            }}
        >
            <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
            {text}
        </span>
    );
}

// ============================================
// GRADIENT TEXT
// ============================================
interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export function GradientText({
    children,
    className = '',
    colors = ['#14b8a6', '#0d9488', '#06b6d4', '#14b8a6'],
    animationSpeed = 6,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '300% 100%',
        animation: `gradient-text ${animationSpeed}s ease infinite`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    };

    return (
        <span
            className={`inline-block ${showBorder ? 'border border-current rounded-lg px-3 py-1' : ''} ${className}`}
            style={gradientStyle}
        >
            <style jsx global>{`
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
            {children}
        </span>
    );
}

// ============================================
// ROTATING TEXT
// ============================================
interface RotatingTextProps {
    texts: string[];
    className?: string;
    interval?: number;
    rotationType?: 'slide' | 'fade' | 'flip';
}

export function RotatingText({
    texts,
    className = '',
    interval = 3000,
    rotationType = 'slide',
}: RotatingTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);

    const variants = {
        slide: {
            initial: { y: 30, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -30, opacity: 0 },
        },
        fade: {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 1.1 },
        },
        flip: {
            initial: { rotateX: 90, opacity: 0 },
            animate: { rotateX: 0, opacity: 1 },
            exit: { rotateX: -90, opacity: 0 },
        },
    };

    return (
        <span className={`inline-block relative ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className="inline-block"
                    {...variants[rotationType]}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {texts[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

// ============================================
// MAGNETIC BUTTON
// ============================================
interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * strength);
            y.set((e.clientY - centerY) * strength);
        },
        [strength, x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// TILTED CARD
// ============================================
interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
    perspective?: number;
}

export function TiltedCard({
    children,
    className = '',
    tiltStrength = 10, // Reduced default strength
    glareEnabled = false, // Disabled by default for performance
    perspective = 1000,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const lastMoveTime = useRef(0);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);

    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            // Throttle to ~60fps for performance
            const now = Date.now();
            if (now - lastMoveTime.current < 16) return;
            lastMoveTime.current = now;

            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            rotateX.set((y - 0.5) * -tiltStrength);
            rotateY.set((x - 0.5) * tiltStrength);
            if (glareEnabled) {
                glareX.set(x * 100);
                glareY.set(y * 100);
            }
        },
        [tiltStrength, rotateX, rotateY, glareX, glareY, glareEnabled]
    );

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            style={{
                perspective,
                transformStyle: 'preserve-3d',
                rotateX: springRotateX,
                rotateY: springRotateY,
                willChange: 'transform',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {glareEnabled && isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-inherit"
                    style={{
                        background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                        borderRadius: 'inherit',
                    }}
                />
            )}
        </motion.div>
    );
}

// ============================================
// SPOTLIGHT CARD
// ============================================
interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightSize?: number;
}

export function SpotlightCard({
    children,
    className = '',
    spotlightColor = 'rgba(20, 184, 166, 0.1)',
    spotlightSize = 250,
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const lastMoveTime = useRef(0);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        // Throttle to ~60fps
        const now = Date.now();
        if (now - lastMoveTime.current < 16) return;
        lastMoveTime.current = now;

        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{ contain: 'paint' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                        background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 100%)`,
                        opacity: 1,
                    }}
                />
            )}
            {children}
        </div>
    );
}

// ============================================
// ANIMATED BACKGROUND (Aurora)
// ============================================
interface AuroraBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: 'low' | 'medium' | 'high';
}

export function AuroraBackground({
    className = '',
    children,
    intensity = 'medium',
}: AuroraBackgroundProps) {
    const opacityMap = { low: 0.15, medium: 0.25, high: 0.35 };
    const opacity = opacityMap[intensity];

    // Simplified aurora - uses CSS animation instead of framer-motion for better performance
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -inset-[50px] animate-slow-spin"
                    style={{
                        willChange: 'transform',
                        contain: 'paint',
                    }}
                >
                    <div
                        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full"
                        style={{
                            background: `radial-gradient(circle, rgba(20, 184, 166, ${opacity}) 0%, transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                    />
                    <div
                        className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full"
                        style={{
                            background: `radial-gradient(circle, rgba(6, 182, 212, ${opacity}) 0%, transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                    />
                </div>
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

interface ParticlesBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    particleCount?: number;
    particleColor?: string;
}

export function ParticlesBackground({
    className = '',
    children,
    particleCount = 15, // Reduced default for performance
    particleColor = 'rgba(20, 184, 166, 0.4)',
}: ParticlesBackgroundProps) {
    // Limit max particles for performance
    const actualCount = Math.min(particleCount, 20);

    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: actualCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 15 + 12, // Slower for less CPU usage
            delay: Math.random() * 3,
        }));
    }, [actualCount]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ contain: 'paint' }}>
            <div className="absolute inset-0">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full animate-float-particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            background: particleColor,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                            willChange: 'transform, opacity',
                        }}
                    />
                ))}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// ============================================
// ANIMATED COUNTER
// ============================================
interface AnimatedCounterProps {
    value: number;
    className?: string;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export function AnimatedCounter({
    value,
    className = '',
    duration = 2,
    suffix = '',
    prefix = '',
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}

// ============================================
// REVEAL ON SCROLL
// ============================================
interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: number;
}

export function RevealOnScroll({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 50,
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const getInitial = () => {
        switch (direction) {
            case 'up': return { y: distance, opacity: 0 };
            case 'down': return { y: -distance, opacity: 0 };
            case 'left': return { x: distance, opacity: 0 };
            case 'right': return { x: -distance, opacity: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={getInitial()}
            animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitial()}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// STAGGER CONTAINER
// ============================================
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    delayStart?: number;
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    delayStart = 0,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delayStart,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// FLOATING ELEMENT
// ============================================
interface FloatingElementProps {
    children?: React.ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
}

export function FloatingElement({
    children,
    className = '',
    duration = 4,
    distance = 15,
    delay = 0,
}: FloatingElementProps) {
    // Use CSS animation instead of framer-motion for better performance
    return (
        <div
            className={`${className} animate-float-gentle`}
            style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                '--float-distance': `${distance}px`,
                willChange: 'transform',
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}

// ============================================
// BORDER BEAM
// ============================================
interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export function BorderBeam({
    className = '',
    size = 200,
    duration = 15,
    borderWidth = 1.5,
    colorFrom = '#14b8a6',
    colorTo = '#06b6d4',
    delay = 0,
}: BorderBeamProps) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden rounded-inherit pointer-events-none ${className}`}
            style={{ borderRadius: 'inherit' }}
        >
            <motion.div
                className="absolute"
                style={{
                    width: size,
                    height: size,
                    background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
                    maskImage: 'linear-gradient(white, white)',
                    WebkitMaskImage: 'linear-gradient(white, white)',
                }}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                    delay,
                }}
                initial={{
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: 'inherit',
                    borderRadius: 'inherit',
                    margin: borderWidth,
                }}
            />
        </div>
    );
}

// ============================================
// TEXT SCRAMBLE
// ============================================
interface TextScrambleProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    revealSpeed?: number;
    triggerOnView?: boolean;
}

export function TextScramble({
    text,
    className = '',
    scrambleSpeed = 50,
    revealSpeed = 100,
    triggerOnView = true,
}: TextScrambleProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayText, setDisplayText] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    useEffect(() => {
        if (!triggerOnView || !isInView) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        if (letter === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, scrambleSpeed);

        return () => clearInterval(interval);
    }, [text, isInView, triggerOnView, scrambleSpeed, chars]);

    return (
        <span ref={ref} className={`font-mono ${className}`}>
            {displayText}
        </span>
    );
}

// ============================================
// MORPHING TEXT
// ============================================
interface MorphingTextProps {
    texts: string[];
    className?: string;
    morphDuration?: number;
    pauseDuration?: number;
}

export function MorphingText({
    texts,
    className = '',
    morphDuration = 1.5,
    pauseDuration = 3,
}: MorphingTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, (morphDuration + pauseDuration) * 1000);
        return () => clearInterval(interval);
    }, [texts.length, morphDuration, pauseDuration]);

    return (
        <span className={`relative inline-block ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className="inline-block"
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                    transition={{ duration: morphDuration / 2 }}
                >
                    {texts[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

// ============================================
// DOT GRID BACKGROUND
// ============================================
interface Dot {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    vx: number;
    vy: number;
}

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    className?: string;
    style?: React.CSSProperties;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

export function DotGrid({
    dotSize = 3,
    gap = 24,
    baseColor = '#14b8a6',
    activeColor = '#06b6d4',
    proximity = 120,
    className = '',
    style
}: DotGridProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const pointerRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const extraX = width - gridW;
        const extraY = height - gridH;

        const startX = extraX / 2 + dotSize / 2;
        const startY = extraY / 2 + dotSize / 2;

        const dots: Dot[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                dots.push({ cx, cy, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    // Animation loop
    useEffect(() => {
        const proxSq = proximity * proximity;
        const springStrength = 0.08;
        const damping = 0.85;
        const pushStrength = 8;

        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x: px, y: py } = pointerRef.current;

            for (const dot of dotsRef.current) {
                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;

                // Push dots away from cursor
                if (dsq < proxSq && dsq > 0) {
                    const dist = Math.sqrt(dsq);
                    const force = (1 - dist / proximity) * pushStrength;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    dot.vx += nx * force * 0.1;
                    dot.vy += ny * force * 0.1;
                }

                // Spring back to origin
                dot.vx += -dot.xOffset * springStrength;
                dot.vy += -dot.yOffset * springStrength;

                // Apply damping
                dot.vx *= damping;
                dot.vy *= damping;

                // Update position
                dot.xOffset += dot.vx;
                dot.yOffset += dot.vy;

                // Calculate final position
                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;

                // Determine color based on proximity
                let style = baseColor;
                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = 1 - dist / proximity;
                    const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                    const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                    const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                    style = `rgb(${r},${g},${b})`;
                }

                ctx.beginPath();
                ctx.arc(ox, oy, dotSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = style;
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationRef.current);
    }, [proximity, baseColor, activeColor, baseRgb, activeRgb, dotSize]);

    // Build grid on mount and resize
    useEffect(() => {
        buildGrid();
        let resizeObserver: ResizeObserver | null = null;

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(buildGrid);
            if (wrapperRef.current) {
                resizeObserver.observe(wrapperRef.current);
            }
        } else {
            window.addEventListener('resize', buildGrid);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            } else {
                window.removeEventListener('resize', buildGrid);
            }
        };
    }, [buildGrid]);

    // Mouse move handler
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            pointerRef.current.x = e.clientX - rect.left;
            pointerRef.current.y = e.clientY - rect.top;
        };

        const onLeave = () => {
            pointerRef.current.x = -1000;
            pointerRef.current.y = -1000;
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseleave', onLeave);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`absolute inset-0 ${className}`}
            style={style}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
        </div>
    );
}

// ============================================
// ORB BACKGROUND (WebGL)
// ============================================
interface OrbProps {
    hue?: number;
    hoverIntensity?: number;
    rotateOnHover?: boolean;
    forceHoverState?: boolean;
    className?: string;
}

export function Orb({
    hue = 0,
    hoverIntensity = 0.2,
    rotateOnHover = true,
    forceHoverState = false,
    className = ''
}: OrbProps) {
    const ctnDom = useRef<HTMLDivElement>(null);

    const vert = /* glsl */ `
        precision highp float;
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const frag = /* glsl */ `
        precision highp float;

        uniform float iTime;
        uniform vec3 iResolution;
        uniform float hue;
        uniform float hover;
        uniform float rot;
        uniform float hoverIntensity;
        varying vec2 vUv;

        vec3 rgb2yiq(vec3 c) {
            float y = dot(c, vec3(0.299, 0.587, 0.114));
            float i = dot(c, vec3(0.596, -0.274, -0.322));
            float q = dot(c, vec3(0.211, -0.523, 0.312));
            return vec3(y, i, q);
        }
        
        vec3 yiq2rgb(vec3 c) {
            float r = c.x + 0.956 * c.y + 0.621 * c.z;
            float g = c.x - 0.272 * c.y - 0.647 * c.z;
            float b = c.x - 1.106 * c.y + 1.703 * c.z;
            return vec3(r, g, b);
        }
        
        vec3 adjustHue(vec3 color, float hueDeg) {
            float hueRad = hueDeg * 3.14159265 / 180.0;
            vec3 yiq = rgb2yiq(color);
            float cosA = cos(hueRad);
            float sinA = sin(hueRad);
            float i = yiq.y * cosA - yiq.z * sinA;
            float q = yiq.y * sinA + yiq.z * cosA;
            yiq.y = i;
            yiq.z = q;
            return yiq2rgb(yiq);
        }

        vec3 hash33(vec3 p3) {
            p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
            p3 += dot(p3, p3.yxz + 19.19);
            return -1.0 + 2.0 * fract(vec3(
                p3.x + p3.y,
                p3.x + p3.z,
                p3.y + p3.z
            ) * p3.zyx);
        }

        float snoise3(vec3 p) {
            const float K1 = 0.333333333;
            const float K2 = 0.166666667;
            vec3 i = floor(p + (p.x + p.y + p.z) * K1);
            vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
            vec3 e = step(vec3(0.0), d0 - d0.yzx);
            vec3 i1 = e * (1.0 - e.zxy);
            vec3 i2 = 1.0 - e.zxy * (1.0 - e);
            vec3 d1 = d0 - (i1 - K2);
            vec3 d2 = d0 - (i2 - K1);
            vec3 d3 = d0 - 0.5;
            vec4 h = max(0.6 - vec4(
                dot(d0, d0),
                dot(d1, d1),
                dot(d2, d2),
                dot(d3, d3)
            ), 0.0);
            vec4 n = h * h * h * h * vec4(
                dot(d0, hash33(i)),
                dot(d1, hash33(i + i1)),
                dot(d2, hash33(i + i2)),
                dot(d3, hash33(i + 1.0))
            );
            return dot(vec4(31.316), n);
        }

        vec4 extractAlpha(vec3 colorIn) {
            float a = max(max(colorIn.r, colorIn.g), colorIn.b);
            return vec4(colorIn.rgb / (a + 1e-5), a);
        }

        const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
        const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
        const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
        const float innerRadius = 0.6;
        const float noiseScale = 0.65;

        float light1(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * attenuation);
        }
        float light2(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * dist * attenuation);
        }

        vec4 draw(vec2 uv) {
            vec3 color1 = adjustHue(baseColor1, hue);
            vec3 color2 = adjustHue(baseColor2, hue);
            vec3 color3 = adjustHue(baseColor3, hue);
            
            float ang = atan(uv.y, uv.x);
            float len = length(uv);
            float invLen = len > 0.0 ? 1.0 / len : 0.0;
            
            float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
            float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
            float d0 = distance(uv, (r0 * invLen) * uv);
            float v0 = light1(1.0, 10.0, d0);
            v0 *= smoothstep(r0 * 1.05, r0, len);
            float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
            
            float a = iTime * -1.0;
            vec2 pos = vec2(cos(a), sin(a)) * r0;
            float d = distance(uv, pos);
            float v1 = light2(1.5, 5.0, d);
            v1 *= light1(1.0, 50.0, d0);
            
            float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
            float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
            
            vec3 col = mix(color1, color2, cl);
            col = mix(color3, col, v0);
            col = (col + v1) * v2 * v3;
            col = clamp(col, 0.0, 1.0);
            
            return extractAlpha(col);
        }

        vec4 mainImage(vec2 fragCoord) {
            vec2 center = iResolution.xy * 0.5;
            float size = min(iResolution.x, iResolution.y);
            vec2 uv = (fragCoord - center) / size * 2.0;
            
            float angle = rot;
            float s = sin(angle);
            float c = cos(angle);
            uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
            
            uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
            uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
            
            return draw(uv);
        }

        void main() {
            vec2 fragCoord = vUv * iResolution.xy;
            vec4 col = mainImage(fragCoord);
            gl_FragColor = vec4(col.rgb * col.a, col.a);
        }
    `;

    useEffect(() => {
        const container = ctnDom.current;
        if (!container) return;

        const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vert,
            fragment: frag,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                hue: { value: hue },
                hover: { value: 0 },
                rot: { value: 0 },
                hoverIntensity: { value: hoverIntensity }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            if (!container) return;
            const dpr = window.devicePixelRatio || 1;
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width * dpr, height * dpr);
            gl.canvas.style.width = width + 'px';
            gl.canvas.style.height = height + 'px';
            program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        let targetHover = 0;
        let lastTime = 0;
        let currentRot = 0;
        const rotationSpeed = 0.3;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;
            const size = Math.min(width, height);
            const centerX = width / 2;
            const centerY = height / 2;
            const uvX = ((x - centerX) / size) * 2.0;
            const uvY = ((y - centerY) / size) * 2.0;

            if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
                targetHover = 1;
            } else {
                targetHover = 0;
            }
        };

        const handleMouseLeave = () => {
            targetHover = 0;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        let rafId: number;
        const update = (t: number) => {
            rafId = requestAnimationFrame(update);
            const dt = (t - lastTime) * 0.001;
            lastTime = t;
            program.uniforms.iTime.value = t * 0.001;
            program.uniforms.hue.value = hue;
            program.uniforms.hoverIntensity.value = hoverIntensity;

            const effectiveHover = forceHoverState ? 1 : targetHover;
            program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

            if (rotateOnHover && effectiveHover > 0.5) {
                currentRot += dt * rotationSpeed;
            }
            program.uniforms.rot.value = currentRot;

            renderer.render({ scene: mesh });
        };
        rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

    return <div ref={ctnDom} className={`w-full h-full ${className}`} />;
}

