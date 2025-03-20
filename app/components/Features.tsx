'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Card3D from './3DCard';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const availableImages = {
  'vision-pro-1': '/images/vision-pro-1.jpg',
  'vision-pro-2': '/images/vision-pro-2.jpg',
  'vision-pro-3': '/images/vision-pro-3.jpg',
};

const features = [
  {
    title: "Revolutionary Display",
    description: "More pixels than a 4K TV for each eye. Stunning clarity and immersive visuals.",
    image: availableImages['vision-pro-1'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500/30 via-purple-500/30 to-indigo-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    accent: "from-blue-500 to-purple-500"
  },
  {
    title: "Spatial Computing",
    description: "Interact with digital content in your physical space. A new way to work, play, and connect.",
    image: availableImages['vision-pro-2'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-emerald-500/30 via-blue-500/30 to-cyan-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    accent: "from-emerald-500 to-blue-500"
  },
  {
    title: "Eye Tracking",
    description: "Advanced eye tracking technology for precise interaction and natural navigation.",
    image: availableImages['vision-pro-3'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gradient: "from-rose-500/30 via-orange-500/30 to-amber-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
    accent: "from-rose-500 to-orange-500"
  },
  {
    title: "Hand Tracking",
    description: "Natural hand gestures for intuitive interaction with digital content.",
    image: availableImages['vision-pro-1'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    gradient: "from-amber-500/30 via-orange-500/30 to-red-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    accent: "from-amber-500 to-orange-500"
  },
  {
    title: "Spatial Audio",
    description: "Immersive 3D audio that adapts to your environment and movements.",
    image: availableImages['vision-pro-2'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    gradient: "from-violet-500/30 via-fuchsia-500/30 to-purple-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    accent: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "FaceTime",
    description: "Life-size video calls with spatial audio and eye contact.",
    image: availableImages['vision-pro-3'],
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-fuchsia-500/30 via-rose-500/30 to-pink-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
    accent: "from-fuchsia-500 to-rose-500"
  },
];

export default function Features() {
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of spatial computing with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card3D className={`h-full group ${feature.glow}`}>
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  {!imageErrors[feature.image] ? (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                      quality={90}
                      onError={() => handleImageError(feature.image)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">🎮</span>
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="relative z-10">
                  <motion.div
                    className="mb-4 p-3 bg-white/10 rounded-xl inline-block transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}