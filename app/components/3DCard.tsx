'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: CardProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!mounted) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = event.clientY - centerY;
    const rotateY = event.clientX - centerX;

    x.set(rotateY);
    y.set(rotateX);
  }

  function onMouseLeave() {
    if (!mounted) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full">
          <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <div className="relative p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] rounded-2xl" />
          <div className="relative p-6">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}