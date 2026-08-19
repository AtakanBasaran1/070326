"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Site kökünde: public/audio/him-and-i.mp3 */
const AUDIO_SRC = "/audio/him-and-i.mp3";

export default function SampleAmbientAudio() {
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

  const beginSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    unlocked.current = true;
    wantSound.current = true;
    setMuted(false);
    audio.loop = true;
    audio.volume = 0.72;
    audio.muted = false;

    try {
      await audio.play();
      setMissingFile(false);
    } catch {
      /* tarayıcı henüz izin vermedi */
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

    const unlockFromPage = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-cuddle-box]")) return;
      if (unlocked.current) return;
      void beginSound();
    };

    const onUnlockEvent = () => {
      void beginSound();
    };

    window.addEventListener("pointerdown", unlockFromPage, { capture: true });
    window.addEventListener("keydown", unlockFromPage, { capture: true });
    window.addEventListener("touchstart", unlockFromPage, { capture: true });
    window.addEventListener("eylul-unlock-audio", onUnlockEvent);

    const keepAlive = window.setInterval(() => {
      if (!unlocked.current || !wantSound.current) return;
      const a = audioRef.current;
      if (a && a.paused && !a.muted) void beginSound();
    }, 4000);

    const onVisible = () => {
      if (document.visibilityState === "visible" && unlocked.current) {
        void beginSound();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", unlockFromPage, {
        capture: true,
      });
      window.removeEventListener("keydown", unlockFromPage, { capture: true });
      window.removeEventListener("touchstart", unlockFromPage, {
        capture: true,
      });
      window.removeEventListener("eylul-unlock-audio", onUnlockEvent);
      window.clearInterval(keepAlive);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [beginSound, syncPlaying]);

  const onBoxClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const isAudible =
      playing && !muted && wantSound.current && !audio.paused && !audio.muted;

    if (isAudible) {
      wantSound.current = false;
      audio.muted = true;
      setMuted(true);
      setPlaying(false);
      return;
    }

    void beginSound();
  };

  const statusLine = missingFile
    ? "dosya yok · public/audio/him-and-i.mp3"
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
        data-cuddle-box
        onClick={onBoxClick}
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
              {statusLine} · him &amp; i
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
