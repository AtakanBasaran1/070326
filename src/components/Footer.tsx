import { MEETING_LABEL } from "@/lib/photos";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-black px-5 pt-16 pb-44 text-center md:pb-16">
      <p className="font-serif text-3xl text-ivory italic">Eylül&apos;üme..</p>
      <p className="mt-6 text-[11px] tracking-[0.4em] text-ivory/40 uppercase">
        {MEETING_LABEL}
      </p>
    </footer>
  );
}
