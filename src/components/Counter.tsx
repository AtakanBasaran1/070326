"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MEETING_DATE } from "@/lib/photos";

type Time = { days: number; hours: number; minutes: number; seconds: number };

function diffFrom(start: Date): Time {
  const now = Date.now();
  const ms = Math.max(0, now - start.getTime());
  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export default function Counter() {
  const [time, setTime] = useState<Time>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(diffFrom(MEETING_DATE));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Gün", value: time.days },
    { label: "Saat", value: time.hours },
    { label: "Dakika", value: time.minutes },
    { label: "Saniye", value: time.seconds },
  ];

  return (
    <section id="zaman" className="relative bg-wine-deep py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.p
          className="text-[11px] tracking-[0.45em] text-gold uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Kesilmeyen şerit
        </motion.p>
        <motion.h2
          className="mt-4 font-serif text-4xl text-ivory sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tanıştığımızdan beri..
        </motion.h2>
        <div className="ornament mt-8">
          <span className="text-[10px] tracking-[0.4em] uppercase">
            07.03.26
          </span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="border border-ivory/15 bg-black/40 px-4 py-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-serif text-4xl text-ivory tabular-nums sm:text-5xl md:text-6xl">
                {mounted
                  ? item.label === "Gün"
                    ? item.value
                    : String(item.value).padStart(2, "0")
                  : "—"}
              </p>
              <p className="mt-3 text-[10px] tracking-[0.32em] text-gold uppercase">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
