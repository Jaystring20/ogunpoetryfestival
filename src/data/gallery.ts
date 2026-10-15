// Photos from the 2025 flagship festival, "The Truth in Our Scars", supplied
// by the organisers (every frame carries the festival's 2025 watermark).
// Originals are about 1080px; each has a 600px copy for small screens.
// Alt text describes what is in the frame; nobody is named.
import type { Photo } from "@/data/photos";

const files = import.meta.glob<string>("../assets/photos/opf2025/*.jpg", { eager: true, import: "default" });
const url = (file: string) => {
  const found = files[`../assets/photos/opf2025/${file}.jpg`];
  if (!found) throw new Error(`Missing photo: ${file}`);
  return found;
};
const p = (n: string, w: number, h: number, alt: string): Photo => ({ src: url(`opf25-${n}`), small: url(`opf25-${n}-600`), smallW: 600, w, h, alt });

export const OPF25 = {
  "000": p("000", 1080, 771, "A poet in a maroon turtleneck performs at a standing microphone."),
  "001": p("001", 674, 944, "A poet in white performs alone on the red stage."),
  "013": p("013", 771, 1080, "A woman in an orange hijab reads her poem from her phone at the microphone."),
  "018": p("018", 771, 1080, "A performer stands alone on stage before the hall."),
  "024": p("024", 771, 1080, "A young performer in a white T-shirt delivers a poem on stage."),
  "026": p("026", 771, 1080, "A performer in a blue agbada speaks into a microphone."),
  "028": p("028", 771, 1080, "A woman speaks from the lectern."),
  "030": p("030", 1080, 721, "A troupe performs a group piece across the stage."),
  "039": p("039", 1080, 771, "Three performers act out a scene on the red stage."),
  "040": p("040", 771, 1080, "A woman in coral performs a poem from a chair on stage."),
  "053": p("053", 771, 1080, "A speaker in a blue blazer addresses the hall."),
  "055": p("055", 771, 1080, "A woman in an Ogun Poetry Festival T-shirt speaks into a microphone."),
  "059": p("059", 771, 1080, "A performer in a blue agbada delivers a poem with great feeling."),
  "061": p("061", 771, 1080, "A woman in purple performs with a microphone."),
  "066": p("066", 695, 973, "A woman in red glasses speaks from the lectern."),
  "070": p("070", 771, 1080, "A performer in a flowing blue agbada on stage."),
  "074": p("074", 771, 1080, "A poet with locs performs into a microphone."),
  "075": p("075", 771, 1080, "A woman in an Ogun Poetry Festival T-shirt reads at the lectern."),
  "076": p("076", 1080, 771, "A poet in a maroon turtleneck gestures from the lectern."),
  "085": p("085", 771, 1080, "A performer bends low over the microphone stand mid-poem."),
  "086": p("086", 1080, 721, "A wide view of the stage and the audience during a performance."),
  "029": p("029", 1080, 771, "Four guests in conversation on the stage."),
  "011": p("011", 771, 1080, "A guest speaker answers a question from his chair on stage."),
  "025": p("025", 771, 1080, "A guest in a blue blazer speaks from his chair on stage."),
  "023": p("023", 715, 1000, "A guest in green and gold speaks to the hall."),
  "005": p("005", 771, 1080, "A guest in a blue agbada and cap listens from the floor."),
  "017": p("017", 1080, 721, "A speaker addresses a full hall."),
  "003": p("003", 1080, 771, "Two women laugh together in the audience."),
  "008": p("008", 1080, 771, "Two young women watch from the green seats."),
  "027": p("027", 1080, 771, "Guests in the front rows watch the stage."),
  "033": p("033", 1080, 771, "Two men talk between performances."),
  "036": p("036", 773, 1000, "An audience member covers her mouth, moved by a performance."),
  "047": p("047", 715, 1000, "A young woman in the audience reads from her phone with a microphone."),
  "048": p("048", 688, 963, "A woman in the audience asks a question into a microphone."),
  "050": p("050", 1080, 771, "Two men smile for the camera from their seats."),
  "052": p("052", 1080, 771, "A woman in an orange hijab laughs in the audience."),
  "064": p("064", 1080, 771, "A wide view of the audience in red and green seats."),
  "079": p("079", 771, 1080, "A young man in sunglasses listens from his seat."),
  "081": p("081", 1080, 721, "Young women share a moment between performances."),
  "089": p("089", 715, 1000, "A young woman laughs as she speaks into a microphone."),
  "092": p("092", 771, 1080, "A woman in purple applauds from her seat."),
  "093": p("093", 669, 937, "A man in a blue cap speaks into a microphone from the audience."),
  "020": p("020", 1080, 607, "Students in white sit together in the front row."),
  "041": p("041", 771, 1080, "A young man in a blue cap watches from his seat."),
  "016": p("016", 1080, 721, "Guests and volunteers fill the green seats."),
  "007": p("007", 1080, 721, "Volunteers at the registration table."),
  "015": p("015", 1080, 864, "A smiling volunteer in an Ogun Poetry Festival T-shirt at the welcome desk."),
  "045": p("045", 1080, 771, "Two members of the Golden Penny team in branded shirts."),
  "065": p("065", 1080, 771, "Golden Penny team members among the audience."),
  "004": p("004", 1080, 771, "A Golden Penny team member stands in the audience."),
  "087": p("087", 1080, 771, "Two volunteers in green shirts take a break."),
  "067": p("067", 771, 1080, "A young man films the festival on a phone rig."),
  "069": p("069", 1080, 771, "A volunteer in green checks a list."),
  "063": p("063", 1080, 771, "Festival team members and guests pose together."),
  "058": p("058", 1080, 771, "Guests with VIP passes pose together."),
  "002": p("002", 1080, 721, "Guests pose at the partner backdrop."),
  "094": p("094", 1080, 771, "Three young guests pose at the partner backdrop."),
  "062": p("062", 771, 1080, "A painted tree covered in names and messages from guests."),
} as const;

type Id = keyof typeof OPF25;
const pick = (ids: Id[]) => ids.map((id) => OPF25[id]);

/** The /gallery page's 2025 sections, in display order. */
export const GALLERY_2025 = [
  { id: "stage", title: "On stage", photos: pick(["000", "001", "013", "018", "024", "026", "028", "030", "039", "040", "053", "055", "059", "061", "066", "070", "074", "075", "076", "085", "086"]) },
  { id: "conversations", title: "In conversation", photos: pick(["029", "011", "025", "023", "005", "017"]) },
  { id: "audience", title: "The audience", photos: pick(["003", "008", "027", "033", "036", "047", "048", "050", "052", "064", "079", "081", "089", "092", "093", "020", "041", "016"]) },
  { id: "team", title: "Team, guests and partners", photos: pick(["007", "015", "045", "065", "004", "087", "067", "069", "063", "058", "002", "094", "062"]) },
] as const;
