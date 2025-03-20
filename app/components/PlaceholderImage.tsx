'use client';

import { motion } from 'framer-motion';

export default function PlaceholderImage() {
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