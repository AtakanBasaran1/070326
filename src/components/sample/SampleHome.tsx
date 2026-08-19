"use client";

import { useCallback, useState } from "react";
import SampleAmbientAudio from "./SampleAmbientAudio";
import SampleBanners from "./SampleBanners";
import SampleCounter from "./SampleCounter";
import SampleFooter from "./SampleFooter";
import SampleGallery from "./SampleGallery";
import SampleHero from "./SampleHero";
import SampleIntro from "./SampleIntro";
import SampleLetter from "./SampleLetter";
import SampleNavbar from "./SampleNavbar";
import SampleThenNow from "./SampleThenNow";

export default function SampleHome() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <div className="grain" aria-hidden />
      {!ready && <SampleIntro onDone={onDone} />}
      <SampleAmbientAudio />
      {ready && (
        <div className="animate-[fadein_0.7s_ease]">
          <SampleNavbar />
          <main>
            <SampleHero />
            <SampleBanners />
            <SampleCounter />
            <SampleGallery />
            <SampleThenNow />
            <SampleLetter />
          </main>
          <SampleFooter />
        </div>
      )}
    </>
  );
}
