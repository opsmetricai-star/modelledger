import PageHero from "@/components/PageHero";

export default function About() {
  const values = [
    ["Evidence over opinion", "Every claim about a model should be backed by a trace, a score or a comparison."],
    ["Built for builders", "We design for the engineer debugging at midnight, not the slide deck."],
    ["Open by default", "Standard formats and exports so your data is never locked in."],
  ];
  return (
    <main>
      <PageHero eyebrow="About" title="We help teams trust the AI they ship" body="ModelLedger exists because shipping AI without measurement is guesswork." cta={false} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map(([t, d]) => <div key={t} className="card p-8"><h3 className="text-2xl font-semibold text-lime">{t}</h3><p className="mt-3 text-white/80">{d}</p></div>)}
        </div>
      </section>
    </main>
  );
}
