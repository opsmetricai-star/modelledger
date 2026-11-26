"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

type Saved = { id: string; name: string; body: string; version: number };

export default function Playground() {
  const [system, setSystem] = useState("");
  const [prompt, setPrompt] = useState("");
  const [out, setOut] = useState("");
  const [meta, setMeta] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [pname, setPname] = useState("");

  async function load() {
    const { data } = await createClient().from("prompts").select("*").order("created_at", { ascending: false });
    setSaved((data as Saved[]) ?? []);
  }
  useEffect(() => { load(); }, []);

  async function run() {
    setBusy(true); setErr(""); setOut(""); setMeta("");
    const r = await fetch("/api/playground", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: system || undefined, prompt }) });
    const j = await r.json();
    if (r.ok) { setOut(j.output); setMeta(`${j.latency_ms} ms · ${j.tokens} tokens · saved as trace`); } else setErr(j.error || "Run failed");
    setBusy(false);
  }
  async function save() {
    if (!pname || !prompt) return;
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser();
    const version = saved.filter((s) => s.name === pname).length + 1;
    const { error } = await sb.from("prompts").insert({ user_id: user!.id, name: pname, body: prompt, version });
    if (error) setErr(error.message); else { setPname(""); load(); }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Playground</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <textarea value={system} onChange={(e) => setSystem(e.target.value)} rows={3} placeholder="System instruction (optional)" className="input" />
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={8} placeholder="Write a prompt…" className="input" />
          <div className="flex flex-wrap gap-3">
            <button onClick={run} disabled={busy || !prompt} className="btn btn-primary disabled:opacity-50">{busy ? "Running…" : "Run"}</button>
            <input value={pname} onChange={(e) => setPname(e.target.value)} placeholder="Prompt name" className="input !w-40" />
            <button onClick={save} className="btn btn-ghost">Save version</button>
          </div>
          {err && <p className="text-red-400">{err}</p>}
        </div>
        <div>
          <div className="card min-h-[200px] whitespace-pre-wrap p-4 text-sm">{out || <span className="text-white/40">Output appears here.</span>}</div>
          {meta && <p className="mt-2 text-xs text-white/60">{meta}</p>}
          <h2 className="mb-2 mt-6 font-semibold">Saved prompts</h2>
          {saved.length === 0 && <p className="text-sm text-white/50">None yet.</p>}
          {saved.map((s) => <button key={s.id} onClick={() => setPrompt(s.body)} className="card mb-2 block w-full p-3 text-left text-sm hover:border-lime/60"><b>{s.name}</b> <span className="text-white/50">v{s.version}</span></button>)}
        </div>
      </div>
    </div>
  );
}
