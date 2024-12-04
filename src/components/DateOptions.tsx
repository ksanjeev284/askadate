import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Music, Utensils, Star } from 'lucide-react';
import { FallingPetals } from './animations/FallingPetals';

interface DateOption {
  icon: JSX.Element;
  title: string;
  description: string;
  time: string;
  location: string;
  note: string;
  image: string;
}

interface DateOptionsProps {
  onSelect: (option: DateOption) => void;
}

export function DateOptions({ onSelect }: DateOptionsProps) {
  const dateOptions: DateOption[] = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Café Hopping at Jubilee Hills",
      description: "Let's explore the trendy cafés of Jubilee Hills",
      time: "Saturday, 2:00 PM",
      location: "Roastery Coffee House, Road No. 45",
      note: "They have the best coffee and ambiance in Hyderabad",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Evening at Tank Bund",
      description: "A romantic walk along the Hussain Sagar Lake",
      time: "Friday, 6:30 PM",
      location: "Tank Bund, Hussain Sagar",
      note: "Perfect for watching the sunset over the Buddha statue",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Dinner with a View",
      description: "Fine dining with a panoramic view of the city",
      time: "Saturday, 7:00 PM",
      location: "Altitude Lounge, Hyderabad Marriott",
      note: "The city lights look magical from here",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 py-8 px-4 md:py-16"
    >
      <FallingPetals />
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-dancing text-rose-700 text-center mb-8 md:mb-12">
          Choose Our Perfect Date
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dateOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => onSelect(option)}
              className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer
                       transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={option.image}
                  alt={`${option.title} - ${option.description}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="text-rose-500">{option.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{option.title}</h3>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{option.description}</p>
                
                <div className="space-y-1 md:space-y-2 text-sm text-gray-500">
                  <p>🕒 {option.time}</p>
                  <p>📍 {option.location}</p>
                </div>
                
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                  <p className="text-sm md:text-base text-rose-600 italic">"{option.note}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}