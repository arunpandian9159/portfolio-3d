'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ============================================
// SPLIT TEXT ANIMATION
// ============================================
interface SplitTextProps {
    text: string;
    className?: string;
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
                    className="inline-block"
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
    tiltStrength = 15,
    glareEnabled = true,
    perspective = 1000,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);

    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            rotateX.set((y - 0.5) * -tiltStrength);
            rotateY.set((x - 0.5) * tiltStrength);
            glareX.set(x * 100);
            glareY.set(y * 100);
        },
        [tiltStrength, rotateX, rotateY, glareX, glareY]
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
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {glareEnabled && isHovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-inherit"
                    style={{
                        background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
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
    spotlightColor = 'rgba(20, 184, 166, 0.15)',
    spotlightSize = 300,
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
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
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 100%)`,
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
    const opacityMap = { low: 0.2, medium: 0.4, high: 0.6 };
    const opacity = opacityMap[intensity];

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -inset-[100px]"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <div
                        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle, rgba(20, 184, 166, ${opacity}) 0%, transparent 70%)`,
                        }}
                    />
                    <div
                        className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle, rgba(6, 182, 212, ${opacity}) 0%, transparent 70%)`,
                        }}
                    />
                    <div
                        className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle, rgba(45, 166, 178, ${opacity}) 0%, transparent 70%)`,
                        }}
                    />
                </motion.div>
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
    particleCount = 50,
    particleColor = 'rgba(20, 184, 166, 0.5)',
}: ParticlesBackgroundProps) {
    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
    }, [particleCount]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            background: particleColor,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: 'easeInOut',
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
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance / 2, distance / 2, -distance / 2],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
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
