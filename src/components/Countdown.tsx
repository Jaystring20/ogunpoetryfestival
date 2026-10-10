import { useEffect, useState } from "react";
import { FESTIVAL } from "@/data/festival";

const parts = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60) };
};

/** Days, hours and minutes to the festival. Disappears once it has started. */
export function Countdown() {
  const target = new Date(FESTIVAL.startsAt).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (now >= target) return null;
  const p = parts(target - now);
  return (
    <dl className="flex gap-6 sm:gap-8" aria-label="Time until the festival">
      {(
        [
          ["days", p.days],
          ["hours", p.hours],
          ["minutes", p.minutes],
        ] as const
      ).map(([label, n]) => (
        <div key={label} className="flex flex-col-reverse">
          <dt className="label mt-1 text-muted">{label}</dt>
          <dd className="display text-4xl tabular-nums text-paper sm:text-5xl">{String(n).padStart(2, "0")}</dd>
        </div>
      ))}
    </dl>
  );
}
