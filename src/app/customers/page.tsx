import PageHero from "@/components/PageHero";
import { caseStudies } from "@/lib/site";

export default function Customers() {
  return (
    <main>
      <PageHero eyebrow="Customers" title="Teams that ship AI with ModelLedger" cta={false} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {caseStudies.map((c) => (
            <div key={c.name} className="card p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-700 font-serif text-2xl text-lime">{c.initial}</span>
              <h3 className="mt-5 text-2xl font-semibold">{c.name}</h3><p className="mt-2 text-white/70">{c.note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
