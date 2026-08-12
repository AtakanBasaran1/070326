"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "GCvmkbFPIWM";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (n: number) => void;
  getPlayerState?: () => number;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function AmbientAudio() {
  const playerRef = useRef<YTPlayer | null>(null);
  const wantSound = useRef(true);
  const heardGesture = useRef(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const ensure = (loud: boolean) => {
    const player = playerRef.current;
    if (!player) return;
    if (loud && wantSound.current) {
      player.unMute();
      player.setVolume(80);
    }
    const state = player.getPlayerState?.();
    if (state !== 1 && state !== 3) {
      player.playVideo();
    }
  };

  useEffect(() => {
    const mark = () => {
      heardGesture.current = true;
      if (wantSound.current) ensure(true);
    };

    window.addEventListener("pointerdown", mark, { capture: true });
    window.addEventListener("keydown", mark, { capture: true });
    window.addEventListener("touchstart", mark, { capture: true });
    window.addEventListener("eylul-unlock-audio", mark);
    return () => {
      window.removeEventListener("pointerdown", mark, { capture: true });
      window.removeEventListener("keydown", mark, { capture: true });
      window.removeEventListener("touchstart", mark, { capture: true });
      window.removeEventListener("eylul-unlock-audio", mark);
    };
  }, []);

  useEffect(() => {
    const boot = () => {
      if (!window.YT?.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player("yt-cuddle", {
        videoId: VIDEO_ID,
        width: "320",
        height: "180",
        host: "https://www.youtube.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: VIDEO_ID,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(80);
            e.target.mute();
            e.target.playVideo();
            if (heardGesture.current && wantSound.current) {
              e.target.unMute();
            }
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            const playingNow = e.data === 1 || e.data === 3;
            setPlaying(playingNow);
            if (e.data === 0 || e.data === 2) {
              if (wantSound.current) e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      boot();
    } else if (
      !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      boot();
    };

    const keepAlive = window.setInterval(() => {
      if (!wantSound.current) return;
      ensure(heardGesture.current);
    }, 2500);

    const onVisible = () => {
      if (document.visibilityState === "visible" && wantSound.current) {
        ensure(heardGesture.current);
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(keepAlive);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const toggle = () => {
    const player = playerRef.current;
    heardGesture.current = true;
    if (!player) return;

    if (muted || !playing) {
      wantSound.current = true;
      setMuted(false);
      player.unMute();
      player.setVolume(80);
      player.playVideo();
      return;
    }

    wantSound.current = false;
    player.mute();
    setMuted(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative fixed right-5 bottom-5 left-5 z-[110] mx-auto max-w-[340px] overflow-hidden border border-ivory/25 bg-black px-5 py-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:left-auto md:w-[340px]"
      aria-label={muted ? "Sesi aç" : "Sesi kapat"}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div id="yt-cuddle" className="h-full min-h-[180px] w-full" />
        <div className="absolute inset-0 bg-black/92" />
      </div>
      <span className="relative z-10 flex items-start gap-3">
        <span
          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
            muted ? "bg-ivory/25" : "bg-ivory"
          }`}
        />
        <span>
          <span className="block font-serif text-[16px] leading-snug text-ivory">
            Dinlediğimde aklıma gelen şarkımız sevgilim.
          </span>
          <span className="mt-1.5 block text-[10px] tracking-[0.22em] text-ivory/45 uppercase">
            {muted ? "sessiz" : "çalıyor"} · cuddle
          </span>
        </span>
      </span>
    </button>
  );
}
