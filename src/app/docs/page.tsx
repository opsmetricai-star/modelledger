import PageHero from "@/components/PageHero";

const sections = [
  ["Authentication", "Create an API key in Dashboard, Settings. Send it as a Bearer token. Keys are shown once and stored as one-way hashes."],
  ["Traces", "Every record holds a name, input, output, model, latency, tokens, cost, status and optional nested spans."],
  ["Evaluations", "Provide a prompt template with a {{input}} placeholder and rows in the form input => expected. Choose the contains or exact scorer. Team plan and above."],
  ["Monitors", "Create a threshold on average latency, 24-hour cost or error rate. The state is evaluated against the last 24 hours of traces. Team plan and above."],
  ["Limits", "Each plan includes a monthly volume of traced calls. Requests above the limit return HTTP 429."],
];

const example = `curl -X POST https://YOUR_DOMAIN/api/ingest \\
  -H "Authorization: Bearer ml_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "support.agent",
    "input": "Where is my order?",
    "output": "Your order ships tomorrow.",
    "model": "model-name",
    "latency_ms": 1840,
    "tokens": 912,
    "cost": 0.0004,
    "status": "ok",
    "spans": [{ "name": "retrieve_documents", "latency_ms": 620 }]
  }'`;

export default function Docs() {
  return (
    <main>
      <PageHero eyebrow="Documentation" title="Ingestion API and platform reference" body="Everything required to send traces, run evaluations and configure monitors." cta={false} />
      <section className="bg-ink-850 py-20">
        <div className="container-x">
          <h2 className="mb-4 text-3xl font-semibold">Send a trace</h2>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-ink-900 p-5 font-mono text-[13px] leading-6">{example}</pre>
          <p className="mt-3 text-sm text-white/60">Responses: 201 on success, 400 for an invalid payload, 401 for a missing or invalid key, 429 when the monthly limit is reached.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sections.map(([t, d]) => <div key={t} className="card p-7"><h3 className="text-xl font-semibold text-lime">{t}</h3><p className="mt-2 text-white/75">{d}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
