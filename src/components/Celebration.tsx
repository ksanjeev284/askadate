import React, { useEffect, useRef } from 'react';
import { Heart, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { FallingPetals } from './animations/FallingPetals';
import html2canvas from 'html2canvas';

interface CelebrationProps {
  selectedDate: DateOption;
}

export function Celebration({ selectedDate }: CelebrationProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.play();
    return () => audio.pause();
  }, []);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: null,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'date-ticket.png';
      link.click();
    } catch (error) {
      console.error('Error generating ticket:', error);
    }
  };

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
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div 
            ref={ticketRef}
            className="border-4 border-rose-200 rounded-xl p-6 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-repeat" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF69B4' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  transform: 'rotate(45deg)',
                }} 
              />
            </div>

            {/* Ticket Content */}
            <div className="relative z-10">
              <h3 className="text-3xl font-dancing text-rose-600 mb-4">
                Date Ticket
              </h3>
              <div className="space-y-4">
                <img 
                  src={selectedDate.image} 
                  alt={selectedDate.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-xl font-semibold text-gray-800">{selectedDate.title}</p>
                <p className="text-gray-600">🕒 {selectedDate.time}</p>
                <p className="text-gray-600">📍 {selectedDate.location}</p>
                <p className="text-rose-500 italic mt-4">"{selectedDate.note}"</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -left-4 top-1/2 w-8 h-8 bg-rose-100 rounded-full transform -translate-y-1/2" />
              <div className="absolute -right-4 top-1/2 w-8 h-8 bg-rose-100 rounded-full transform -translate-y-1/2" />
            </div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadTicket}
          className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full
                   hover:bg-rose-600 transition-colors duration-300 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Save Ticket
        </motion.button>
      </div>
    </motion.div>
  );
}