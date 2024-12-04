import React from 'react';
import { motion } from 'framer-motion';

export function FallingPetals() {
  const petals = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {petals.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360,
            x: `calc(${Math.random() * 100}vw)`,
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
          className="absolute w-4 h-4 bg-pink-200 rounded-full opacity-60"
          style={{
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}