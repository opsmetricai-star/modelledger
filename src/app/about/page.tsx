import PageHero from "@/components/PageHero";

const values = [
  ["Evidence over opinion", "Every claim about a model is backed by a trace, a score or a measured comparison."],
  ["Built for operators", "The platform serves the teams accountable for AI in production: engineering, risk and operations."],
  ["Open by default", "Standard HTTP ingestion and plain data formats keep your records portable."],
];

export default function About() {
  return (
    <main>
      <PageHero eyebrow="About" title="We exist to make enterprise AI accountable" body="Organizations now delegate real decisions to models. ModelLedger gives them the record, the measurement and the oversight that delegation requires." />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map(([t, d]) => <div key={t} className="card p-8"><h3 className="text-2xl font-semibold text-lime">{t}</h3><p className="mt-3 text-white/80">{d}</p></div>)}
        </div>
      </section>
    </main>
  );
}
