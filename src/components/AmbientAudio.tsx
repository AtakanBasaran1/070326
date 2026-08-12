"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "GCvmkbFPIWM";

function embedUrl(mute: boolean) {
  const origin = encodeURIComponent(window.location.origin);
  return `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=${mute ? 1 : 0}&loop=1&playlist=${VIDEO_ID}&playsinline=1&controls=0&rel=0&modestbranding=1&enablejsapi=1&origin=${origin}`;
}

function sendCommand(iframe: HTMLIFrameElement, func: string) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*",
  );
}

export default function AmbientAudio() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const unlocked = useRef(false);
  const wantSound = useRef(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.title = "cuddle";
    iframe.allow = "autoplay; encrypted-media";
    iframe.src = embedUrl(true);
    iframe.setAttribute(
      "style",
      "position:fixed;right:20px;bottom:20px;width:320px;height:180px;opacity:0;pointer-events:none;z-index:109;border:0;",
    );
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    const unlock = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      sendCommand(iframe, "unMute");
      sendCommand(iframe, "playVideo");
    };

    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("keydown", unlock, { capture: true });
    window.addEventListener("touchstart", unlock, { capture: true });
    window.addEventListener("eylul-unlock-audio", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
      window.removeEventListener("touchstart", unlock, { capture: true });
      window.removeEventListener("eylul-unlock-audio", unlock);
      iframe.remove();
      iframeRef.current = null;
    };
  }, []);

  const toggle = () => {
    const iframe = iframeRef.current;
    if (!unlocked.current) {
      window.dispatchEvent(new Event("eylul-unlock-audio"));
      wantSound.current = true;
      setMuted(false);
      return;
    }

    if (wantSound.current) {
      wantSound.current = false;
      setMuted(true);
      if (iframe) sendCommand(iframe, "mute");
    } else {
      wantSound.current = true;
      setMuted(false);
      if (iframe) sendCommand(iframe, "unMute");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-5 bottom-5 left-5 z-[110] mx-auto max-w-[340px] border border-ivory/25 bg-black px-5 py-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:left-auto md:w-[340px]"
      aria-label={muted ? "Sesi aç" : "Sesi kapat"}
    >
      <span className="flex items-start gap-3">
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
