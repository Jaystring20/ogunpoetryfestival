import { Link } from "react-router-dom";
import logo from "@/assets/opf-logo.png";
import { FESTIVAL } from "@/data/festival";
import { Tiles } from "./Tiles";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Tiles cols={24} rows={1} seed={41} className="h-10 w-full sm:h-14" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt="Ogun Poetry Festival" className="h-12 w-auto" />
          <p className="mt-6 font-verse text-2xl italic text-paper/90">{FESTIVAL.tagline}.</p>
          <p className="mt-3 max-w-sm text-muted">
            An annual festival of poetry, performance and advocacy in Ogun State, since {FESTIVAL.founded}.
          </p>
        </div>
        <div>
          <p className="label text-sun">Contact</p>
          <ul className="mt-4 space-y-2 text-paper/90">
            <li>
              <a href={`mailto:${FESTIVAL.contact.email}`} className="hover:text-sun">
                {FESTIVAL.contact.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${FESTIVAL.contact.mediaEmail}`} className="hover:text-sun">
                {FESTIVAL.contact.mediaEmail}
              </a>
              <span className="block text-sm text-muted">Media and press</span>
            </li>
            <li className="text-muted">Secretariat: {FESTIVAL.contact.secretariat}</li>
          </ul>
        </div>
        <div>
          <p className="label text-sun">The {FESTIVAL.year} festival</p>
          <ul className="mt-4 space-y-2 text-paper/90">
            <li>{FESTIVAL.date}</li>
            <li>{FESTIVAL.venue}</li>
            <li>{FESTIVAL.city}</li>
            <li className="pt-2">
              <Link to="/partner" className="text-sun hover:underline">
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-2 border-t border-line py-6 text-sm text-muted">
        <span>© {FESTIVAL.year} {FESTIVAL.name}</span>
        <span>{FESTIVAL.theme}</span>
      </div>
    </footer>
  );
}
