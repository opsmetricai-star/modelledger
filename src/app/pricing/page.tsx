import Link from "next/link";
import PageHero from "@/components/PageHero";
import { plans } from "@/lib/site";

const faqs = [
  ["How does billing work?", "Plans are billed through our secure checkout. After you pay, your plan is activated once the payment is verified by our team."],
  ["What counts as a traced call?", "Each model call, tool call or retrieval recorded by the SDK counts as one traced call."],
  ["Can I change plans?", "Yes. Choose a new plan at any time from the billing page; the new limits apply after verification."],
  ["Do you offer enterprise terms?", "Yes. Contact us for dedicated deployment, SSO and custom retention."],
];

export default function Pricing() {
  return (
    <main>
      <PageHero eyebrow="Pricing" title="Simple plans that scale with your traffic" body="Pick the plan that fits your team today and upgrade when usage grows." cta={false} />
      <section className="bg-ink-850 pb-24 pt-4">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`card relative flex flex-col p-8 ${p.popular ? "border-lime" : ""}`}>
              {p.popular && <span className="absolute -top-3 left-8 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase text-ink-950">Most popular</span>}
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-white/70">{p.tagline}</p>
              <div className="mt-6 font-serif text-5xl font-semibold">${p.price}<span className="text-base font-normal text-white/60"> /month</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-white/85">
                {p.features.map((f) => <li key={f} className="flex gap-3"><span className="text-lime">✓</span>{f}</li>)}
              </ul>
              <Link href={`/dashboard/billing?plan=${p.id}`} className="btn btn-primary mt-8">Upgrade to {p.name}</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-ink-900 py-20">
        <div className="container-x max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-semibold">Frequently asked questions</h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="border-b border-white/10 py-4"><summary className="cursor-pointer text-lg font-semibold">{q}</summary><p className="mt-2 text-white/70">{a}</p></details>
          ))}
        </div>
      </section>
    </main>
  );
}
