"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Site kökünde: public/audio/cuddle.mp3 */
const AUDIO_SRC = "/audio/cuddle.mp3";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlocked = useRef(false);
  const wantSound = useRef(true);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [missingFile, setMissingFile] = useState(false);

  const syncPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(!audio.paused && !audio.muted && wantSound.current);
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !wantSound.current) return;

    audio.loop = true;
    audio.volume = 0.72;
    audio.muted = false;

    if (audio.paused) {
      try {
        await audio.play();
        setMissingFile(false);
      } catch {
        /* tarayıcı henüz izin vermedi */
      }
    }
    syncPlaying();
  }, [syncPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";

    const onPlay = () => syncPlaying();
    const onPause = () => syncPlaying();
    const onError = () => setMissingFile(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    const unlock = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      void startPlayback();
    };

    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("keydown", unlock, { capture: true });
    window.addEventListener("touchstart", unlock, { capture: true });
    window.addEventListener("eylul-unlock-audio", unlock);

    const keepAlive = window.setInterval(() => {
      if (!unlocked.current || !wantSound.current) return;
      const a = audioRef.current;
      if (a && a.paused && !a.muted) void startPlayback();
    }, 4000);

    const onVisible = () => {
      if (document.visibilityState === "visible" && unlocked.current) {
        void startPlayback();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
      window.removeEventListener("touchstart", unlock, { capture: true });
      window.removeEventListener("eylul-unlock-audio", unlock);
      window.clearInterval(keepAlive);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [startPlayback, syncPlaying]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!unlocked.current) {
      window.dispatchEvent(new Event("eylul-unlock-audio"));
      return;
    }

    if (wantSound.current) {
      wantSound.current = false;
      audio.muted = true;
      setMuted(true);
      setPlaying(false);
    } else {
      wantSound.current = true;
      audio.muted = false;
      setMuted(false);
      void startPlayback();
    }
  };

  const statusLine = missingFile
    ? "dosya yok · public/audio/cuddle.mp3"
    : muted
      ? "sessiz"
      : playing
        ? "çalıyor"
        : "dokun · başlasın";

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop playsInline preload="auto" />

      <button
        type="button"
        onClick={toggle}
        className="fixed right-5 bottom-5 left-5 z-[110] mx-auto max-w-[340px] border border-ivory/25 bg-black px-5 py-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:left-auto md:w-[340px]"
        aria-label={muted ? "Sesi aç" : "Sesi kapat"}
      >
        <span className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
              playing ? "bg-ivory" : "bg-ivory/25"
            }`}
          />
          <span>
            <span className="block font-serif text-[16px] leading-snug text-ivory">
              Dinlediğimde aklıma gelen şarkımız sevgilim.
            </span>
            <span className="mt-1.5 block text-[10px] tracking-[0.22em] text-ivory/45 uppercase">
              {statusLine} · cuddle
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
