import Link from "next/link";
import { Mark } from "./Icons";
import { footerCols, BRAND } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3"><Mark className="h-9 w-7" /><span className="font-serif text-2xl font-semibold">{BRAND}</span></div>
          <p className="mt-4 max-w-xs text-sm text-white/60">The AI-native operating layer for enterprise AI: analysis, scoring and automated oversight in one platform.</p>
        </div>
        {footerCols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lime">{c.title}</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {c.links.map(([l, h]) => <li key={l}><Link href={h} className="hover:text-white">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">Copyright {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
    </footer>
  );
}
