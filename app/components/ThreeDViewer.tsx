'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls, Stage, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const productImages = {
  'vision-pro': '/images/vision-pro-1.jpg',
  'vision-pro-2': '/images/vision-pro-2.jpg',
  'vision-pro-3': '/images/vision-pro-3.jpg',
};

function ProductModel({ imagePath }: { imagePath: string }) {
  const texture = useTexture(imagePath);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Model({ modelType = 'vision-pro' }: { modelType?: keyof typeof productImages }) {
  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
      <Stage environment="city" intensity={0.6}>
        <Suspense fallback={null}>
          <ProductModel imagePath={productImages[modelType]} />
        </Suspense>
      </Stage>
    </PresentationControls>
  );
}

export default function ThreeDViewer() {
  const [mounted, setMounted] = useState(false);
  const [currentModel, setCurrentModel] = useState<keyof typeof productImages>('vision-pro');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
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
    <div className="w-full h-full relative">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {Object.keys(productImages).map((model) => (
          <button
            key={model}
            onClick={() => setCurrentModel(model as keyof typeof productImages)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              currentModel === model
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/15'
            }`}
          >
            {model.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Model modelType={currentModel} />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
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
      )}
    </div>
  );
}