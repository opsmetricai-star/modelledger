"use client";
import Link from "next/link";
import { useState } from "react";
import { Mark, ProductIcon, Chevron } from "./Icons";
import { products, useCases, industries, slugify, BRAND } from "@/lib/site";

type Menu = "platform" | "solutions" | null;

const mobileLinks: [string, string][] = [
  ...products.map((p) => [p.name, `/product/${p.slug}`] as [string, string]),
  ["Solutions", `/solutions/${slugify(useCases[0].name)}`],
  ["Documentation", "/docs"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Log in", "/login"],
  ["Sign up", "/signup"],
];

export default function Header() {
  const [open, setOpen] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const close = () => setOpen(null);

  const trig = (m: Exclude<Menu, null>, label: string) => (
    <div onMouseEnter={() => setOpen(m)}>
      <button
        onClick={() => setOpen(open === m ? null : m)}
        aria-expanded={open === m}
        className={`flex items-center gap-2 py-6 text-[15px] font-medium transition ${open === m ? "text-lime" : "text-white"}`}
      >
        {label} <Chevron />
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur" onMouseLeave={close}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 py-4" aria-label={`${BRAND} home`}>
            <Mark className="h-9 w-7" />
            <div className="leading-none">
              <div className="font-serif text-[26px] font-semibold tracking-tight">{BRAND}</div>
              <div className="mt-1 text-[12px] text-white/70">AI-native operations</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {trig("platform", "Platform")}
            {trig("solutions", "Solutions")}
            <Link href="/docs" className="text-[15px] font-medium hover:text-lime">Docs</Link>
            <Link href="/pricing" className="text-[15px] font-medium hover:text-lime">Pricing</Link>
          </nav>
        </div>
        <div className="hidden items-center gap-7 text-[14px] font-medium uppercase tracking-wider lg:flex">
          <Link href="/login" className="hover:text-lime">Log in</Link>
          <Link href="/signup" className="hover:text-lime">Sign up</Link>
        </div>
        <button className="lg:hidden" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>

      {open === "platform" && (
        <div className="absolute left-[270px] top-[78px] hidden w-[380px] rounded-lg border border-white/10 bg-ink-800 p-6 shadow-2xl lg:block" onMouseEnter={() => setOpen("platform")}>
          <ul className="space-y-5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="group flex items-center gap-4" onClick={close}>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-700 group-hover:bg-ink-600"><ProductIcon kind={p.icon} /></span>
                  <span>
                    <span className="block font-semibold group-hover:text-lime">{p.name}</span>
                    <span className="text-[13px] text-white/70">{p.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open === "solutions" && (
        <div className="absolute inset-x-0 top-[78px] hidden border-t border-white/10 bg-ink-800 shadow-2xl lg:block" onMouseEnter={() => setOpen("solutions")}>
          <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-10 px-8 py-10">
            <div>
              <h3 className="mb-6 font-sans text-2xl font-semibold">Use Cases</h3>
              <ul className="space-y-5 text-[17px]">
                {useCases.map((u) => <li key={u.name}><Link className="hover:text-lime" href={`/solutions/${slugify(u.name)}`} onClick={close}>{u.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 font-sans text-2xl font-semibold">Industries</h3>
              <ul className="space-y-5 text-[17px]">
                {industries.map((u) => <li key={u.name}><Link className="hover:text-lime" href={`/industries/${slugify(u.name)}`} onClick={close}>{u.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 font-sans text-2xl font-semibold">Platform</h3>
              <ul className="space-y-5">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/product/${p.slug}`} onClick={close} className="group flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-700"><ProductIcon kind={p.icon} /></span>
                      <span className="font-semibold group-hover:text-lime">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-ink-800 px-5 py-5 lg:hidden">
          {mobileLinks.map(([l, h]) => (
            <Link key={l} href={h} onClick={() => setMobile(false)} className="block border-b border-white/5 py-3 text-lg">{l}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
