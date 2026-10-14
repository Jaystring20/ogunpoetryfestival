# Ogun Poetry Festival website

The official site of the Ogun Poetry Festival (OPF), an annual festival of
poetry, performance and advocacy in Ogun State, Nigeria, founded in 2023.
The 2026 edition, "Artistic Expression for Advocacy", is on Saturday
5 December 2026, 10:00 to 15:00, at the Cinema Hall, June 12 Cultural Centre,
Abeokuta.

This file is the handoff for anyone (or any Claude session) continuing the
build. Read it before changing anything.

## Stack

- Vite + React 18 + TypeScript (strict), React Router, react-helmet-async.
- Tailwind CSS 3 with brand tokens in `src/index.css` and `tailwind.config.ts`.
- framer-motion for scroll reveals (`src/components/Reveal.tsx`); lucide-react icons.
- Deploys on Vercel (`vercel.json` rewrites every non-`/api` path to the SPA).
- No backend yet. Forms are `mailto:` links to the Secretariat for now.

Commands: `npm run dev`, `npm run typecheck`, `npm run build`.
Check both before every commit; both must pass.

## Where things live

| Path | What |
| --- | --- |
| `src/data/festival.ts` | **Every fact on the site**: dates, venue, theme, tracks, prizes, run of show, tiers, committee, contacts. Change facts here only. |
| `src/pages/Home.tsx` | Home: hero and countdown, photo band, numbers, focus areas (SDGs), competition tracks and prize photos, run of show, track record, backing, committee, gallery, partner CTA. |
| `src/pages/Register.tsx` | `/register`: school and institution registration form. Sends to a Google Sheet via `src/lib/registration.ts` and `apps-script/registration.gs` (setup: `docs/google-sheet-setup.md`); falls back to a pre-filled email while `REGISTRATION.endpoint` is empty. |
| `src/pages/Partner.tsx` | `/partner`: why partner, photo band, four sponsorship tiers, in-kind partners, Vendor Bazaar, impact reporting. |
| `src/data/photos.ts`, `src/assets/photos/` | Real OPF event photos (1600px plus an `-800` copy each) with alt text. Show them with `<Photo>` (`src/components/Photo.tsx`). |
| `src/components/Tiles.tsx` | The geometric tile motif (see Design). |
| `src/components/Navbar.tsx`, `Footer.tsx`, `Countdown.tsx`, `Seo.tsx` | Shell pieces. |
| `src/assets/opf-logo.png` | Full-colour logo, transparent background. |
| `public/og-image.jpg` | Logo on indigo, used as the social sharing image. |
| `public/downloads/` | Brochures linked from the site (`DOWNLOADS` in `festival.ts`, `<DownloadLink>`): the School Entry Brochure and the Sponsorship Proposal. The proposal's bank account was removed from its last page; any new version must be redacted the same way before it goes in. |
| `docs/brief.md` | The source content from the 2026 Prospectus and Sponsorship Proposal, plus open questions. |

## Design

The look is bold, geometric and joyful, taken from the logo and the 2026
prospectus. Keep it that way.

- **Colour.** Deep indigo ground `#080038` (`bg-ink`), raised panels
  `bg-ink-raised`. Accents straight from the logo: pink `#F81050`, teal
  `#08B098`, yellow `#F8C800` (`sun`), plus sky `#29D3EA` from the
  prospectus, used sparingly. Text is `paper` (near white) and `muted`.
  Yellow is the primary action colour (`.btn-sun`).
- **Type.** Archivo for display (`.display`: heavy and set wide, like the
  poster headlines), Archivo condensed caps for labels, dates and times
  (`.label`), DM Sans for body, Fraunces italic (`font-verse`) only for
  poetic lines such as the tagline. Loaded from Google Fonts in `index.html`.
- **Shape.** Square corners everywhere. The signature motif is blocks of
  square tiles, each a quarter circle, triangle, half circle or square, in the
  logo colours: the same geometry as the logo lettering. Use `<Tiles>` with a
  different `seed` per placement. Don't overuse it: one block per section at
  most.
- **Layout.** `.wrap` for the page width. Section rhythm is `py-24 sm:py-32`,
  alternating `bg-ink` and `bg-ink-raised`. A section starts with a kicker
  (`.label` in an accent colour), a short display headline and a muted lead.
- **Motion.** Gentle rise-in on scroll via `<Reveal>`. Everything respects
  `prefers-reduced-motion`.
- **Accessibility.** Skip link, visible yellow focus rings, real headings in
  order, `aria-label`s on icon buttons. Check every page at 390px wide: no
  sideways scrolling.

## Writing rules

- Plain, warm, confident. Short sentences. Speak to schools, students,
  creatives and sponsors directly.
- No em-dashes in visible copy. Use a comma, a colon or a new sentence.
- Never invent facts, numbers, testimonials, partners or names. If it isn't in
  `docs/brief.md` or confirmed by the organisers, leave a clearly marked
  placeholder.
- Use real photographs of OPF only. Don't use stock or AI images of people
  presented as OPF participants.
- Don't publish the remittance bank account on the site; it's a personal
  account. Payment details go to confirmed partners by the Secretariat.

## Status (head start)

Done:
- Home and Partner pages with all 2026 content from the prospectus and proposal.
- Brand system, logo, favicon, social image, countdown, responsive navigation.
- Real photos from past events across Home (photo band, festival, competition,
  programme, gallery) and Partner. `team-banner` is in `PHOTOS` but not shown
  until the organisers confirm who is in it (and ideally send a larger copy).

Next, roughly in priority order:
1. **Domain and deploy.** Connect the repo to a new Vercel project; confirm the
   domain and update `SITE` in `src/components/Seo.tsx`.
2. **Photo captions and credits.** Confirm which event and year each set is
   from (Kuta Art Gallery sessions; the hall with the "Poetry Slam" banner),
   and whether to credit Grade A Shots. Captions stay generic until then.
3. **School and institution registration.** Form done at `/register`, saving
   to a Google Sheet through Apps Script. Remaining: the organisers deploy the
   script and the web app URL goes into `REGISTRATION.endpoint` (or
   `VITE_REGISTRATION_ENDPOINT`).
4. **Senior Secondary video entries.** Upload or link field for the advocacy
   video screening.
5. **Sponsor enquiries.** A form per tier that stores enquiries and alerts the
   Secretariat; later, a partner logo wall.
6. **Admin dashboard.** Team sign-in to review registrations, entries,
   sponsor enquiries and vendor requests; export lists.
7. **Open mic and workshop events** across the year, with registration and
   reminders.
8. **Newsletter and socials.** Social links (not yet supplied) and a signup.

Each backend step needs its own Supabase project, Vercel environment
variables and an email-sending domain. None exist yet.
