'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, useProgress, useTexture, Stars } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import Canvas with no SSR
const DynamicCanvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function VisionProModel() {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const groupRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onPointerOver={() => mounted && setHovered(true)}
        onPointerOut={() => mounted && setHovered(false)}
      >
        {/* Main Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.1]} />
          <meshStandardMaterial
            color={hovered ? "#2d2d2f" : "#1d1d1f"}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </mesh>

        {/* Front Glass */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[0.78, 0.58]} />
          <meshStandardMaterial
            color="#000000"
            transparent
            opacity={hovered ? 0.9 : 0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Display */}
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[0.76, 0.56]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={hovered ? 0.8 : 0.5}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Cameras and Sensors */}
        <group position={[0.3, 0.2, 0.052]}>
          <mesh>
            <circleGeometry args={[0.05, 32]} />
            <meshStandardMaterial
              color="#1d1d1f"
              emissive={hovered ? "#00ff00" : "#000000"}
              emissiveIntensity={hovered ? 0.5 : 0}
            />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <circleGeometry args={[0.04, 32]} />
            <meshStandardMaterial
              color="#1d1d1f"
              emissive={hovered ? "#00ff00" : "#000000"}
              emissiveIntensity={hovered ? 0.3 : 0}
            />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <circleGeometry args={[0.04, 32]} />
            <meshStandardMaterial
              color="#1d1d1f"
              emissive={hovered ? "#00ff00" : "#000000"}
              emissiveIntensity={hovered ? 0.3 : 0}
            />
          </mesh>
        </group>

        {/* Headband */}
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.4, 0.8, 4, 8]} />
          <meshStandardMaterial
            color="#1d1d1f"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Ambient Light Effect */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={hovered ? 0.15 : 0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <VisionProModel />
      <fog attach="fog" args={['#000000', 5, 20]} />
    </>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  if (!mounted) {
    return (
      <section className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-bold mb-6 text-white">Apple Vision Pro</h1>
            <p className="text-2xl text-gray-300">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vision-pro-1.jpg"
          alt="Apple Vision Pro"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80">
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              onAnimationComplete={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}

      {/* 3D Model */}
      <div className="absolute inset-0 z-20 opacity-80">
        <DynamicCanvas
          shadows
          camera={{ position: [0, 0, 3], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </DynamicCanvas>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Apple Vision Pro
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Welcome to the era of spatial computing. A revolutionary new product that transforms how you work, play, and connect.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 z-30"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-6 h-10 border-2 border-white/80 rounded-full p-1"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white/80 rounded-full mx-auto"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}