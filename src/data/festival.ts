/**
 * Every fact on the site, in one place. Source: the OPF 2026 Prospectus and
 * the OPF 2026 Sponsorship & Partnership Proposal (revised). Change a fact
 * here and every page that shows it updates.
 *
 * Deliberately left out: the remittance bank account. It belongs to a person,
 * not the festival, and is shared with confirmed partners by the Secretariat.
 */

export const FESTIVAL = {
  name: "Ogun Poetry Festival",
  short: "OPF",
  tagline: "Creativity for Humanity",
  year: 2026,
  theme: "Artistic Expression for Advocacy",
  founded: 2023,
  date: "Saturday, 5 December 2026",
  time: "10:00 AM to 3:00 PM",
  /** 10:00 West Africa Time (UTC+1). */
  startsAt: "2026-12-05T10:00:00+01:00",
  venue: "Cinema Hall, June 13 Cultural Centre",
  city: "Abeokuta, Ogun State",
  audience: "200–250",
  partnerDeadline: "15 November 2026",
  contact: {
    email: "ogunpoetryfestival@gmail.com",
    mediaEmail: "ogunpoetryfestivalmedia@gmail.com",
    secretariat: "FCE Abeokuta",
    address: "Abeokuta, Ogun State",
  },
} as const;

export const MISSION =
  "The 2026 Ogun Poetry Festival channels creative expression into measurable social impact. Poetry, performance art and creative writing become practical instruments for community awareness, youth mental wellness, civic engagement and social advocacy, turning the stage into a channel for real change across Ogun State's schools and communities.";

export const FOCUS_AREAS = [
  { title: "Emotional wellness", detail: "Mental health education and emotional wellness", sdg: "SDG 3 · Good Health & Well-Being", tone: "pink" },
  { title: "Academic literacy", detail: "Reading, writing and the confidence to be heard", sdg: "SDG 4 · Quality Education", tone: "teal" },
  { title: "Civic engagement", detail: "Civic engagement and advocacy", sdg: "SDG 16 · Peace, Justice & Strong Institutions", tone: "sun" },
  { title: "Creative entrepreneurship", detail: "Creative work as a livelihood", sdg: "SDG 8 · Decent Work & Economic Growth", tone: "pink" },
  { title: "Cultural preservation", detail: "Keeping language, story and heritage alive", sdg: "SDG 11 · Sustainable Cities & Communities", tone: "teal" },
] as const;

export const TRACKS = [
  {
    name: "Junior Secondary",
    pool: "20 schools, top 2 juniors per school",
    format: "Written poetry, evaluated by the academic review board",
    prizes: "Top 3 students: academic awards, educational hampers and certificates",
    tone: "sky",
  },
  {
    name: "Senior Secondary",
    pool: "20 schools (10 public, 10 private), 5 seniors per school",
    format: "A themed advocacy piece, submitted on video for screening",
    prizes: "Top 10 schools: Flow Game and certificates. Top 3 students: cash prizes and certificates",
    tone: "pink",
  },
  {
    name: "Tertiary Slam",
    pool: "6 institutions: FCE, FUNAAB, Crescent, Chrisland, DBells, OGSCON",
    format: "Live stage performance only, no video entries",
    prizes: "1st: ₦90,000 and a trophy. 2nd: ₦60,000 and a plaque",
    tone: "sun",
  },
] as const;

export const RUN_OF_SHOW = [
  { time: "10:00", item: "Arrival, registration and exhibition" },
  { time: "10:30", item: "Opening ceremony and welcome address" },
  { time: "10:45", item: "Keynote and advocacy address" },
  { time: "11:15", item: "OPF Rally showcase and secondary school presentations" },
  { time: "12:15", item: "Tertiary Poetry Slam" },
  { time: "13:00", item: "Creative and advocacy masterclass" },
  { time: "13:30", item: "Awards, recognition and sponsor presentations" },
  { time: "14:00", item: "Networking, media and brand activations" },
  { time: "14:30", item: "Closing remarks, photographs and departure" },
] as const;

export const TRACK_RECORD = [
  { year: "2023", title: "Founded with the schools", detail: "Over 100 secondary school students engaged across more than 10 public and private schools in Ogun State." },
  { year: "Every quarter", title: "Open mics and workshops", detail: "More than six recurring open mic and workshop sessions, keeping a network of emerging writers active." },
  { year: "2025", title: "The Truth in Our Scars", detail: "The flagship festival brought together over 200 youths, scholars, performers and creative professionals." },
] as const;

