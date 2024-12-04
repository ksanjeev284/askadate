import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FallingPetals } from './animations/FallingPetals';

interface MainQuestionProps {
  onAccept: () => void;
}

export function MainQuestion({ onAccept }: MainQuestionProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * 150 - 75; // Reduced range for better mobile experience
    const y = Math.random() * 150 - 75;
    setNoButtonPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 p-4"
    >
      <FallingPetals />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center z-10 max-w-2xl mx-auto px-4"
      >
        <Heart className="w-12 h-12 md:w-16 md:h-16 text-rose-500 mx-auto mb-6 md:mb-8" />
        
        <h2 className="text-2xl md:text-4xl font-dancing text-rose-700 mb-8 md:mb-12 leading-relaxed">
          Would you make me the happiest person by going on a date with me?
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="w-full md:w-auto px-8 md:px-12 py-3 md:py-4 bg-rose-500 text-white 
                     rounded-full text-lg md:text-xl font-semibold shadow-lg 
                     hover:bg-rose-600 transition-all mb-4 md:mb-0"
          >
            Yes! ❤️
          </motion.button>

          <motion.button
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            onHoverStart={moveNoButton}
            onTouchStart={moveNoButton}
            className="w-full md:w-auto px-6 md:px-8 py-2 md:py-3 bg-gray-300 
                     text-gray-700 rounded-full font-medium 
                     hover:bg-gray-400 transition-all"
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}