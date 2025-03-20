'use client';

import Navigation from '../components/Navigation';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-16">
        <Features />
      </div>
      <Footer />
    </main>
  );
}