"use client";
import Link from "next/link";
import { useState } from "react";
import { Mark, ProductIcon, Chevron } from "./Icons";
import { products, useCases, industries, caseStudies, slugify, BRAND } from "@/lib/site";

type Menu = "platform" | "solutions" | "enterprise" | "resources" | null;

const enterpriseLinks: [string, string][] = [
  ["Enterprise overview", "/enterprise"],
  ["Security & compliance", "/enterprise#security"],
  ["Dedicated deployment", "/enterprise#deploy"],
  ["Talk to sales", "/contact"],
];
const resourceLinks: [string, string][] = [
  ["Documentation", "/docs"],
  ["Blog", "/blog"],
  ["Customers", "/customers"],
  ["About", "/about"],
  ["Support", "/contact"],
];
const mobileLinks: [string, string][] = [
  ["Traces", "/product/traces"],
  ["Evaluations", "/product/evaluations"],
  ["Playground", "/product/playground"],
  ["Monitors", "/product/monitors"],
  ["Solutions", "/solutions/rag"],
  ["Enterprise", "/enterprise"],
  ["Docs", "/docs"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
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
        className={`flex items-center gap-2 py-6 text-[15px] font-medium transition ${open === m ? "text-lime" : "text-white"}`}
      >
        {label} <Chevron />
      </button>
    </div>
  );

  const simple = (items: [string, string][], pos: string, w: string, m: Exclude<Menu, null>) => (
    <div className={`absolute top-[78px] hidden rounded-lg border border-white/10 bg-ink-800 p-5 shadow-2xl lg:block ${pos} ${w}`} onMouseEnter={() => setOpen(m)}>
      {items.map(([l, h]) => (
        <Link key={l} href={h} onClick={close} className="block rounded px-3 py-2.5 hover:bg-ink-700 hover:text-lime">{l}</Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur" onMouseLeave={close}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 py-4">
            <Mark className="h-9 w-7" />
            <div className="leading-none">
              <div className="font-serif text-[26px] font-semibold tracking-tight">{BRAND}</div>
              <div className="mt-1 text-[12px] text-white/70">for AI teams</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {trig("platform", "Platform")}
            {trig("solutions", "Solutions")}
            {trig("enterprise", "Enterprise")}
            {trig("resources", "Resources")}
            <Link href="/docs" className="text-[15px] font-medium hover:text-lime">Docs</Link>
            <Link href="/pricing" className="text-[15px] font-medium hover:text-lime">Pricing</Link>
          </nav>
        </div>
        <div className="hidden items-center gap-7 text-[14px] font-medium uppercase tracking-wider lg:flex">
          <Link href="/contact" className="hover:text-lime">Contact</Link>
          <Link href="/login" className="hover:text-lime">Log in</Link>
          <Link href="/signup" className="hover:text-lime">Sign up</Link>
        </div>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setMobile(!mobile)}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>

      {open === "platform" && (
        <div className="absolute left-[270px] top-[78px] hidden w-[360px] rounded-lg border border-white/10 bg-ink-800 p-6 shadow-2xl lg:block" onMouseEnter={() => setOpen("platform")}>
          <ul className="space-y-5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="group flex items-center gap-4" onClick={close}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-700 group-hover:bg-ink-600"><ProductIcon kind={p.icon} /></span>
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
          <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_1fr_1.4fr] gap-10 px-8 py-10">
            <div>
              <h3 className="mb-6 font-sans text-2xl font-semibold">Use Cases</h3>
              <ul className="space-y-5 text-[17px]">
                {useCases.map((u) => <li key={u}><Link className="hover:text-lime" href={`/solutions/${slugify(u)}`} onClick={close}>{u}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 font-sans text-2xl font-semibold">Industries</h3>
              <ul className="space-y-5 text-[17px]">
                {industries.map((u) => <li key={u}><Link className="hover:text-lime" href={`/industries/${slugify(u)}`} onClick={close}>{u}</Link></li>)}
              </ul>
            </div>
            <div>
              <Link href="/customers" onClick={close} className="mb-6 flex items-center gap-3 font-sans text-2xl font-semibold hover:text-lime">Case Studies <span>›</span></Link>
              <ul className="space-y-6">
                {caseStudies.map((c) => (
                  <li key={c.name} className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-700 font-serif text-xl text-lime">{c.initial}</span>
                    <span>
                      <span className="block font-semibold">{c.name}</span>
                      <span className="text-[14px] text-white/70">{c.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {open === "enterprise" && simple(enterpriseLinks, "left-[560px]", "w-[280px]", "enterprise")}
      {open === "resources" && simple(resourceLinks, "left-[690px]", "w-[260px]", "resources")}

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
