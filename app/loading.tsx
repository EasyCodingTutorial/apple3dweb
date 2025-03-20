'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 border-4 border-white/10 rounded-full"
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-500 rounded-full"
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.div>
      </div>

      {/* Background animated elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  );
}