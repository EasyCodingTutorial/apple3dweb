'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicCanvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

interface SpecCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  color: string;
}

function SpecCard3D({ title, description, icon, index, color }: SpecCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      style={{ y, rotateX: rotate }}
      className="relative w-full h-[350px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 shadow-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm"
          >
            <span className="text-3xl">{icon}</span>
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.15 }}
          className="flex items-center gap-2 text-white/80"
        >
          <span>Learn more</span>
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* 3D Background Effect */}
      <div className="absolute inset-0 z-0">
        <DynamicCanvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh>
                <boxGeometry args={[2, 2, 0.1]} />
                <meshStandardMaterial
                  color={hovered ? color : "#2c3e50"}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={hovered ? color : "#000000"}
                  emissiveIntensity={hovered ? 0.8 : 0}
                />
              </mesh>
            </Float>
            <Environment preset="city" />
          </Suspense>
        </DynamicCanvas>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 border-white/20 rounded-3xl"
        animate={{
          borderColor: hovered ? [color, "#ffffff", color] : "rgba(255,255,255,0.2)",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}

export default function TechnicalSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const specs = [
    {
      title: "Display",
      description: "Micro-OLED display with 23 million pixels across two displays, delivering stunning clarity and immersive visuals.",
      icon: "👁️",
      color: "#4a90e2"
    },
    {
      title: "Processor",
      description: "M2 chip with 10-core CPU, 10-core GPU, and 16-core Neural Engine for seamless performance.",
      icon: "⚡",
      color: "#50e3c2"
    },
    {
      title: "Sensors",
      description: "12 cameras, 5 sensors, and 6 microphones for advanced spatial awareness and precise tracking.",
      icon: "🎯",
      color: "#f5a623"
    },
    {
      title: "Battery",
      description: "Up to 2 hours of general use, up to 2.5 hours of video playback with efficient power management.",
      icon: "🔋",
      color: "#9013fe"
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "-20%", left: "-20%" }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ bottom: "-20%", right: "-20%" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the future of computing with cutting-edge technology and innovative design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {specs.map((spec, index) => (
            <SpecCard3D key={spec.title} {...spec} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}