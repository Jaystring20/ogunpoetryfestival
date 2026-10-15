import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { FESTIVAL } from "@/data/festival";
import { GALLERY_2025 } from "@/data/gallery";
import { PHOTOS, type Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

type Section = { id: string; title: string; photos: readonly Photo[] };

const EARLIER: Section[] = [
  { id: "competition", title: "The school competition and prize giving", photos: [PHOTOS.slamJunior, PHOTOS.slamBlazer, PHOTOS.performerBanner, PHOTOS.awardFirst, PHOTOS.awardSecond, PHOTOS.awardJunior, PHOTOS.host, PHOTOS.spokenWord, PHOTOS.audienceApplause, PHOTOS.audienceClapping] },
  { id: "kuta", title: "Open mics at Kuta Art Gallery", photos: [PHOTOS.reading, PHOTOS.readerBeret, PHOTOS.readerFloral, PHOTOS.speakerMural, PHOTOS.circle, PHOTOS.bench] },
];

/** A masonry grid: each photo keeps its own shape. Tapping one opens the viewer. */
function Grid({ section, tone }: { section: Section; tone: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h3 id={`${section.id}-title`} className={cn("display text-2xl sm:text-3xl", tone)}>
          {section.title}
        </h3>
        <p className="label shrink-0 text-xs text-muted">{section.photos.length} photos</p>
      </div>
      <ul className="mt-6 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {section.photos.map((p, i) => (
          <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden" aria-label={`View larger: ${p.alt}`}>
              <img
                src={p.small}
                srcSet={`${p.small} ${p.smallW ?? 800}w, ${p.src} ${p.w}w`}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                width={p.w}
                height={p.h}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full bg-ink-raised transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox photos={section.photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}

const TONES = ["text-sun", "text-pink", "text-teal", "text-sky"];

export default function Gallery() {
  const count2025 = GALLERY_2025.reduce((n, s) => n + s.photos.length, 0);
  return (
    <>
      <Seo title="Gallery" path="/gallery" description={`Photos from the ${FESTIVAL.name}: the 2025 festival, "The Truth in Our Scars", the school competition and our open mics.`} />

      <section className="pb-12 pt-32 sm:pt-40">
        <div className="wrap max-w-4xl">
          <p className="label text-teal">Gallery</p>
          <h1 className="display mt-6 text-balance text-[2.6rem] leading-[0.95] sm:text-6xl">Moments from the mic.</h1>
          <p className="mt-6 text-lg leading-relaxed text-paper/85">Poets, performers, schools, guests and the people who make it happen. Tap any photo to see it larger.</p>
          <nav aria-label="Gallery sections" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {[...GALLERY_2025, ...EARLIER].map((s) => (
              <a key={s.id} href={`#${s.id}`} className="label text-sm text-paper/80 hover:text-sun">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-ink-raised py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="label text-sun">2025 · {count2025} photos</p>
            <h2 className="display mt-4 text-4xl leading-[0.98] sm:text-5xl">The Truth in Our Scars</h2>
            <p className="mt-4 text-lg text-muted">Our 2025 flagship festival brought together over 200 youths, scholars, performers and creative professionals.</p>
          </Reveal>
          <div className="mt-14 space-y-16">
            {GALLERY_2025.map((s, i) => (
              <Grid key={s.id} section={s} tone={TONES[i % TONES.length]} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="label text-pink">Across the years</p>
            <h2 className="display mt-4 text-4xl leading-[0.98] sm:text-5xl">Classrooms, stages and open mics.</h2>
          </Reveal>
          <div className="mt-14 space-y-16">
            {EARLIER.map((s, i) => (
              <Grid key={s.id} section={s} tone={TONES[(i + 1) % TONES.length]} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="wrap flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="display text-3xl sm:text-4xl">Be in the 2026 photos.</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-sun">
              Register your school <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/partner" className="btn-line">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
