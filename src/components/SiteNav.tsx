import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "../Router";

export default function SiteNav({ current }: { current: "home" | "about" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-900"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 group" ariaLabel="PsyberNexus home">
          <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-base group-hover:bg-indigo-500 transition">
            Ψ
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white tracking-tight">
              Psyber<span className="text-indigo-400">Nexus</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Wellness Intelligence Mesh
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" active={current === "home"}>
            Home
          </NavLink>
          <NavLink to="/about" active={current === "about"}>
            About
          </NavLink>
          <Link
            to="/app"
            className="ml-3 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition shadow-lg shadow-indigo-500/10"
          >
            Launch App
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-1">
            <NavLink to="/" active={current === "home"} block>
              Home
            </NavLink>
            <NavLink to="/about" active={current === "about"} block>
              About
            </NavLink>
            <Link
              to="/app"
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-md text-sm font-semibold transition"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  to,
  active,
  children,
  block,
}: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`${block ? "block w-full" : ""} px-3 py-1.5 rounded-md text-sm transition ${
        active
          ? "text-white bg-slate-900/60"
          : "text-slate-400 hover:text-white hover:bg-slate-900/40"
      }`}
    >
      {children}
    </Link>
  );
}
