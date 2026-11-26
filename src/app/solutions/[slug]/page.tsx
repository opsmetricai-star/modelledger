import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { useCases, slugify } from "@/lib/site";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: slugify(u) }));
}

export default function Solution({ params }: { params: { slug: string } }) {
  const name = useCases.find((u) => slugify(u) === params.slug);
  if (!name) notFound();
  const blocks = [
    ["Capture", `Record every input, output and intermediate step in your ${name} workflow so nothing is a black box.`],
    ["Measure", `Define what good looks like for ${name} and score every run against it automatically.`],
    ["Improve", `Use failing cases as a to-do list: fix, rerun, compare, and promote only what is measurably better.`],
  ];
  return (
    <main>
      <PageHero eyebrow="Solutions" title={`${name} with ModelLedger`} body={`Everything your team needs to build, measure and improve ${name} workloads in one place.`} />
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
