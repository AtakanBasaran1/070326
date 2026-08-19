import { MEETING_LABEL } from "@/lib/samplePhotos";

export default function SampleFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-black px-5 pt-16 pb-44 text-center md:pb-16">
      <p className="font-serif text-3xl text-ivory italic">Melis&apos;ime..</p>
      <p className="mt-6 text-[11px] tracking-[0.4em] text-ivory/40 uppercase">
        {MEETING_LABEL}
      </p>
    </footer>
  );
}
