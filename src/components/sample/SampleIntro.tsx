"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  isCorrectAnswer,
  pickQuestions,
  type GateQuestion,
} from "@/lib/sampleGate";

type Phase = "ask" | "welcome";

export default function SampleIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("ask");
  const [queue, setQueue] = useState<GateQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [shake, setShake] = useState(false);
  const finished = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQueue(pickQuestions());
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    if (phase !== "ask") return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 280);
    return () => window.clearTimeout(id);
  }, [phase, index]);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!queue || phase !== "ask") return;

    const current = queue[index];
    const answer = value.trim();
    if (!answer || !isCorrectAnswer(current, answer)) {
      setWrong(true);
      setShake(false);
      window.setTimeout(() => setShake(true), 10);
      return;
    }

    setWrong(false);
    setShake(false);
    setValue("");

    if (index === queue.length - 1) {
      setPhase("welcome");
      return;
    }

    setIndex((i) => i + 1);
  };

  const current = queue?.[index];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black ${
        phase === "welcome" ? "cursor-pointer" : ""
      }`}
      onPointerDown={() => {
        window.dispatchEvent(new Event("eylul-unlock-audio"));
      }}
      onClick={phase === "welcome" ? finish : undefined}
    >
      <div className="relative z-10 w-full max-w-2xl px-8 text-center">
        {phase === "ask" && (
          <>
            <p className="mb-8 font-serif text-lg leading-snug text-ivory/70 italic sm:text-xl">
              bu soruyu bilebilecek misin?
              <br />
              yoksa aşk iptal mi olsun?
            </p>
            <div className="mx-auto mb-8 h-px w-24 bg-ivory/60" />
          </>
        )}

        <AnimatePresence mode="wait">
          {phase === "ask" && current && (
            <motion.form
              key={current.id}
              onSubmit={submit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className={shake ? "gate-shake" : undefined}>
                <p className="font-serif text-3xl leading-snug text-ivory italic sm:text-4xl">
                  {current.prompt}
                </p>

                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setWrong(false);
                    setValue(e.target.value);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label={current.prompt}
                  className="mt-10 w-full border-0 border-b border-ivory/25 bg-transparent py-3 text-center font-serif text-2xl text-ivory outline-none transition-colors placeholder:text-ivory/20 focus:border-ivory/70"
                />

                <p
                  className={`mt-4 h-5 text-[11px] tracking-[0.28em] uppercase ${
                    wrong ? "text-ivory/50" : "text-transparent"
                  }`}
                >
                  değil
                </p>

                <button
                  type="submit"
                  className="mt-6 text-[11px] tracking-[0.4em] text-ivory/55 uppercase transition-colors hover:text-ivory"
                >
                  devam
                </button>

                {queue.length > 1 && (
                  <p className="mt-8 text-[10px] tracking-[0.35em] text-ivory/30 uppercase">
                    {index + 1} / {queue.length}
                  </p>
                )}
              </div>
            </motion.form>
          )}

          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-serif text-3xl leading-snug text-ivory italic sm:text-4xl md:text-[2.6rem]">
                Aşkımızı temsil eden, özenle hazırladığım o hediyeye hoş geldin
                sevgilim.
              </p>
              <div className="mx-auto mt-10 h-px w-24 bg-ivory/60" />
              <p className="mt-10 text-[11px] tracking-[0.35em] text-ivory/45 uppercase">
                devam etmek için dokun güzelim.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
