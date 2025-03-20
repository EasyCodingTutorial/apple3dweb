'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the 3D viewer component with no SSR
const ThreeDViewer = dynamic(() => import('./ThreeDViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-gray-400 text-2xl"
      >
        🎮
      </motion.div>
    </div>
  ),
});

export default function ProductViewer() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gray-400 text-2xl"
        >
          🎮
        </motion.div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gray-400 text-2xl"
        >
          🎮
        </motion.div>
      </div>
    }>
      <ThreeDViewer />
    </Suspense>
  );
}