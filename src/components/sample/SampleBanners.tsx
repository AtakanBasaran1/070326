"use client";

import { motion } from "framer-motion";
import FilmPhoto from "../FilmPhoto";

const banners: {
  src: string;
  alt: string;
  position: string;
  className?: string;
}[] = [
  {
    src: "/sample-melis/banner-01.jpg",
    alt: "Melis ve Can, omuz omuza",
    position: "50% 30%",
  },
  {
    src: "/sample-melis/banner-02.jpg",
    alt: "Can, parkta Melis'i öperken",
    position: "50% 35%",
  },
  {
    src: "/sample-melis/banner-03.jpg",
    alt: "Melis ve Can'ın neşeli bir anı",
    position: "50% 40%",
  },
];

export default function SampleBanners() {
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
