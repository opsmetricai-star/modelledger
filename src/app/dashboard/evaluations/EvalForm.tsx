"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EvalForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    // Dataset format: one row per line, "input => expected"
    const rows = String(f.get("rows")).split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const [input, ...rest] = l.split("=>");
      return { input: input.trim(), expected: rest.join("=>").trim() };
    });
    setBusy(true); setErr("");
    const r = await fetch("/api/evaluate", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), prompt_template: f.get("tpl"), scorer: f.get("scorer"), rows }) });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return setErr(j.error || "Evaluation failed");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card mt-6 space-y-3 p-5">
      <input name="name" required placeholder="Evaluation name" className="input" />
      <textarea name="tpl" required rows={2} defaultValue="Answer in one word: {{input}}" className="input" />
      <select name="scorer" className="input"><option value="contains">Output contains expected</option><option value="exact">Output equals expected</option></select>
      <textarea name="rows" required rows={5} placeholder={"One row per line: input => expected\nCapital of France? => Paris"} className="input font-mono" />
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "Running…" : "Run evaluation"}</button>
    </form>
  );
}
