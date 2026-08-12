"use client";

import { motion } from "framer-motion";

export default function Hearts() {
  const hearts = [
    { left: "8%", size: 10, delay: 0, duration: 14 },
    { left: "18%", size: 14, delay: 3, duration: 18 },
    { left: "27%", size: 8, delay: 7, duration: 16 },
    { left: "41%", size: 12, delay: 1.5, duration: 20 },
    { left: "55%", size: 9, delay: 5, duration: 15 },
    { left: "68%", size: 13, delay: 2, duration: 19 },
    { left: "79%", size: 8, delay: 8, duration: 17 },
    { left: "91%", size: 11, delay: 4, duration: 21 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="heart-particle"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
