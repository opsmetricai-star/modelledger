import Link from "next/link";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage } from "@/lib/server";
import UsageChart from "@/components/UsageChart";

export default async function Overview() {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const plan = await getPlan(sb, user!.id);
  const used = await getUsage(sb, user!.id);
  const limit = LIMITS[plan];
  const since = new Date(Date.now() - 13 * 864e5).toISOString();
  const { data: rows } = await sb.from("traces").select("created_at,latency_ms,status,cost").eq("user_id", user!.id).gte("created_at", since);
  const days: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) days[new Date(Date.now() - i * 864e5).toISOString().slice(5, 10)] = 0;
  (rows ?? []).forEach((r) => { const k = r.created_at.slice(5, 10); if (k in days) days[k]++; });
  const chart = Object.entries(days).map(([day, calls]) => ({ day, calls }));
  const n = rows?.length ?? 0;
  const avg = n ? Math.round(rows!.reduce((a, r) => a + r.latency_ms, 0) / n) : 0;
  const errs = n ? Math.round((rows!.filter((r) => r.status === "error").length / n) * 100) : 0;
  const cost = (rows ?? []).reduce((a, r) => a + Number(r.cost), 0);
  const tiles: [string, string][] = [["Plan", plan.toUpperCase()], ["Calls this month", `${used.toLocaleString()} / ${limit.toLocaleString()}`], ["Avg latency (14d)", `${avg} ms`], ["Error rate (14d)", `${errs}%`], ["Cost (14d)", `$${cost.toFixed(4)}`]];
  return (
    <div>
      <h1 className="text-3xl font-semibold">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {tiles.map(([l, v]) => <div key={l} className="card p-5"><div className="text-sm text-white/60">{l}</div><div className="mt-1 text-2xl font-semibold text-lime">{v}</div></div>)}
      </div>
      <div className="card mt-6 p-5"><h2 className="mb-3 text-lg font-semibold">Traced calls, last 14 days</h2><UsageChart data={chart} /></div>
      {n === 0 && <p className="mt-6 text-white/70">No traces yet. Run a prompt in the <Link href="/dashboard/playground" className="text-lime underline">Playground</Link> or post to <code>/api/ingest</code>.</p>}
    </div>
  );
}
