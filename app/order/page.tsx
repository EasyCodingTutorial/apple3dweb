'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import PlaceholderImage from '../components/PlaceholderImage';
import ProductViewer from '../components/ProductViewer';

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, estimatedDays: '3-5', icon: '🚚' },
  { id: 'express', name: 'Express Shipping', price: 12.99, estimatedDays: '1-2', icon: '✈️' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, estimatedDays: '1', icon: '🚀' },
];

const paymentMethods = [
  { id: 'credit', name: 'Credit Card', icon: '💳', color: 'from-blue-500 to-blue-600' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', color: 'from-gray-800 to-gray-900' },
  { id: 'paypal', name: 'PayPal', icon: '🔵', color: 'from-blue-400 to-blue-500' },
  { id: 'google', name: 'Google Pay', icon: '🤖', color: 'from-green-500 to-green-600' },
  { id: 'crypto', name: 'Crypto', icon: '₿', color: 'from-yellow-500 to-yellow-600' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'from-purple-500 to-purple-600' },
];

const productImages = {
  'vision-pro': '/images/vision-pro-1.jpg',
  'vision-pro-2': '/images/vision-pro-2.jpg',
  'vision-pro-3': '/images/vision-pro-3.jpg',
};

export default function OrderPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [shipping, setShipping] = useState(shippingOptions[0]);
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setShowConfetti(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearCart();
    router.push('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20">
              <span className="text-3xl">🎮</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Complete Your Order
          </h1>
          <p className="text-gray-400">Review your items and provide shipping details</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl group hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <ProductViewer />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>${shipping.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-semibold text-white pt-3 border-t border-white/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6 text-white">Shipping Options</h2>
              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShipping(option)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                      shipping.id === option.id
                        ? 'bg-white/20 border-white/30 shadow-lg shadow-white/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="text-left">
                          <h3 className="font-medium text-white">{option.name}</h3>
                          <p className="text-sm text-gray-400">Estimated {option.estimatedDays} days</p>
                        </div>
                      </div>
                      <span className="text-white font-medium">${option.price.toFixed(2)}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6 text-white">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPayment(method)}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      payment.id === method.id
                        ? 'bg-white/20 border-white/30 shadow-lg shadow-white/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">{method.icon}</span>
                      <span className="text-sm text-white">{method.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                isProcessing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/20'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}