import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { useCases, slugify } from "@/lib/site";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: slugify(u.name) }));
}

export default function Solution({ params }: { params: { slug: string } }) {
  const u = useCases.find((x) => slugify(x.name) === params.slug);
  if (!u) notFound();
  const blocks = [
    ["Record", "Every input, output, model and cost is captured as a structured trace, so no decision is a black box."],
    ["Measure", "Datasets of expected outcomes and deterministic scorers turn quality into a number you can track."],
    ["Resolve", "Monitors flag breaches, and the analysis engine isolates the cause on Pro, so teams fix the right thing first."],
  ];
  return (
    <main>
      <PageHero eyebrow="Solutions" title={u.name} body={u.summary} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {blocks.map(([t, d]) => (
            <div key={t} className="card p-8"><h3 className="text-2xl font-semibold text-lime">{t}</h3><p className="mt-3 text-white/80">{d}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}
