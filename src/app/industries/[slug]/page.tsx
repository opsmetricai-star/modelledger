import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { industries, slugify } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((u) => ({ slug: slugify(u.name) }));
}

export default function Industry({ params }: { params: { slug: string } }) {
  const u = industries.find((x) => slugify(x.name) === params.slug);
  if (!u) notFound();
  const blocks = [
    ["Evidence", "A searchable record of every model interaction, ready for internal review and external audit."],
    ["Quality", "Pass rates against expected outcomes quantify accuracy before each change reaches production."],
    ["Oversight", "Automated thresholds on latency, cost and error rate keep live systems inside defined limits."],
  ];
  return (
    <main>
      <PageHero eyebrow="Industries" title={u.name} body={u.summary} />
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
