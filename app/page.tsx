'use client';

import Hero3D from './components/Hero3D';
import Features from './components/Features';
import Experience from './components/Experience';
import Showcase from './components/Showcase';
import Specs from './components/Specs';
import ImmersiveExperiences from './components/ImmersiveExperiences';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { FC } from 'react';
import Image from 'next/image';

const Home: FC = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Hero3D />
      </section>

      {/* Features Section */}
      <Features />

      {/* Showcase Section */}
      <Showcase />

      {/* Experience Section */}
      <Experience />

      {/* Immersive Experiences Section */}
      <ImmersiveExperiences />

      {/* Specs Section */}
      <Specs />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
