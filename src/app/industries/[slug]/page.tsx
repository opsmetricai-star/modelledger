import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { industries, slugify } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((u) => ({ slug: slugify(u) }));
}

export default function Industry({ params }: { params: { slug: string } }) {
  const name = industries.find((u) => slugify(u) === params.slug);
  if (!name) notFound();
  const blocks = [
    ["Auditability", `Keep a complete, searchable record of model behaviour that ${name} teams can show to reviewers.`],
    ["Reliability", `Catch regressions before they reach users with evaluations tuned to ${name} requirements.`],
    ["Control", `Role-based access and dedicated deployment options for sensitive ${name} data.`],
  ];
  return (
    <main>
      <PageHero eyebrow="Industries" title={`AI for ${name}`} body={`How ${name} organisations use ModelLedger to move from experiments to dependable production systems.`} />
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
