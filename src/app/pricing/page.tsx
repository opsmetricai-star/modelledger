import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Check } from "@/components/Icons";
import { plans } from "@/lib/site";

const faqs = [
  ["What counts as a traced call?", "Each model call, tool call or retrieval recorded through the Playground, an evaluation run or the ingestion API counts as one traced call."],
  ["How is a plan activated?", "Payment is completed at secure checkout. The plan activates after the payment is verified, which protects every account from unconfirmed upgrades."],
  ["What happens at the monthly limit?", "New traces are paused until the next billing month or until you move to a higher plan. Existing data stays available."],
  ["What does the free allowance include?", "Every new account includes 1,000 traced calls per month, the Playground and Traces."],
];

export default function Pricing() {
  return (
    <main>
      <PageHero eyebrow="Pricing" title="Pricing that scales with production volume" body="Choose the plan that matches your traced call volume and the controls your operation requires." cta={false} />
      <section className="bg-ink-850 pb-24 pt-4">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`card relative flex flex-col p-8 ${p.popular ? "border-lime" : ""}`}>
              {p.popular && <span className="absolute -top-3 left-8 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase text-ink-950">Most selected</span>}
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-white/70">{p.tagline}</p>
              <div className="mt-6 font-serif text-5xl font-semibold">${p.price}<span className="text-base font-normal text-white/60"> per month</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-white/85">
                {p.features.map((f) => <li key={f} className="flex gap-3"><Check />{f}</li>)}
              </ul>
              <Link href={`/signup?plan=${p.id}`} className="btn btn-primary mt-8">Sign up</Link>
            </div>
          ))}
        </div>
        <p className="container-x mt-8 text-center text-sm text-white/60">Already have an account? <Link href="/login?plan=team" className="text-lime underline">Log in</Link> to upgrade from Billing.</p>
      </section>
      <section className="bg-ink-900 py-20">
        <div className="container-x max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-semibold">Pricing questions</h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="border-b border-white/10 py-4"><summary className="cursor-pointer text-lg font-semibold">{q}</summary><p className="mt-2 text-white/70">{a}</p></details>
          ))}
        </div>
      </section>
    </main>
  );
}
