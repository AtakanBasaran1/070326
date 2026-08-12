"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "GCvmkbFPIWM";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (n: number) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function AmbientAudio() {
  const playerRef = useRef<YTPlayer | null>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  const play = () => {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    player.setVolume(64);
    player.playVideo();
  };

  useEffect(() => {
    const boot = () => {
      if (!window.YT?.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player("yt-cuddle", {
        videoId: VIDEO_ID,
        width: "200",
        height: "200",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: VIDEO_ID,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(64);
            e.target.unMute();
            e.target.playVideo();
            setReady(true);
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === window.YT?.PlayerState.ENDED) {
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      boot();
      return;
    }

    if (
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
  }, []);

  useEffect(() => {
    if (!ready || muted) return;
    play();

    const unlock = () => play();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [ready, muted]);

  const toggle = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      player.playVideo();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-0 h-[200px] w-[200px] overflow-hidden opacity-[0.02]">
        <div id="yt-cuddle" />
      </div>

      <button
        type="button"
        onClick={toggle}
        className="fixed right-5 bottom-5 left-5 z-[110] mx-auto max-w-[340px] border border-ivory/25 bg-black px-5 py-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:left-auto md:w-[340px]"
        aria-label={muted ? "Sesi aç" : "Sesi kapat"}
      >
        <span className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${muted ? "bg-ivory/25" : "bg-ivory"}`}
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
    </>
  );
}
