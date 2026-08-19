"use client";

import { motion } from "framer-motion";
import FilmPhoto from "../FilmPhoto";
import { babyPhoto } from "@/lib/samplePhotos";

export default function SampleThenNow() {
  return (
    <section id="baslangic" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          className="still mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <div className="relative aspect-[5/4] overflow-hidden bg-black">
            <FilmPhoto
              src={babyPhoto.src}
              alt={babyPhoto.alt}
              objectPosition="50% 30%"
            />
          </div>
        </motion.div>

        <motion.p
          className="mx-auto mt-10 max-w-xl text-center font-serif text-xl leading-8 text-ivory/80 sm:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Gözümde hala küçük bir kız çocuğusun. Seni böylesine saf bir şekilde
          sevdim sevgilim.
        </motion.p>
      </div>
    </section>
  );
}
