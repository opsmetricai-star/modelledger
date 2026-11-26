import Link from "next/link";
import { products } from "@/lib/site";
import { ProductIcon, Check } from "@/components/Icons";

const engine = [
  { verb: "Analyzes", text: "Reads a failing trace end to end and returns a summary, the likely root cause and ranked remediation steps." },
  { verb: "Scores", text: "Runs every prompt change against a dataset of expected outcomes and reports a deterministic pass rate." },
  { verb: "Detects", text: "Evaluates the last 24 hours of production traffic against your limits on latency, spend and error rate." },
  { verb: "Automates", text: "Records, meters and enforces plan limits on every call without manual logging or spreadsheet reconciliation." },
];

const outcomes = [
  { head: "Protect revenue", body: "Failures in customer-facing AI cost deals and renewals. Monitors flag error and latency breaches while they are still contained, and trace analysis points to the cause." },
  { head: "Control cost", body: "Every call carries token volume and spend. Teams see which workflows consume budget and cap usage by plan before invoices arrive." },
  { head: "Release faster", body: "A measured pass rate replaces manual review. Prompt and model changes ship when the score holds, not when a meeting ends." },
  { head: "Reduce risk", body: "A complete, searchable record of inputs, outputs and models gives compliance and audit teams evidence instead of recollection." },
];

const steps = [
  { t: "Connect", d: "Send traces from any system through the authenticated ingestion API, or run prompts directly in the Playground." },
  { t: "Measure", d: "Build datasets of expected outcomes and score every change with the evaluation engine." },
  { t: "Oversee", d: "Set limits on latency, cost and error rate. Monitors evaluate live traffic continuously." },
  { t: "Resolve", d: "Open any failing trace and let the analysis engine isolate the cause and recommend the fix." },
];

const spans: [string, string, number][] = [
  ["agent.run", "2.41 s", 0],
  ["retrieve_documents", "0.62 s", 1],
  ["rerank", "0.18 s", 2],
  ["llm.generate", "1.34 s", 1],
  ["tool.lookup_order", "0.21 s", 2],
  ["guardrail.check", "0.07 s", 1],
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink-900 pt-20 text-center sm:pt-28">
        <div className="container-x">
          <h1 className="relative inline-block text-[38px] font-semibold leading-[1.1] sm:text-6xl md:text-[74px]">
            <span className="absolute right-2 top-full -mt-1 -rotate-6 font-hand text-4xl text-lime sm:-top-12 sm:right-[8%] sm:mt-0 sm:text-6xl">proof</span>
            Enterprise AI runs on{" "}
            <span className="relative inline-block">
              guesswork
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 60" preserveAspectRatio="none" fill="none" stroke="#3DDC84" strokeWidth="4" strokeLinecap="round" aria-hidden>
                <path d="M4 36 C 40 20, 100 52, 156 24" />
                <path d="M6 46 C 50 30, 110 58, 154 40" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-14 max-w-3xl sm:mt-10 text-xl leading-snug text-white sm:text-[22px]">
            ModelLedger is the AI-native operating layer for enterprise AI. Its analysis engine records every model decision, scores output quality, detects breaches and diagnoses root causes, so operators protect revenue, control spend and release with measured risk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn btn-primary">Sign up</Link>
            <Link href="/login" className="btn btn-ghost">Log in</Link>
          </div>
        </div>

        <div className="container-x mt-14">
          <div className="mx-auto max-w-[800px] overflow-hidden rounded-t-xl text-left shadow-2xl">
            <div className="flex items-center gap-3 bg-ink-700 px-5 py-4">
              <span className="h-3.5 w-3.5 rounded-full bg-lime-soft" /><span className="h-3.5 w-3.5 rounded-full bg-mint" /><span className="h-3.5 w-3.5 rounded-full bg-lime-deep" />
              <span className="ml-3 truncate font-mono text-[15px] sm:text-[17px]">Ingest a trace from any system</span>
            </div>
            <pre className="overflow-x-auto bg-gradient-to-br from-ink-900 to-[#12352a] px-6 py-7 font-mono text-[12px] leading-7 sm:text-[13px]">
{`POST /api/ingest
Authorization: Bearer ml_live_...

{
  "name": "support.agent",
  "latency_ms": 1840,
  "tokens": 912,
  "cost": 0.0004,
  "status": "ok"
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-ink-850 py-24">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold sm:text-5xl">An AI engine at the core of every workflow</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-white/70">ModelLedger does not add AI to a dashboard. The analysis engine is the product, and every module runs on it.</p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engine.map((e) => (
              <div key={e.verb} className="card p-7">
                <div className="font-serif text-3xl font-semibold text-lime">{e.verb}</div>
                <p className="mt-3 text-white/75">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold sm:text-5xl">Measured against the outcomes that matter</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o.head} className="flex gap-4">
                <Check />
                <div>
                  <h3 className="text-2xl font-semibold">{o.head}</h3>
                  <p className="mt-2 text-white/70">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-850 py-24">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold sm:text-5xl">Four modules, one system of record</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="card group p-8 transition hover:border-lime/60">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink-700"><ProductIcon kind={p.icon} /></span>
                <h3 className="text-2xl font-semibold group-hover:text-lime">{p.name}</h3>
                <p className="mt-2 text-white/70">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="container-x">
          <h2 className="text-center text-4xl font-semibold sm:text-5xl">From first call to controlled release</h2>
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

      <section className="bg-ink-850 py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold sm:text-5xl">See where every second and dollar goes</h2>
            <p className="mt-5 text-lg text-white/70">Each trace breaks a request into nested steps with latency, tokens and cost. The slow retrieval, the wrong tool call and the drifting prompt become visible, and the analysis engine names the cause.</p>
          </div>
          <div className="card overflow-hidden font-mono text-[13px]">
            <div className="border-b border-white/10 bg-ink-700 px-4 py-3 text-white/70">Example trace: agent.run, 2.41 s</div>
            {spans.map(([n, t, d]) => (
              <div key={n} className="flex items-center justify-between border-b border-white/5 px-4 py-3" style={{ paddingLeft: 16 + d * 24 }}>
                <span><span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-lime" />{n}</span>
                <span className="text-white/60">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-lime-deep to-mint-deep py-20 text-center text-ink-950">
        <div className="container-x">
          <h2 className="text-4xl font-semibold sm:text-5xl">Put an AI engine in charge of your AI</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg">Start with 1,000 traced calls per month at no charge. Upgrade as production volume grows.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn bg-ink-950 text-white hover:bg-ink-800">Create account</Link>
            <Link href="/login" className="btn border border-ink-950 text-ink-950 hover:bg-white/20">Log in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
