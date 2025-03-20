'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Stars, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

function FloatingScene() {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Virtual Environment */}
        <mesh position={[0, -2, -5]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.5}
            roughness={0.5}
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </mesh>

        {/* Floating Elements */}
        <mesh position={[-2, 0, -3]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#ff6b6b"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#ff6b6b" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[2, 1, -4]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#4ecdc4"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#4ecdc4" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[0, 2, -2]}>
          <torusGeometry args={[0.6, 0.2, 16, 100]} />
          <meshStandardMaterial
            color="#45b7d1"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#45b7d1" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
      </group>
    </Float>
  );
}

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Experience the Future
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Step into a world where digital and physical seamlessly blend together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/vision-pro-1.jpg"
                alt="Apple Vision Pro Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold mb-4">Revolutionary Display</h3>
              <p className="text-gray-200">More pixels than a 4K TV for each eye. Stunning clarity and immersive visuals.</p>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Spatial Computing</h3>
              <p className="text-gray-300 text-lg">
                Interact with digital content in your physical space. A new way to work, play, and connect.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Advanced Sensors</h3>
              <p className="text-gray-300 text-lg">
                Eye tracking, hand tracking, and spatial audio create a truly immersive experience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Revolutionary Design</h3>
              <p className="text-gray-300 text-lg">
                Crafted with precision, featuring premium materials and ergonomic comfort.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}