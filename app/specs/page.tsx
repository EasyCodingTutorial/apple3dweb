'use client';

import Navigation from '../components/Navigation';
import Specs from '../components/Specs';
import Footer from '../components/Footer';

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-16">
        <Specs />
      </div>
      <Footer />
    </main>
  );
}