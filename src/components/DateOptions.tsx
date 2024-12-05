import React, { useState } from 'react';
import { Coffee, Music, Utensils, Star, Palette, IceCream, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [favoriteCards, setFavoriteCards] = useState<number[]>([]);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
    // Trigger a small heart animation when hovering
    Array(3).fill(0).forEach((_, i) => {
      confetti({
        particleCount: 1,
        shapes: ['circle'],
        colors: ['#ff758f', '#ff477e', '#ff0a54'],
        angle: 45 + (i * 45),
        spread: 30,
        origin: { x: Math.random(), y: Math.random() }
      });
    });
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setFavoriteCards((prev: number[]) => 
      prev.includes(index) 
        ? prev.filter((i: number) => i !== index)
        : [...prev, index]
    );
  };

  const dateOptions: DateOption[] = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Morning Coffee & Pastries",
      description: "Start our day with coffee and sweet treats",
      time: "Saturday, 10:00 AM",
      location: "Roastery Coffee House, Road No. 45",
      note: "They say coffee dates are the best first dates ☕️",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Art Gallery Adventure",
      description: "Explore contemporary art together",
      time: "Saturday, 12:30 PM",
      location: "State Art Gallery, Madhapur",
      note: "Let's discover art and each other's perspectives 🎨",
      image: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=800"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Sunset at Tank Bund",
      description: "A romantic walk along the Hussain Sagar Lake",
      time: "Saturday, 5:30 PM",
      location: "Tank Bund, Hussain Sagar",
      note: "Perfect for watching the sunset together 🌅",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800"
    },
    {
      icon: <IceCream className="w-8 h-8" />,
      title: "Dessert Paradise",
      description: "Share some sweet moments over desserts",
      time: "Saturday, 4:00 PM",
      location: "Concu, Jubilee Hills",
      note: "Life is sweet with you 🍨",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Dinner with a View",
      description: "Fine dining with a panoramic view of the city",
      time: "Saturday, 7:30 PM",
      location: "Altitude Lounge, Hyderabad Marriott",
      note: "The city lights are magical, just like you ✨",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Stargazing Picnic",
      description: "Late evening picnic under the stars",
      time: "Saturday, 9:00 PM",
      location: "Secret Garden Cafe, Film Nagar",
      note: "Let's count stars and make wishes together 🌟",
      image: "https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=800"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Karaoke Night",
      description: "Sing your heart out and have fun together",
      time: "Saturday, 8:00 PM",
      location: "Melody Box, Jubilee Hills",
      note: "Let's make beautiful music together 🎤",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Cooking Class",
      description: "Learn to cook a romantic meal together",
      time: "Saturday, 3:00 PM",
      location: "Culinary Studio, Banjara Hills",
      note: "The best ingredients are love and laughter 👩‍🍳",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Escape Room Adventure",
      description: "Solve mysteries and puzzles together",
      time: "Saturday, 2:00 PM",
      location: "Mystery Rooms, Gachibowli",
      note: "Let's unlock the mystery of our hearts 🔍",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800"
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
        <motion.h2 
          className="text-3xl md:text-4xl font-dancing text-rose-700 text-center mb-8 md:mb-12"
          animate={{ 
            scale: [1, 1.02, 1],
            color: ['#be185d', '#ec4899', '#be185d']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Choose Our Perfect Date
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dateOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => handleCardHover(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
                onSelect(option);
              }}
              className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer
                       hover:shadow-2xl transition-all duration-300 relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleFavorite(e, index)}
                  className={`p-2 rounded-full ${
                    favoriteCards.includes(index) 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-white/80 text-rose-500'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={favoriteCards.includes(index) ? "currentColor" : "none"} />
                </motion.button>
              </div>

              <div className="h-48 overflow-hidden relative group">
                <img
                  src={option.image}
                  alt={`${option.title} - ${option.description}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <motion.div 
                    animate={hoveredCard === index ? {
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1],
                    } : {}}
                    className="text-rose-500"
                  >
                    {option.icon}
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{option.title}</h3>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{option.description}</p>
                
                <div className="space-y-1 md:space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <span className="animate-pulse">🕒</span> {option.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="animate-bounce">📍</span> {option.location}
                  </p>
                </div>
                
                <motion.div 
                  className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100"
                  animate={hoveredCard === index ? {
                    y: [0, -2, 0],
                  } : {}}
                >
                  <p className="text-sm md:text-base text-rose-600 italic">{option.note}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}