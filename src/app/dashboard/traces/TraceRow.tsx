"use client";
import { useState } from "react";

type Trace = { id: string; name: string; status: string; latency_ms: number; tokens: number; cost: number; model: string | null; input: string | null; output: string | null; spans: { name: string; latency_ms?: number }[]; created_at: string };
type Analysis = { summary: string; likely_cause: string; suggestions: string[] };

export default function TraceRow({ t }: { t: Trace }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [a, setA] = useState<Analysis | null>(null);
  const [err, setErr] = useState("");

  async function analyze() {
    setBusy(true); setErr(""); setA(null);
    const r = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ traceId: t.id }) });
    const j = await r.json();
    if (r.ok) setA(j); else setErr(j.error || "Analysis failed");
    setBusy(false);
  }

  return (
    <div className="card">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-4 text-left">
        <span className="min-w-0"><span className={`mr-2 ${t.status === "ok" ? "text-lime" : "text-red-400"}`}>●</span><span className="font-semibold">{t.name}</span>
          <span className="ml-3 text-xs text-white/50">{new Date(t.created_at).toLocaleString()}</span></span>
        <span className="shrink-0 text-sm text-white/70">{t.latency_ms} ms · {t.tokens} tok · ${Number(t.cost).toFixed(5)}</span>
      </button>
      {open && (
        <div className="space-y-3 border-t border-white/10 p-4 text-sm">
          <div><div className="mb-1 text-white/50">Input</div><pre className="whitespace-pre-wrap rounded bg-ink-900 p-3">{t.input}</pre></div>
          <div><div className="mb-1 text-white/50">Output</div><pre className="whitespace-pre-wrap rounded bg-ink-900 p-3">{t.output}</pre></div>
          {t.spans?.length > 0 && <div><div className="mb-1 text-white/50">Spans</div>{t.spans.map((s, i) => <div key={i} className="font-mono text-white/80">└ {s.name} {s.latency_ms != null && `· ${s.latency_ms} ms`}</div>)}</div>}
          <button onClick={analyze} disabled={busy} className="btn btn-ghost !py-2">{busy ? "Analyzing…" : "Analyze with AI (Pro)"}</button>
          {err && <p className="text-red-400">{err}</p>}
          {a && <div className="rounded border border-lime/30 bg-lime/5 p-3"><p>{a.summary}</p><p className="mt-2"><b>Likely cause:</b> {a.likely_cause}</p><ul className="mt-2 list-disc pl-5">{a.suggestions.map((s) => <li key={s}>{s}</li>)}</ul></div>}
        </div>
      )}
    </div>
  );
}
