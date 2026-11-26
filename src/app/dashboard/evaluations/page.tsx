import { serverClient } from "@/lib/supabase-server";
import EvalForm from "./EvalForm";

export default async function Evaluations() {
  const { data } = await serverClient().from("evaluations").select("*").order("created_at", { ascending: false }).limit(20);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Evaluations</h1>
      <p className="mt-2 text-white/70">Run a prompt template over a dataset and score each output deterministically. Team plan and above.</p>
      <EvalForm />
      <h2 className="mb-3 mt-10 text-xl font-semibold">History</h2>
      <div className="space-y-3">
        {(data ?? []).length === 0 && <p className="text-white/60">No evaluations yet.</p>}
        {(data ?? []).map((e) => (
          <details key={e.id} className="card p-4">
            <summary className="cursor-pointer"><b>{e.name}</b> <span className="ml-2 text-lime">{e.score}%</span> <span className="text-xs text-white/50">{e.scorer} · {new Date(e.created_at).toLocaleString()}</span></summary>
            <table className="mt-3 w-full text-left text-sm"><thead className="text-white/50"><tr><th>Input</th><th>Expected</th><th>Output</th><th>Pass</th></tr></thead>
              <tbody>{(e.results as { input: string; expected: string; output: string; pass: boolean }[]).map((r, i) => <tr key={i} className="border-t border-white/10 align-top"><td className="py-2 pr-2">{r.input}</td><td className="pr-2">{r.expected}</td><td className="pr-2">{r.output.slice(0, 160)}</td><td className={r.pass ? "text-lime" : "text-red-400"}>{r.pass ? "Pass" : "Fail"}</td></tr>)}</tbody></table>
          </details>
        ))}
      </div>
    </div>
  );
}
