// Real photographs from past OPF events, supplied by the organisers.
// Each has a 1600px original and an 800px copy for small screens.
// Alt text describes what is in the frame; never name people unless the
// organisers confirm who they are.

type Photo = { src: string; small: string; w: number; h: number; alt: string };

const files = import.meta.glob<string>("../assets/photos/*.jpg", { eager: true, import: "default" });
const url = (name: string) => {
  const found = files[`../assets/photos/${name}.jpg`];
  if (!found) throw new Error(`Missing photo: ${name}`);
  return found;
};

const photo = (name: string, w: number, h: number, alt: string): Photo => ({ src: url(name), small: url(`${name}-800`), w, h, alt });
const wide = (name: string, alt: string) => photo(name, 1600, 1143, alt);
const tall = (name: string, alt: string) => photo(name, 1143, 1600, alt);

export const PHOTOS = {
  performerBanner: tall("performer-banner", "A performer speaks into a microphone in front of the Ogun Poetry Festival banner."),
  readerBeret: wide("kuta-reader-beret", "A young poet in a beret performs at a standing microphone at Kuta Art Gallery."),
  slamJunior: tall("slam-junior-boy", "A schoolboy in uniform performs a poem in front of the Poetry Slam banner."),
  audienceApplause: tall("audience-applause", "A woman in an Ogun Poetry Festival T-shirt applauds from the audience."),
  circle: wide("kuta-circle", "A large circle of young people talking together at Kuta Art Gallery."),
  slamBlazer: tall("slam-student-blazer", "A student in a blue blazer and hat performs with her arm outstretched."),
  awardSecond: wide("award-written-2nd", "A student in a blue blazer and hat receives a wrapped prize."),
  awardJunior: wide("junior-award-3rd", "A junior student holds a framed Award of Excellence for third position, with two adults beside her."),
  host: tall("speaker-mic", "A speaker in a waistcoat and red tie addresses the hall with a microphone."),
  reading: wide("kuta-reading", "A woman reads a poem from her phone at the microphone at Kuta Art Gallery."),
  readerFloral: wide("kuta-reader-floral", "A poet in a floral shirt reads from his phone at Kuta Art Gallery."),
  speakerMural: wide("kuta-speaker-mural", "A woman in an OPF T-shirt speaks in front of a black and white mural at Kuta Art Gallery."),
  bench: wide("kuta-bench", "Guests sit along a bench by a painted mural, smiling."),
  spokenWord: tall("spoken-word-mic", "A young man smiles as he speaks into a microphone."),
  team: photo("team-banner", 1000, 667, "Five people pose in front of the Ogun Poetry Festival welcome banner."),
  awardFirst: wide("award-written-1st", "A student in a red and white uniform receives a wrapped prize."),
  audienceClapping: tall("audience-clapping", "A young man claps in the audience, with students in uniform behind him."),
} as const;

export type { Photo };
