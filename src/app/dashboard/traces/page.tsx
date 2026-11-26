import { serverClient } from "@/lib/supabase-server";
import TraceRow from "./TraceRow";

export default async function Traces() {
  const sb = serverClient();
  const { data } = await sb.from("traces").select("*").order("created_at", { ascending: false }).limit(100);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Traces</h1>
      <p className="mt-2 text-white/70">Every recorded call, newest first. Expand a row for the call tree.</p>
      <div className="mt-6 space-y-3">
        {(data ?? []).length === 0 && <p className="text-white/60">No traces yet.</p>}
        {(data ?? []).map((t) => <TraceRow key={t.id} t={t} />)}
      </div>
    </div>
  );
}
