'use client';

import { motion } from 'framer-motion';
import Card3D from './3DCard';
import Image from 'next/image';

const experiences = [
  {
    title: "Entertainment",
    description: "Watch movies, play games, and experience content in a whole new dimension.",
    image: "/images/vision-pro-1.jpg",
    features: ["Immersive 3D movies", "Spatial gaming", "Virtual concerts", "Interactive stories"]
  },
  {
    title: "Productivity",
    description: "Transform your workspace with infinite screens and spatial computing.",
    image: "/images/vision-pro-2.jpg",
    features: ["Virtual displays", "3D file management", "Collaborative spaces", "Focus mode"]
  },
  {
    title: "Communication",
    description: "Connect with others in life-size video calls with spatial audio.",
    image: "/images/vision-pro-3.jpg",
    features: ["FaceTime", "Personas", "Spatial audio", "Eye contact"]
  }
];

export default function Experience() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card3D className="h-full">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{exp.title}</h3>
                <p className="text-gray-300 mb-6">{exp.description}</p>
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
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}