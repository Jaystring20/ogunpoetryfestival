import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/opf-logo.png";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/#festival", label: "The festival" },
  { to: "/#competition", label: "Competition" },
  { to: "/#programme", label: "Programme" },
  { to: "/#about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors", scrolled || open ? "bg-ink/95 backdrop-blur" : "bg-transparent")}>
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label="Ogun Poetry Festival home" onClick={() => setOpen(false)}>
          <img src={logo} alt="Ogun Poetry Festival" className="h-9 w-auto sm:h-10" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.to} href={l.to} className="label text-paper/80 transition-colors hover:text-sun">
              {l.label}
            </a>
          ))}
          <NavLink to="/gallery" className={({ isActive }) => cn("label transition-colors hover:text-sun", isActive ? "text-sun" : "text-paper/80")}>
            Gallery
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => cn("label transition-colors hover:text-sun", isActive ? "text-sun" : "text-paper/80")}>
            Register
          </NavLink>
          <NavLink to="/partner" className={({ isActive }) => cn("label transition-colors hover:text-sun", isActive ? "text-sun" : "text-paper/80")}>
            Partner
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/partner" className="btn-sun hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Become a partner
          </Link>
          <button
            className="p-2 text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="wrap border-t border-line pb-6 lg:hidden" aria-label="Mobile">
          {[...LINKS, { to: "/gallery", label: "Gallery" }, { to: "/register", label: "Register your school" }, { to: "/partner", label: "Partner" }].map((l) => (
            <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="display block border-b border-line py-4 text-2xl text-paper">
              {l.label}
            </a>
          ))}
          <Link to="/partner" onClick={() => setOpen(false)} className="btn-sun mt-6 w-full">
            Become a partner
          </Link>
        </nav>
      )}
    </header>
  );
}
