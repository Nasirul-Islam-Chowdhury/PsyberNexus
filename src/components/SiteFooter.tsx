import { PhoneCall } from "lucide-react";
import { Link } from "../Router";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
              Ψ
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                Psyber<span className="text-indigo-400">Nexus</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                Bangladesh · Global
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
            AI-native multimodal mental health intelligence mesh for educational ecosystems —
            culturally adaptive, edge-private, human-led.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-slate-400 hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-400 hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/app" className="text-slate-400 hover:text-white transition">
                Launch Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono mb-4">
            Crisis Helplines · Bangladesh
          </div>
          <div className="space-y-2">
            <a
              href="tel:999"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              National Emergency · <span className="font-mono">999</span>
            </a>
            <a
              href="tel:109"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              Women & Children · <span className="font-mono">109</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
          <span>© 2026 PsyberNexus · Early-warning system · Not a clinical diagnosis</span>
          <span>v1.0 · IRB-aligned · Edge Encryption Rule 01</span>
        </div>
      </div>
    </footer>
  );
}
