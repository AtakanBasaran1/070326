"use client";

import { useCallback, useState } from "react";
import AmbientAudio from "./AmbientAudio";
import Banners from "./Banners";
import Counter from "./Counter";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Intro from "./Intro";
import Letter from "./Letter";
import Navbar from "./Navbar";
import ThenNow from "./ThenNow";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <div className="grain" aria-hidden />
      {!ready && <Intro onDone={onDone} />}
      <AmbientAudio />
      {ready && (
        <div className="animate-[fadein_0.7s_ease]">
          <Navbar />
          <main>
            <Hero />
            <Banners />
            <Counter />
            <Gallery />
            <ThenNow />
            <Letter />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
