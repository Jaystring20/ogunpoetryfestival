import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type Tone = "pink" | "teal" | "sun" | "sky";

/** Solid fill per brand tone, with text that stays readable on it. */
export const TONE_FILL: Record<Tone, string> = {
  pink: "bg-pink text-paper",
  teal: "bg-teal text-ink",
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
};
export const TONE_TEXT: Record<Tone, string> = { pink: "text-pink", teal: "text-teal", sun: "text-sun", sky: "text-sky" };
export const TONE_BORDER: Record<Tone, string> = { pink: "border-pink", teal: "border-teal", sun: "border-sun", sky: "border-sky" };
