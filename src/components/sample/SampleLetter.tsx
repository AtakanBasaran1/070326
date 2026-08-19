"use client";

import { motion } from "framer-motion";
import FilmPhoto from "../FilmPhoto";
import { MEETING_LABEL } from "@/lib/samplePhotos";

export default function SampleLetter() {
  return (
    <section id="mektup" className="relative bg-black py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <motion.article
          className="flex flex-col justify-center border border-ivory/15 px-8 py-8 sm:px-10 sm:py-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-3xl italic text-ivory">Melis&apos;im.</p>
          <p className="mt-1 font-serif text-lg text-ivory/65 italic">
            Güzelim benim.
          </p>
          <div className="mt-5 space-y-3 font-serif text-[15px] leading-7 text-ivory/75">
            <p>
              Bu sadece bir web sitesi kesinlikle değil. Bu, o güzel, özel ve
              ölesiye aşkımızın sonsuza kadar sembolikleştirilip internete
              kazınmış bir versiyonu.
            </p>
            <p>
              Beni özlediğinde, bana sinirlendiğinde, canın sıkıldığında,
              gülmek istediğinde, mutlu olmak istediğinde ya da tüm bu
              karmaşık, derin ama bir o kadar da anlamlı duyguları bir arada
              yaşamak istediğinde buraya gel sevgilim.
            </p>
            <p>
              Çünkü ben seninle sadece gülüyor, ağlıyor veya öylesine bir şey
              yaşamıyorum. Melis&apos;im, ben aşkı seninle öğrendim. Bu bambaşka
              duyguyu her haliyle, her gün ve her an seninle yaşadım.
            </p>
            <p>
              Her şeye temkinli yaklaşırken senin farklı olduğunu benimsedim.
              Bu düşünce içime, kalbime kazındı. Bununla yaşamak bana bambaşka
              şeyler hissettiriyor.
            </p>
            <p>
              Bu sonsuz evrendeki en güzel aşkı, en güzel kadınla yaşadığım ve
              hissettiğim için çok mutluyum. Hipnoz edilmişçesine... Hayır
              sevgilim. Bu hipnoz değil. Seni delirmişçesine, yarınlar
              yokmuşçasına çok seviyorum.
            </p>
          </div>
          <p className="mt-6 text-right font-serif text-xl text-ivory italic">
            C.
          </p>
          <p className="mt-1 text-right text-[10px] tracking-[0.28em] text-ivory/40 uppercase">
            {MEETING_LABEL}
          </p>
        </motion.article>

        <motion.div
          className="still min-h-[320px] lg:min-h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-full">
            <FilmPhoto
              src="/sample-melis/letter.jpg"
              alt="Melis ve Can portresi"
              objectPosition="50% 20%"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
