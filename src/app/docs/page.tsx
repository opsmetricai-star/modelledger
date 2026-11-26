import PageHero from "@/components/PageHero";

const sections = [
  ["Quickstart", "Install the SDK, call init() with your project name and decorate your first function."],
  ["Traces", "How spans nest, what is captured and how to add custom metadata."],
  ["Evaluations", "Create datasets, write scorers and compare versions."],
  ["Monitors", "Attach scorers to live traffic and configure alerts."],
  ["API reference", "Ingest endpoint, authentication and rate limits."],
];

export default function Docs() {
  return (
    <main>
      <PageHero eyebrow="Docs" title="Documentation" body="Everything you need to instrument, evaluate and monitor your AI applications." cta={false} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {sections.map(([t, d]) => <div key={t} className="card p-7"><h3 className="text-xl font-semibold text-lime">{t}</h3><p className="mt-2 text-white/75">{d}</p></div>)}
        </div>
      </section>
    </main>
  );
}
