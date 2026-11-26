import PageHero from "@/components/PageHero";

const posts = [
  ["Designing evaluations that predict production quality", "Evaluations"],
  ["Tracing multi-step agents without drowning in noise", "Traces"],
  ["Prompt versioning as a release process", "Playground"],
  ["Choosing drift thresholds for live monitors", "Monitors"],
];

export default function Blog() {
  return (
    <main>
      <PageHero eyebrow="Blog" title="Notes from the ModelLedger team" cta={false} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {posts.map(([t, tag]) => <article key={t} className="card p-7"><span className="text-xs uppercase tracking-wider text-lime">{tag}</span><h3 className="mt-2 text-2xl font-semibold">{t}</h3></article>)}
        </div>
      </section>
    </main>
  );
}
