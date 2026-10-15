import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Tiles } from "@/components/Tiles";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { DownloadLink } from "@/components/DownloadLink";
import { PHOTOS } from "@/data/photos";
import { OPF25 } from "@/data/gallery";
import { DOWNLOADS, FESTIVAL, FOCUS_AREAS, IN_KIND, TIERS, VENDOR_BAZAAR, WHY_PARTNER, mailto } from "@/data/festival";
import { TONE_BORDER, TONE_FILL, TONE_TEXT, cn, type Tone } from "@/lib/utils";

const tierMail = (tier: string) =>
  mailto(
    `${tier} partnership: OPF ${FESTIVAL.year}`,
    `Organisation:\nContact person:\nPhone:\nTier: ${tier}\n\nAnything we should know:\n`,
  );

export default function Partner() {
  return (
    <>
      <Seo
        title="Partner with us"
        path="/partner"
        description={`Sponsor or partner with the ${FESTIVAL.name} ${FESTIVAL.year}: four tiers from ₦2,000,000, in-kind partnerships and a vendor bazaar. Confirm by ${FESTIVAL.partnerDeadline}.`}
      />

      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <Tiles cols={3} rows={3} seed={5} className="pointer-events-none absolute right-0 top-[72px] hidden h-[315px] w-[315px] lg:block" />
        <div className="wrap relative">
          <p className="label text-sun">Sponsorship & partnership · OPF {FESTIVAL.year}</p>
          <h1 className="display mt-6 max-w-4xl text-balance text-[2.8rem] leading-[0.95] sm:text-7xl">Turn creative expression into measurable impact.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
            Align your brand with a youth-focused advocacy platform reaching {FESTIVAL.audience} students, educators and cultural leaders across Ogun State, with a documented impact report you can carry into your CSR and ESG reporting.
          </p>
          <p className="mt-10 inline-block bg-sky px-4 py-3 font-display font-bold text-ink">
            Confirm your tier by {FESTIVAL.partnerDeadline} to appear on every publicity and production material.
          </p>
          <div className="mt-8">
            <DownloadLink file={DOWNLOADS.sponsorship} className="text-left" />
          </div>
        </div>
      </section>

      <section className="border-y border-line py-20">
        <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {WHY_PARTNER.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <p className={cn("display text-4xl", TONE_TEXT[(["sun", "pink", "teal", "sky"] as Tone[])[i]])}>0{i + 1}</p>
              <h2 className="display mt-4 text-xl">{w.title}</h2>
              <p className="mt-3 text-muted">{w.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="seen-title" className="bg-ink-raised py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="label text-teal">Seen at OPF 2025</p>
            <h2 id="seen-title" className="display mt-4 text-4xl leading-[0.98] sm:text-5xl">Your brand, in the room.</h2>
            <p className="mt-4 text-lg text-muted">Partners are on the backdrop, on the team's shirts and in front of every guest who walks in.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Photo photo={OPF25["045"]} frame="aspect-[4/3]" caption="Golden Penny Foods at OPF 2025" sizes="(min-width: 768px) 33vw, 100vw" />
            <Photo photo={OPF25["002"]} frame="aspect-[4/3]" caption="The partner backdrop, OPF 2025" sizes="(min-width: 768px) 33vw, 100vw" />
            <Photo photo={PHOTOS.awardFirst} frame="aspect-[4/3]" caption="Prize giving" sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="label text-pink">Sponsorship tiers</p>
            <h2 className="display mt-4 text-4xl leading-[0.98] sm:text-6xl">Four ways in.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <article className={cn("flex h-full flex-col border-t-8 bg-ink-raised p-7", TONE_BORDER[t.tone as Tone])}>
                  <h3 className="label text-paper">{t.name} sponsor</h3>
                  <p className={cn("display mt-3 text-4xl", TONE_TEXT[t.tone as Tone])}>{t.price}</p>
                  <p className="mt-2 text-sm text-muted">{t.availability}</p>
                  <ul className="mt-7 space-y-3">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-paper/90">
                        <Check className={cn("mt-1 h-4 w-4 shrink-0", TONE_TEXT[t.tone as Tone])} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={tierMail(t.name)} className={cn("btn mt-auto pt-8 !px-0 justify-start", TONE_TEXT[t.tone as Tone])}>
                    Enquire about {t.name} <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-raised py-24 sm:py-32">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="label text-teal">In-kind partnerships</p>
            <h2 className="display mt-4 text-4xl leading-[0.98] sm:text-6xl">Give what you do best.</h2>
            <p className="mt-6 text-lg text-muted">
              Contribute products, services or expertise in place of, or alongside, a cash sponsorship. We'll shape the package around your marketing and CSR goals.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {IN_KIND.map((k, i) => (
              <Reveal key={k.title} delay={i * 0.06}>
                <article className={cn("h-full p-8", TONE_FILL[k.tone as Tone])}>
                  <h3 className="display text-2xl">{k.title}</h3>
                  <p className="mt-4 opacity-90">{k.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-col gap-4 border border-line p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="display text-2xl">{VENDOR_BAZAAR.title}</h3>
              <p className="mt-2 text-muted">
                {VENDOR_BAZAAR.detail} {VENDOR_BAZAAR.note}
              </p>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="display text-3xl text-sun">{VENDOR_BAZAAR.fee}</p>
              <a href={mailto(`Vendor Bazaar slot: OPF ${FESTIVAL.year}`, "Business name:\nWhat you sell:\nContact person and phone:\n")} className="mt-2 inline-block text-sun hover:underline">
                Request a slot
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="label text-sun">Impact you can report</p>
            <h2 className="display mt-4 text-4xl leading-[0.98] sm:text-5xl">Global goals, local action.</h2>
            <p className="mt-6 text-lg text-muted">
              After the festival, every partner receives an official impact report: attendance, participating schools, media impressions, broadcast reach, photographs and student outcomes, mapped to the UN Sustainable Development Goals.
            </p>
          </Reveal>
          <ul className="border-t border-line">
            {FOCUS_AREAS.map((f) => (
              <li key={f.title} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-4">
                <span className="text-lg text-paper">{f.title}</span>
                <span className={cn("label text-xs", TONE_TEXT[f.tone as Tone])}>{f.sdg}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-24">
        <div className="wrap flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-4xl leading-[0.98] sm:text-5xl">Ready to partner?</h2>
            <p className="mt-4 text-lg text-muted">
              Download the full proposal, or write to the Secretariat to confirm your tier. Payment details are shared with confirmed partners, and every payment receives an official acknowledgement.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 lg:items-end">
            <a href={tierMail("Partnership")} className="btn-sun">
              Email the Secretariat <ArrowRight className="h-5 w-5" />
            </a>
            <DownloadLink file={DOWNLOADS.sponsorship} className="text-left" />
          </div>
        </div>
      </section>
    </>
  );
}
