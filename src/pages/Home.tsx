import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Tiles } from "@/components/Tiles";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import { Photo } from "@/components/Photo";
import { DownloadLink } from "@/components/DownloadLink";
import { PHOTOS } from "@/data/photos";
import { BACKING, COMMITTEE, DOWNLOADS, FESTIVAL, FOCUS_AREAS, MISSION, RUN_OF_SHOW, TRACKS, TRACK_RECORD, mailto } from "@/data/festival";
import { TONE_BORDER, TONE_FILL, TONE_TEXT, cn, type Tone } from "@/lib/utils";

const SectionHead = ({ kicker, title, lead, tone = "sun" }: { kicker: string; title: string; lead?: string; tone?: Tone }) => (
  <Reveal className="max-w-3xl">
    <p className={cn("label", TONE_TEXT[tone])}>{kicker}</p>
    <h2 className="display mt-4 text-balance text-4xl leading-[0.98] sm:text-6xl">{title}</h2>
    {lead && <p className="mt-6 text-lg leading-relaxed text-muted">{lead}</p>}
  </Reveal>
);

export default function Home() {
  return (
    <>
      <Seo description={`${FESTIVAL.name} ${FESTIVAL.year}: ${FESTIVAL.theme}. ${FESTIVAL.date}, ${FESTIVAL.venue}, ${FESTIVAL.city}.`} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-40 lg:pb-28">
        <Tiles cols={3} rows={4} seed={3} className="pointer-events-none absolute right-0 top-[72px] hidden h-[420px] w-[315px] opacity-90 lg:block xl:h-[520px] xl:w-[390px]" />
        <Tiles cols={6} rows={1} seed={19} className="pointer-events-none absolute right-0 top-[72px] h-14 w-[336px] lg:hidden" />
        <div className="wrap relative">
          <p className="label text-sun">
            {FESTIVAL.short} {FESTIVAL.year} · {FESTIVAL.tagline}
          </p>
          <h1 className="display mt-6 max-w-4xl text-balance text-[3.1rem] leading-[0.92] sm:text-7xl lg:text-[6.5rem]">
            <span className="sr-only">
              {FESTIVAL.name} {FESTIVAL.year}:{" "}
            </span>
            Artistic expression <span className="text-pink">for</span> <span className="text-teal">advocacy.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
            A day of poetry, performance and purpose, where students, schools and creatives across Ogun State turn the stage into a voice for change.
          </p>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-sun" />
              <span className="label text-paper">
                {FESTIVAL.date} · 10AM to 3PM
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-pink" />
              <span className="label text-paper">
                {FESTIVAL.venue}, Abeokuta
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/partner" className="btn-sun">
              Partner with OPF {FESTIVAL.year} <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#competition" className="btn-line">
              Enter the competition
            </a>
          </div>

          <div className="mt-16">
            <Countdown />
          </div>
        </div>
      </section>

      {/* Faces of the festival */}
      <section aria-label="Scenes from past festivals" className="pb-px">
        <ul className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {(
            [
              [PHOTOS.performerBanner, undefined],
              [PHOTOS.readerBeret, "56% 50%"],
              [PHOTOS.slamJunior, "50% 30%"],
              [PHOTOS.audienceApplause, "50% 40%"],
            ] as const
          ).map(([p, pos]) => (
            <li key={p.src}>
              <Photo photo={p} position={pos} frame="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>

      {/* Numbers */}
      <section aria-label="At a glance" className="border-y border-line">
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {(
              [
                [String(FESTIVAL.founded), "Founded", "sun"],
                [FESTIVAL.audience, "Curated audience", "teal"],
                ["3", "Competition tracks", "pink"],
                ["5", "Focus areas", "sky"],
              ] as const
            ).map(([n, label, tone]) => (
              <div key={label} className="flex flex-col-reverse bg-ink px-5 py-10 md:px-8 md:py-14">
                <dt className="label mt-3 text-muted">{label}</dt>
                <dd className={cn("display whitespace-nowrap text-3xl sm:text-4xl lg:text-5xl", TONE_TEXT[tone])}>{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The festival: mission and focus areas */}
      <section id="festival" className="scroll-mt-20 py-24 sm:py-32">
        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <SectionHead kicker="The festival" title="Poetry with a purpose." lead={MISSION} />
            <Reveal>
              <Photo photo={PHOTOS.circle} frame="aspect-[7/5]" />
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {FOCUS_AREAS.map((f, i) => (
              <li key={f.title} className="bg-ink">
                <Reveal delay={i * 0.06} className="flex h-full flex-col p-6">
                  <span className={cn("block h-12 w-12", TONE_FILL[f.tone as Tone])} style={{ borderTopRightRadius: i % 2 ? 0 : "100%", borderBottomLeftRadius: i % 2 ? "100%" : 0 }} />
                  <h3 lang="en" className="display mt-8 text-2xl leading-tight [hyphens:auto] lg:text-xl">{f.title}</h3>
                  <p className="mt-3 text-muted">{f.detail}</p>
                  <p className={cn("label mt-auto pt-8 text-xs", TONE_TEXT[f.tone as Tone])}>{f.sdg}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Competition */}
      <section id="competition" className="scroll-mt-20 bg-ink-raised py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            kicker="The OPF Rally & Competition"
            tone="pink"
            title="Three stages. One theme."
            lead="Secondary schools and tertiary institutions across Ogun State compete on the theme of artistic expression for advocacy. Students, educators and chaperones all receive certificates and formal commendation."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className={cn("flex h-full flex-col border-t-8 bg-ink p-8", TONE_BORDER[t.tone as Tone])}>
                  <h3 className="display text-3xl">{t.name}</h3>
                  <dl className="mt-8 space-y-6">
                    <div>
                      <dt className="label text-muted">Who</dt>
                      <dd className="mt-1 text-paper/90">{t.pool}</dd>
                    </div>
                    <div>
                      <dt className="label text-muted">How</dt>
                      <dd className="mt-1 text-paper/90">{t.format}</dd>
                    </div>
                    <div>
                      <dt className="label text-muted">Prizes</dt>
                      <dd className={cn("mt-1 font-semibold", TONE_TEXT[t.tone as Tone])}>{t.prizes}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-[1fr_1.4fr_1.4fr]">
            <Reveal>
              <Photo photo={PHOTOS.slamBlazer} frame="aspect-[5/7]" caption="On stage" sizes="(min-width: 768px) 25vw, 100vw" />
            </Reveal>
            <Reveal delay={0.08} className="md:self-end">
              <Photo photo={PHOTOS.awardSecond} frame="aspect-[7/5]" caption="Prize giving" sizes="(min-width: 768px) 35vw, 100vw" />
            </Reveal>
            <Reveal delay={0.16} className="md:self-end">
              <Photo photo={PHOTOS.awardJunior} frame="aspect-[7/5]" caption="Junior category, third position" sizes="(min-width: 768px) 35vw, 100vw" />
            </Reveal>
          </div>
          <Reveal className="mt-12 flex flex-col gap-4 border border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl text-lg text-paper/90">
              <span className="font-semibold text-paper">Registering a school or institution?</span> The school entry brochure has every category, delegation size and key date. Enrolment is through the Secretariat.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <a href={mailto(`School registration: OPF ${FESTIVAL.year}`, "School or institution:\nCategory (Junior, Senior or Tertiary):\nContact person and phone:\n")} className="btn-sun">
                Register interest
              </a>
              <DownloadLink file={DOWNLOADS.school} className="text-left" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Run of show */}
      <section id="programme" className="scroll-mt-20 py-24 sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead kicker="Programme" tone="teal" title="The day, hour by hour." lead={`${FESTIVAL.date}, ${FESTIVAL.venue}, ${FESTIVAL.city}.`} />
            <Reveal className="mt-12 hidden max-w-[360px] lg:block">
              <Photo photo={PHOTOS.host} frame="aspect-[5/7]" sizes="360px" />
            </Reveal>
          </div>
          <ol className="border-t border-line">
            {RUN_OF_SHOW.map((r, i) => (
              <li key={r.time} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[7rem_1fr]">
                <span className={cn("display text-2xl tabular-nums", [TONE_TEXT.sun, TONE_TEXT.pink, TONE_TEXT.teal][i % 3])}>{r.time}</span>
                <span className="self-center text-lg text-paper/90">{r.item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About: track record, backing, committee */}
      <section id="about" className="scroll-mt-20 bg-ink-raised py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            kicker={`Since ${FESTIVAL.founded}`}
            title="Built in classrooms. Proven on stage."
            lead="The Ogun Poetry Festival is an annual cultural institution for literature, spoken word, civic leadership and youth creative enterprise."
          />
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {TRACK_RECORD.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={i * 0.08} className="h-full border-l-4 border-sun pl-6">
                  <p className="label text-sun">{t.year}</p>
                  <h3 className="display mt-3 text-2xl">{t.title}</h3>
                  <p className="mt-3 text-muted">{t.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-20 border-y border-line py-10">
            <p className="label text-muted">Backed by</p>
            <p className="display mt-4 text-2xl sm:text-3xl">{BACKING.ministry}</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg text-paper/85">
              {BACKING.partners.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-6 text-muted">Past keynote: {BACKING.keynote}.</p>
          </Reveal>

          <div className="mt-20">
            <p className="label text-pink">The Executive Organizing Committee</p>
            <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {COMMITTEE.map((m, i) => (
                <li key={m.name} className="flex items-center gap-5">
                  <span className={cn("flex h-16 w-16 shrink-0 items-center justify-center display text-xl", TONE_FILL[(["pink", "teal", "sun"] as Tone[])[i % 3]])}>
                    {m.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-paper">{m.name}</span>
                    <span className="block text-muted">{m.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery: open mics, workshops and the stage */}
      <section id="gallery" className="scroll-mt-20 py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            kicker="Gallery"
            tone="teal"
            title="Moments from the mic."
            lead="Open mics, workshops and festival days. This is what it looks like when young people take the stage."
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[PHOTOS.reading, PHOTOS.spokenWord, PHOTOS.bench, PHOTOS.readerFloral, PHOTOS.speakerMural].map((p, i) => (
              <li key={p.src} className={cn(i === 1 && "sm:row-span-2 lg:col-start-2 lg:row-start-1")}>
                <Reveal className="h-full">
                  <Photo
                    photo={p}
                    className="h-full"
                    frame={i === 1 ? "aspect-[5/7] sm:aspect-auto sm:h-full" : "aspect-[7/5]"}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner call to action */}
      <section className="relative overflow-hidden bg-ink-raised py-24 sm:py-32">
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="label text-sun">Partner with OPF {FESTIVAL.year}</p>
            <h2 className="display mt-4 text-balance text-4xl leading-[0.98] sm:text-6xl">Put your name behind young voices.</h2>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Four sponsorship tiers and in-kind partnerships, with a post-event impact report for your CSR and ESG reporting. Confirm by{" "}
              {FESTIVAL.partnerDeadline} to appear on every publicity and production material.
            </p>
            <Link to="/partner" className="btn-sun mt-10">
              See partnership options <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
          <Tiles cols={4} rows={4} seed={29} className="h-[280px] w-full max-w-[280px] justify-self-center sm:h-[340px] sm:max-w-[340px]" />
        </div>
      </section>
    </>
  );
}
