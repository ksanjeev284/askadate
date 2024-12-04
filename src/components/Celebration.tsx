import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Music } from 'lucide-react';
import { FallingPetals } from './animations/FallingPetals';

interface CelebrationProps {
  selectedDate: {
    title: string;
    time: string;
    location: string;
  };
}

export function Celebration({ selectedDate }: CelebrationProps) {
  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.play();
    return () => audio.pause();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 py-16 px-4"
    >
      <FallingPetals />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Heart className="w-24 h-24 text-rose-500 mx-auto mb-8" />
        </motion.div>

        <h2 className="text-5xl font-dancing text-rose-700 mb-8">
          Yay! It's a Date! 🎉
        </h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="border-4 border-rose-200 rounded-xl p-6">
            <h3 className="text-3xl font-dancing text-rose-600 mb-4">
              Date Ticket
            </h3>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-800">{selectedDate.title}</p>
              <p className="text-gray-600">🕒 {selectedDate.time}</p>
              <p className="text-gray-600">📍 {selectedDate.location}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full
                           hover:bg-rose-600 transition-all">
            <Download className="w-5 h-5" />
            Save Ticket
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full
                           hover:bg-gray-200 transition-all">
            <Music className="w-5 h-5" />
            Toggle Music
          </button>
        </div>
      </div>
    </motion.div>
  );
}