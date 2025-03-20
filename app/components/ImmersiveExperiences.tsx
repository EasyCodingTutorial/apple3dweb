'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ExperienceScene() {
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
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#ff9f43"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#ff9f43" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[2, 1, -4]}>
          <icosahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color="#ff6b6b"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#ff6b6b" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[0, 2, -2]}>
          <dodecahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#4ecdc4"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#4ecdc4" : "#000000"}
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

const experiences = [
  {
    title: "Entertainment",
    description: "Watch movies, play games, and experience content in a whole new dimension.",
    features: ["Immersive 3D movies", "Spatial gaming", "Virtual concerts", "Interactive stories"]
  },
  {
    title: "Productivity",
    description: "Transform your workspace with infinite screens and spatial computing.",
    features: ["Virtual displays", "3D file management", "Collaborative spaces", "Focus mode"]
  },
  {
    title: "Communication",
    description: "Connect with others in life-size video calls with spatial audio.",
    features: ["FaceTime", "Personas", "Spatial audio", "Eye contact"]
  },
  {
    title: "Creativity",
    description: "Create and design in three dimensions with intuitive tools.",
    features: ["3D modeling", "Spatial drawing", "Virtual sculpting", "AR creation"]
  }
];

export default function ImmersiveExperiences() {
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
            Immersive Experiences
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover a world of possibilities with Apple Vision Pro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <Environment preset="city" />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <Suspense fallback={<LoadingScreen />}>
                <ExperienceScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{exp.title}</h3>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-gray-300 flex items-center"
                    >
                      <span className="w-2 h-2 bg-white rounded-full mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}