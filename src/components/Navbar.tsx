"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { MEETING_SHORT } from "@/lib/photos";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ivory/10 bg-black/85 py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="font-serif text-lg tracking-wide text-ivory sm:text-xl"
        >
          E <span className="text-ivory/60">&amp;</span> A
        </a>
        <p className="text-[10px] tracking-[0.28em] text-ivory/50 uppercase">
          {MEETING_SHORT}
        </p>
      </nav>
    </motion.header>
  );
}
