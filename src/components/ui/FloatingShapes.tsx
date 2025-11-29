'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    size: number;
    color: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateShapes = () => {
      const colors = [
        'bg-blue-500/10 dark:bg-blue-400/15',
        'bg-yellow-500/10 dark:bg-yellow-400/15',
        'bg-green-500/10 dark:bg-green-400/15',
        'bg-red-500/10 dark:bg-red-400/15',
        'bg-purple-500/10 dark:bg-purple-400/15',
        'bg-orange-500/10 dark:bg-orange-400/15',
        'bg-pink-500/10 dark:bg-pink-400/15',
        'bg-cyan-500/10 dark:bg-cyan-400/15',
      ];

      const newShapes = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 50, // 50-150px
        color: colors[i],
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        delay: Math.random() * 2, // 0-2s delay
        duration: 4 + Math.random() * 4, // 4-8s duration
      }));

      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const mouseInfluence = {
          x: (mousePosition.x - 0.5) * (shape.id + 1) * 20,
          y: (mousePosition.y - 0.5) * (shape.id + 1) * 20,
        };

        return (
          <motion.div
            key={shape.id}
            className={`absolute rounded-full ${shape.color} blur-sm`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              y: [-20 + mouseInfluence.y, 20 + mouseInfluence.y, -20 + mouseInfluence.y],
              x: [-10 + mouseInfluence.x, 10 + mouseInfluence.x, -10 + mouseInfluence.x],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
