import { FESTIVAL, REGISTRATION, mailto } from "@/data/festival";

export type RegistrationEntry = {
  institution: string;
  institutionType: string;
  categories: string[];
  tertiaryTheme: string;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
  town: string;
  notes: string;
  /** Honeypot: people never see this field, so anything in it is a bot. */
  website: string;
};

/** The same entry as a plain email, for when the Sheet isn't connected or is unreachable. */
export function registrationEmail(e: RegistrationEntry) {
  const lines = [
    `Institution: ${e.institution}`,
    `Type: ${e.institutionType}`,
    `Categories: ${e.categories.join(", ")}`,
    e.tertiaryTheme && `Tertiary Slam theme: ${e.tertiaryTheme}`,
    `Contact person: ${e.contactName}${e.contactRole ? ` (${e.contactRole})` : ""}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email}`,
    e.town && `Town or LGA: ${e.town}`,
    e.notes && `Notes: ${e.notes}`,
  ].filter(Boolean);
  return mailto(`School registration: OPF ${FESTIVAL.year}: ${e.institution}`, lines.join("\n") + "\n");
}

/**
 * Sends an entry to the Google Apps Script web app. The body goes as
 * text/plain so the browser skips the CORS preflight, which Apps Script
 * can't answer; the script parses the JSON itself.
 */
export async function submitRegistration(e: RegistrationEntry): Promise<"sent" | "not-connected"> {
  if (!REGISTRATION.endpoint) return "not-connected";
  const res = await fetch(REGISTRATION.endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...e, submittedFrom: window.location.href }),
  });
  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !data?.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return "sent";
}
