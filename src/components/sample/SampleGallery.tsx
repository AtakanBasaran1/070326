"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import FilmPhoto from "../FilmPhoto";
import { photos, type Photo } from "@/lib/samplePhotos";

export default function SampleGallery() {
  const [active, setActive] = useState<Photo | null>(null);
  const frames = useMemo(() => {
    const seen = new Set<string>();
    return photos.filter((photo) => {
      if (seen.has(photo.src)) return false;
      seen.add(photo.src);
      return true;
    });
  }, []);

  return (
    <section id="anilar" className="bg-black py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-snug text-ivory sm:text-4xl md:text-[2.6rem]">
            Her güzel ve özel anlarımızdan bazı kareler..
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {frames.map((photo, i) => (
            <motion.button
              key={`${photo.src}-${i}`}
              type="button"
              onClick={() => setActive(photo)}
              className="group relative aspect-[4/5] overflow-hidden border border-ivory/10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: (i % 6) * 0.03 }}
            >
              <FilmPhoto
                src={photo.src}
                alt={photo.alt}
                className="transition-transform duration-700 group-hover:scale-[1.03]"
                objectPosition="50% 28%"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/94 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              className="relative max-h-[88vh] w-full max-w-5xl"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="still">
                <div className="flex max-h-[80vh] min-h-[40vh] items-center justify-center overflow-hidden bg-black">
                  <FilmPhoto src={active.src} alt={active.alt} contain />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 text-[11px] tracking-[0.28em] text-ivory/55 uppercase"
              >
                Kapat
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
