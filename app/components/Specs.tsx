'use client';

import { motion } from 'framer-motion';

const specs = [
  {
    title: "Display",
    details: [
      "Micro-OLED display",
      "23 million pixels",
      "120° field of view",
      "90Hz refresh rate"
    ]
  },
  {
    title: "Performance",
    details: [
      "M2 chip",
      "R1 co-processor",
      "16GB unified memory",
      "256GB storage"
    ]
  },
  {
    title: "Sensors",
    details: [
      "12 cameras",
      "6 microphones",
      "5 sensors",
      "2 high-resolution displays"
    ]
  },
  {
    title: "Battery",
    details: [
      "Up to 2 hours",
      "External battery pack",
      "USB-C charging",
      "Fast charging support"
    ]
  }
];

export default function Specs() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Packed with cutting-edge technology to deliver an unprecedented spatial computing experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">{spec.title}</h3>
              <ul className="space-y-4">
                {spec.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-3" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}