export const BACKING = {
  ministry: "Ogun State Ministry of Culture and Tourism",
  keynote: "Barrister Titilola Akinlawon (SAN)",
  partners: ["ESET (Lead Grant Partner)", "Golden Penny Foods", "Cliq", "Kuta Art Gallery", "Artvocacy", "Artitude Hub"],
} as const;

export const COMMITTEE = [
  { name: "Calista Adebayo", role: "Convener & Executive Producer" },
  { name: "Agboola Oluwatobiloba", role: "Programme Manager" },
  { name: "Olufemi Olatunji", role: "Media & Communications Lead" },
  { name: "Joy Udeh", role: "Welfare & Mental Health Director" },
  { name: "Odetunde Ola", role: "Lead Event Strategist" },
  { name: "Halimah Adegbite", role: "Content & Creative Strategist" },
] as const;

export const WHY_PARTNER = [
  { title: "Direct access to young audiences", detail: "On-ground exposure to student cohorts, youth leaders and young professionals across secondary schools and higher institutions in Ogun State." },
  { title: "Measurable CSR goodwill", detail: "A documented, youth-focused initiative in literacy, mental health and youth development, aligned with five UN Sustainable Development Goals." },
  { title: "Multi-channel visibility", detail: "Outdoor and venue branding, school and campus flyering, radio tours and jingles, targeted digital campaigns and on-site activations." },
  { title: "Institutional relationships", detail: "Time with education ministry officials, school administrators, tertiary faculty and civil society leaders." },
] as const;

export const TIERS = [
  {
    name: "Headline",
    price: "₦2,000,000",
    availability: "Exclusive, 1 partner",
    tone: "sun",
    benefits: [
      "Naming rights: “OPF 2026 Presented by [Your Brand]”",
      "15-minute executive keynote slot",
      "Top billing on billboards, flyers, brochures and backdrops",
      "Lead banner and branded shirts on the awareness walk",
      "Prime exhibition space in the entrance foyer",
      "Present the 1st place Tertiary Slam prize on stage",
      "Recognition across all radio tours and jingles",
      "8 dedicated partner posts on official channels",
    ],
  },
  {
    name: "Gold",
    price: "₦1,000,000",
    availability: "Limited, 2 partners",
    tone: "pink",
    benefits: [
      "Official Gold Partner status",
      "5-minute official address",
      "Prominent secondary placement on all official materials",
      "Placement on awareness campaign banners",
      "Standard exhibition space in the entrance foyer",
      "Present the Secondary Category awards on stage",
      "Mentions during broadcast promotions",
      "3 dedicated partner posts on official channels",
    ],
  },
  {
    name: "Silver",
    price: "₦500,000",
    availability: "Limited, 3 partners",
    tone: "teal",
    benefits: [
      "Official Silver Partner status",
      "Logo on official materials (tertiary tier)",
      "Shared exhibition space in the entrance foyer",
      "Present certificates to Junior Category winners",
      "Logo on the step-and-repeat backdrop",
      "2 dedicated partner posts on official channels",
    ],
  },
  {
    name: "Community",
    price: "Below ₦500,000",
    availability: "Open to individuals, small businesses, alumni groups and civil society",
    tone: "sky",
    benefits: [
      "Recognition scaled to your contribution",
      "Logo on the shared Community Partners wall",
      "Certificate of Partnership",
      "Mention in closing remarks and the impact report",
    ],
  },
] as const;

export const IN_KIND = [
  { title: "Health & Wellness Partner", detail: "Sponsor the student mental health poetry track, supply first-aid equipment to winning schools and offer on-site wellness screenings.", tone: "pink" },
  { title: "Hydration Partner", detail: "Exclusive pouring rights for bottled water and healthy drinks across the venue and backstage.", tone: "teal" },
  { title: "Education & Technology Partner", detail: "Underwrite the tertiary cash awards (₦90,000 and ₦60,000) and donate educational hardware or software.", tone: "sun" },
] as const;

export const VENDOR_BAZAAR = {
  title: "Vendor Bazaar",
  detail: "Paid exhibition space in the foyer for approved vendors, creative enterprises, educational brands and youth-focused businesses. Separate from sponsorship.",
  fee: "₦30,000 per slot",
  note: "Subject to final venue and logistics arrangements.",
} as const;

export const mailto = (subject: string, body = "") =>
  `mailto:${FESTIVAL.contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
