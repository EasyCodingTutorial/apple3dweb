'use client';

import Navigation from '../components/Navigation';
import Experience from '../components/Experience';
import ImmersiveExperiences from '../components/ImmersiveExperiences';
import Footer from '../components/Footer';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-16">
        <Experience />
        <ImmersiveExperiences />
      </div>
      <Footer />
    </main>
  );
}