"use client";

import { motion } from "framer-motion";
import FilmPhoto from "../FilmPhoto";
import { MEETING_LONG } from "@/lib/samplePhotos";

export default function SampleHero() {
  return (
    <section id="hero" className="relative flex min-h-svh flex-col bg-black">
      <div className="letterbox" />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <FilmPhoto
          src="/sample-melis/hero-beach.jpg"
          alt="Melis ve Can, gün batımında sahilde"
          priority
          className="hero-still kenburns absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

        <div className="relative z-10 flex h-full min-h-[72vh] items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
            <motion.p
              className="mb-5 text-[11px] tracking-[0.5em] text-ivory/70 uppercase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {MEETING_LONG}
            </motion.p>

            <motion.h1
              className="max-w-4xl font-serif text-5xl leading-[0.92] text-ivory sm:text-7xl md:text-[6.5rem]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35 }}
            >
              Melis&apos;ime..
            </motion.h1>

            <motion.div
              className="mt-8 h-px w-24 bg-ivory/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="mt-6 max-w-md font-serif text-lg text-ivory/70 italic sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.95 }}
            >
              Haziran&apos;da başlayan o masal. Hâlâ ilk günkü heyecanla.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="letterbox" />
    </section>
  );
}
