"use client";

import { motion } from "framer-motion";
import FilmPhoto from "./FilmPhoto";

const banners: {
  src: string;
  alt: string;
  position: string;
  className?: string;
}[] = [
  {
    src: "/photos/banner-01.jpg",
    alt: "Eylül ve Atakan, omuz omuza",
    position: "50% 8%",
  },
  {
    src: "/photos/banner-02.jpg",
    alt: "Atakan, parkta Eylül'ü öperken",
    position: "50% 44%",
  },
  {
    src: "/photos/banner-03.jpg",
    alt: "Eylül, Atakan'ı yanağından öperken",
    position: "50% 40%",
    className: "!inset-y-0 !left-0 !right-auto !w-[142%]",
  },
];

export default function Banners() {
  return (
    <section id="kareler" className="bg-black">
      {banners.map((banner, i) => (
        <motion.div
          key={banner.src}
          className="relative h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[68vh]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <FilmPhoto
            src={banner.src}
            alt={banner.alt}
            objectPosition={banner.position}
            className={banner.className}
            priority={i === 0}
          />
          <div className="vignette-soft" />
        </motion.div>
      ))}
    </section>
  );
}
