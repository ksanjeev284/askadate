import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { FallingPetals } from './animations/FallingPetals';

interface LandingPageProps {
  name: string;
  onContinue: () => void;
}

export function LandingPage({ name, onContinue }: LandingPageProps) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100"
    >
      <FallingPetals />
      
      <motion.article
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center z-10"
      >
        <header>
          <h1 className="text-4xl md:text-6xl font-dancing text-rose-700 mb-8">
            Hey {name}...
          </h1>
        </header>
        
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-16 h-16 text-rose-500 mx-auto mb-8" />
        </motion.div>

        <button
          onClick={onContinue}
          className="px-8 py-3 bg-rose-400 text-white rounded-full font-semibold
                   hover:bg-rose-500 transition-all duration-300 shadow-lg
                   hover:shadow-xl transform hover:scale-105
                   animate-pulse"
        >
          Click to continue
        </button>
      </motion.article>
    </motion.main>
  );
}