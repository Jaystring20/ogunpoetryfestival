import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { DownloadLink } from "@/components/DownloadLink";
import { DELEGATION, DOWNLOADS, FESTIVAL, REGISTRATION, TRACKS } from "@/data/festival";
import { registrationEmail, submitRegistration, type RegistrationEntry } from "@/lib/registration";
import { cn } from "@/lib/utils";

const EMPTY: RegistrationEntry = {
  institution: "",
  institutionType: "",
  categories: [],
  tertiaryTheme: "",
  contactName: "",
  contactRole: "",
  phone: "",
  email: "",
  town: "",
  notes: "",
  website: "",
};

const TERTIARY = REGISTRATION.institutionTypes[2];
const TERTIARY_FEE = TRACKS.find((t) => "fee" in t)?.fee;

const input =
  "mt-2 block w-full border border-line bg-ink px-4 py-3 text-paper placeholder:text-muted/60 focus:border-sun focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0";

function Field({ id, label, hint, required, children }: { id: string; label: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label text-paper">
        {label} {required ? <span className="text-pink" aria-hidden="true">*</span> : <span className="normal-case tracking-normal text-muted">(optional)</span>}
      </label>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      {children}
    </div>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "email"; href: string; reason: "not-connected" | "failed" };

export default function Register() {
  const [entry, setEntry] = useState<RegistrationEntry>(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  // The form is long: bring the confirmation (or the email step) into view.
  useEffect(() => {
    if (status.kind === "sent" || status.kind === "email") result.current?.scrollIntoView({ block: "start" });
  }, [status.kind]);
  const set = <K extends keyof RegistrationEntry>(k: K, v: RegistrationEntry[K]) => setEntry((e) => ({ ...e, [k]: v }));

  const isTertiary = entry.institutionType === TERTIARY;
  const isSecondary = entry.institutionType !== "" && !isTertiary;

  function chooseType(t: string) {
    setEntry((e) => ({ ...e, institutionType: t, categories: t === TERTIARY ? ["Tertiary Slam"] : [], tertiaryTheme: "" }));
  }

  function toggleCategory(c: string) {
    setEntry((e) => ({ ...e, categories: e.categories.includes(c) ? e.categories.filter((x) => x !== c) : [...e.categories, c] }));
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setError("");
    if (!entry.institutionType) return setError("Please choose what kind of institution you are registering.");
    if (isSecondary && entry.categories.length === 0) return setError("Please choose at least one category: Junior, Senior or both.");
    if (entry.website) return setStatus({ kind: "sent" }); // bot: pretend it worked
    setStatus({ kind: "sending" });
    try {
      const result = await submitRegistration(entry);
      if (result === "sent") setStatus({ kind: "sent" });
      else setStatus({ kind: "email", href: registrationEmail(entry), reason: "not-connected" });
    } catch {
      setStatus({ kind: "email", href: registrationEmail(entry), reason: "failed" });
    }
  }

  return (
    <>
      <Seo
        title="Register your school"
        path="/register"
        description={`Register your school or tertiary institution for the ${FESTIVAL.name} ${FESTIVAL.year}. Registration closes ${REGISTRATION.closes}.`}
      />

      <section className="pb-12 pt-32 sm:pt-40">
        <div className="wrap max-w-3xl">
          <p className="label text-pink">Registration · OPF {FESTIVAL.year}</p>
          <h1 className="display mt-6 text-balance text-[2.6rem] leading-[0.95] sm:text-6xl">Register your school.</h1>
          <p className="mt-6 text-lg leading-relaxed text-paper/85">
            Tell us who you are and which categories you're entering. It takes two minutes. The Secretariat will confirm your place, the fee and the next steps by email or phone.
          </p>
          <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {(
              [
                ["Closes", REGISTRATION.closes],
                ["Secondary schools", DELEGATION.fee],
                ["Tertiary institutions", TERTIARY_FEE ?? ""],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="bg-ink-raised px-5 py-4">
                <dt className="label text-xs text-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-sun">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div ref={result} className="wrap max-w-3xl scroll-mt-24">
          {status.kind === "sent" ? (
            <Reveal className="border-t-8 border-teal bg-ink-raised p-8 sm:p-10">
              <div role="status" aria-live="polite">
                <CheckCircle2 className="h-10 w-10 text-teal" aria-hidden="true" />
                <h2 className="display mt-6 text-3xl sm:text-4xl">Thank you. You're on the list.</h2>
                <p className="mt-4 text-lg text-paper/90">
                  We've received the registration for <span className="font-semibold text-paper">{entry.institution || "your institution"}</span>. The Secretariat will be in touch to confirm your place and how to pay the registration fee.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <DownloadLink file={DOWNLOADS.school} className="text-left" />
                  <Link to="/" className="btn-line">
                    Back to the festival
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : status.kind === "email" ? (
            <Reveal className="border-t-8 border-sun bg-ink-raised p-8 sm:p-10">
              <div role="status" aria-live="polite">
                <Mail className="h-10 w-10 text-sun" aria-hidden="true" />
                <h2 className="display mt-6 text-3xl sm:text-4xl">One more step: send the email.</h2>
                <p className="mt-4 text-lg text-paper/90">
                  {status.reason === "failed"
                    ? "We couldn't reach our registration list just now. Your details are ready in an email to the Secretariat instead."
                    : "Your details are ready in an email to the Secretariat."}{" "}
                  Press the button, then send the email from your mail app.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={status.href} className="btn-sun">
                    Open the email <ArrowRight className="h-5 w-5" />
                  </a>
                  <button type="button" className="btn-line" onClick={() => setStatus({ kind: "idle" })}>
                    Edit my details
                  </button>
                </div>
                <p className="mt-6 text-sm text-muted">
                  No mail app? Write to <span className="text-paper">{FESTIVAL.contact.email}</span> with the details above.
                </p>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={onSubmit} noValidate={false} className="space-y-10 border border-line bg-ink-raised p-6 sm:p-10">
              <fieldset className="space-y-6">
                <legend className="display text-2xl">Your institution</legend>
                <Field id="institution" label="School or institution name" required>
                  <input id="institution" required maxLength={150} autoComplete="organization" className={input} value={entry.institution} onChange={(e) => set("institution", e.target.value)} />
                </Field>

                <div role="radiogroup" aria-labelledby="type-label">
                  <p id="type-label" className="label text-paper">
                    Type <span className="text-pink" aria-hidden="true">*</span>
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {REGISTRATION.institutionTypes.map((t) => (
                      <label
                        key={t}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors",
                          entry.institutionType === t ? "border-sun bg-ink text-paper" : "border-line text-paper/85 hover:border-paper/60",
                        )}
                      >
                        <input type="radio" name="institutionType" value={t} required checked={entry.institutionType === t} onChange={() => chooseType(t)} className="h-4 w-4 accent-[hsl(var(--sun))]" />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {isSecondary && (
                  <fieldset>
                    <legend className="label text-paper">
                      Categories you're entering <span className="text-pink" aria-hidden="true">*</span>
                    </legend>
                    <p className="mt-1 text-sm text-muted">Up to 2 Junior writers, and one Senior video with exactly 5 students. One fee covers the school.</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {REGISTRATION.secondaryCategories.map((c) => (
                        <label
                          key={c}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors",
                            entry.categories.includes(c) ? "border-sun bg-ink text-paper" : "border-line text-paper/85 hover:border-paper/60",
                          )}
                        >
                          <input type="checkbox" checked={entry.categories.includes(c)} onChange={() => toggleCategory(c)} className="h-4 w-4 accent-[hsl(var(--sun))]" />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {isTertiary && (
                  <Field id="tertiaryTheme" label="Tertiary Slam theme" hint="Each institution performs under one theme.">
                    <select id="tertiaryTheme" className={input} value={entry.tertiaryTheme} onChange={(e) => set("tertiaryTheme", e.target.value)}>
                      <option value="">Choose one</option>
                      {REGISTRATION.tertiaryThemes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                )}

                <Field id="town" label="Town or LGA">
                  <input id="town" maxLength={100} className={input} value={entry.town} onChange={(e) => set("town", e.target.value)} />
                </Field>
              </fieldset>

              <fieldset className="space-y-6">
                <legend className="display text-2xl">Contact person</legend>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="contactName" label="Full name" required>
                    <input id="contactName" required maxLength={100} autoComplete="name" className={input} value={entry.contactName} onChange={(e) => set("contactName", e.target.value)} />
                  </Field>
                  <Field id="contactRole" label="Role" hint="For example: teacher, club coordinator">
                    <input id="contactRole" maxLength={100} className={input} value={entry.contactRole} onChange={(e) => set("contactRole", e.target.value)} />
                  </Field>
                  <Field id="phone" label="Phone (WhatsApp if possible)" required>
                    <input id="phone" type="tel" required maxLength={30} pattern="[0-9+()\s-]{7,30}" autoComplete="tel" className={input} value={entry.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <Field id="email" label="Email" required>
                    <input id="email" type="email" required maxLength={150} autoComplete="email" className={input} value={entry.email} onChange={(e) => set("email", e.target.value)} />
                  </Field>
                </div>
                <Field id="notes" label="Anything we should know?">
                  <textarea id="notes" rows={4} maxLength={1000} className={input} value={entry.notes} onChange={(e) => set("notes", e.target.value)} />
                </Field>
              </fieldset>

              {/* Hidden from people; bots fill it in. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" value={entry.website} onChange={(e) => set("website", e.target.value)} />
              </div>

              {error && (
                <p role="alert" className="border-l-4 border-pink bg-ink px-4 py-3 text-paper">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  We only use these details to organise OPF {FESTIVAL.year} with your institution.
                </p>
                <button type="submit" className="btn-sun shrink-0 disabled:opacity-60" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? "Sending…" : "Register"} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
