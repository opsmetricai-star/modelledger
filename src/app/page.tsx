import Link from "next/link";
import { products, caseStudies, BRAND } from "@/lib/site";
import { ProductIcon } from "@/components/Icons";

const code = [
  ["import", " ledger"],
  ["ledger.init(", '"quickstart"', ")"],
  ["@ledger.op()", ""],
  ["def", " llm_app(prompt):"],
  ["    return", " client.chat(prompt)"],
];

const logos = ["Northwind", "Halcyon", "Torque", "Meridian", "Auralis", "Vantage", "Kestrel", "Oakline"];

const stats = [
  ["40B+", "calls traced every month"],
  ["12,000", "teams building on the platform"],
  ["3.2x", "faster debugging of agent failures"],
  ["99.95%", "ingestion uptime"],
];

const steps = [
  { t: "Instrument", d: "Add one decorator or the OpenTelemetry exporter. Every model call, tool call and retrieval is recorded with inputs, outputs, latency and cost." },
  { t: "Evaluate", d: "Turn real traces into datasets, attach scorers and compare versions before a release reaches users." },
  { t: "Monitor", d: "Run the same scorers on live traffic and get alerted the moment quality, cost or latency drifts." },
  { t: "Improve", d: "Open any failing trace in the playground, fix the prompt, and promote the winning version." },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900 pb-0 pt-20 text-center sm:pt-28">
        <div className="container-x">
          <h1 className="relative inline-block text-[40px] font-semibold leading-[1.1] sm:text-6xl md:text-[78px]">
            <span className="absolute -top-8 left-[18%] -rotate-6 font-hand text-4xl text-lime sm:-top-12 sm:text-6xl">easy</span>
            AI is <span className="relative inline-block">hard
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 60" preserveAspectRatio="none" fill="none" stroke="#3DDC84" strokeWidth="5" strokeLinecap="round">
                <path d="M4 36 C 40 20, 100 52, 156 24" /><path d="M6 46 C 50 30, 110 58, 154 40" />
              </svg>
            </span> to productionize
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-xl leading-snug text-white sm:text-[22px]">
            The AI developer platform to build AI agents, applications, and models with confidence
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn btn-primary">Start for free</Link>
            <Link href="/contact" className="btn btn-ghost">Book a demo</Link>
          </div>
        </div>

        {/* code window */}
        <div className="container-x mt-14">
          <div className="mx-auto max-w-[800px] overflow-hidden rounded-t-xl text-left shadow-2xl">
            <div className="flex items-center gap-3 bg-ink-700 px-5 py-4">
              <span className="h-3.5 w-3.5 rounded-full bg-lime-soft" /><span className="h-3.5 w-3.5 rounded-full bg-mint" /><span className="h-3.5 w-3.5 rounded-full bg-lime-deep" />
              <span className="ml-3 font-mono text-[17px]">{BRAND} Traces: Build agentic AI applications</span>
            </div>
            <div className="bg-gradient-to-br from-ink-900 to-[#12352a] px-6 py-7 font-mono text-[13px] leading-7">
              {code.map((l, i) => (
                <div key={i} className="flex gap-5"><span className="w-3 text-white/50">{i + 1}</span>
                  <span><span className="text-lime-soft">{l[0]}</span><span className="text-white">{l[1]}</span><span className="text-lime-soft">{l[2]}</span></span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-white/10 bg-ink-950 py-10">
        <div className="container-x">
          <p className="mb-6 text-center text-sm uppercase tracking-widest text-white/50">Trusted by teams shipping AI to production</p>
          <div className="grid grid-cols-2 gap-6 text-center font-serif text-2xl text-white/60 sm:grid-cols-4 lg:grid-cols-8">
            {logos.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-ink-850 py-24">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold sm:text-5xl">One platform from first prototype to production</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-white/70">Four connected modules share one data model, so a trace becomes a test case, a test case becomes a monitor, and every fix is measurable.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="card group p-8 transition hover:border-lime/60">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink-700"><ProductIcon kind={p.icon} /></span>
                <h3 className="text-2xl font-semibold group-hover:text-lime">{p.name}</h3>
                <p className="mt-2 text-white/70">{p.body}</p>
                <span className="mt-5 inline-block text-sm font-semibold uppercase tracking-wider text-lime">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink-900 py-24">
        <div className="container-x">
          <h2 className="text-center text-4xl font-semibold sm:text-5xl">From first call to confident release</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.t}>
                <div className="font-hand text-5xl text-lime">0{i + 1}</div>
                <h3 className="mt-2 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACE PREVIEW */}
      <section className="bg-ink-850 py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold sm:text-5xl">Debug agents like you debug code</h2>
            <p className="mt-5 text-lg text-white/70">Expand a trace to see every nested step. Spot the slow retrieval, the wrong tool argument or the prompt that drifted, and jump straight into a fix.</p>
            <ul className="mt-6 space-y-3 text-white/80">
              {["Call trees with token and cost rollups", "Diff two runs side by side", "One-click replay in the playground"].map((x) => <li key={x} className="flex gap-3"><span className="text-lime">✓</span>{x}</li>)}
            </ul>
          </div>
          <div className="card overflow-hidden font-mono text-[13px]">
            <div className="border-b border-white/10 bg-ink-700 px-4 py-3 text-white/70">agent.run · 2.41s · $0.0043</div>
            {[["agent.run", "2.41s", 0], ["retrieve_docs", "0.62s", 1], ["rerank", "0.18s", 2], ["llm.generate", "1.34s", 1], ["tool.search_orders", "0.21s", 2], ["guardrail.check", "0.07s", 1]].map(([n, t, d]) => (
              <div key={n as string} className="flex items-center justify-between border-b border-white/5 px-4 py-3" style={{ paddingLeft: 16 + (d as number) * 24 }}>
                <span><span className="mr-2 text-lime">●</span>{n}</span><span className="text-white/60">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ink-950 py-20">
        <div className="container-x grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l}><div className="font-serif text-5xl font-semibold text-lime">{n}</div><div className="mt-2 text-white/70">{l}</div></div>
          ))}
        </div>
      </section>

      {/* CUSTOMERS */}
      <section className="bg-ink-900 py-24">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-semibold sm:text-5xl">Meet our customers</h2>
            <Link href="/customers" className="hidden text-lg font-semibold text-lime sm:block">Meet our customers →</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <div key={c.name} className="card p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-700 font-serif text-2xl text-lime">{c.initial}</span>
                <h3 className="mt-5 text-2xl font-semibold">{c.name}</h3>
                <p className="mt-2 text-white/70">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="bg-ink-850 py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-lime sm:text-5xl">{BRAND} mobile app</h2>
            <p className="mt-5 text-lg text-white/80">Keep an eye on experiments and production quality from anywhere. Get a push when a run finishes or a monitor fires.</p>
          </div>
          <div className="mx-auto w-[260px] rounded-[36px] border-[6px] border-ink-600 bg-white p-4 text-ink-900">
            <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-black" />
            <div className="text-center text-sm font-semibold">Your runs</div>
            {["cc-agent-rl-2026", "coding-agent-rl-2026", "rag-eval-v14"].map((r) => (
              <div key={r} className="mt-3 rounded-lg border p-3 text-xs"><div className="font-semibold text-lime-deep">✓ {r}</div>
                <svg viewBox="0 0 100 20" className="mt-2 w-full" fill="none" stroke="#1FA85B"><path d="M0 12 L10 8 L20 14 L30 6 L40 11 L50 5 L60 12 L70 7 L80 13 L90 6 L100 9" /></svg></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-lime-deep to-mint-deep py-20 text-center text-ink-950">
        <div className="container-x">
          <h2 className="text-4xl font-semibold sm:text-5xl">Ship AI you can trust</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg">Start tracing in minutes. No credit card to explore the platform.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/signup" className="btn bg-ink-950 text-white hover:bg-ink-800">Get started</Link>
            <Link href="/pricing" className="btn border border-ink-950 text-ink-950 hover:bg-white/20">See pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
