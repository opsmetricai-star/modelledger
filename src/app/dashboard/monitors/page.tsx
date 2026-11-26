import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase-server";
import { getPlan } from "@/lib/server";

async function create(fd: FormData) {
  "use server";
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return;
  if ((await getPlan(sb, user.id)) === "free" || (await getPlan(sb, user.id)) === "starter") return;
  const threshold = Number(fd.get("threshold"));
  if (!fd.get("name") || !Number.isFinite(threshold)) return;
  await sb.from("monitors").insert({ user_id: user.id, name: String(fd.get("name")), metric: String(fd.get("metric")), threshold });
  revalidatePath("/dashboard/monitors");
}
async function remove(fd: FormData) {
  "use server";
  await serverClient().from("monitors").delete().eq("id", String(fd.get("id")));
  revalidatePath("/dashboard/monitors");
}

export default async function Monitors() {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const plan = await getPlan(sb, user!.id);
  const { data: monitors } = await sb.from("monitors").select("*").order("created_at", { ascending: false });
  const since = new Date(Date.now() - 864e5).toISOString();
  const { data: rows } = await sb.from("traces").select("latency_ms,cost,status").gte("created_at", since);
  const n = rows?.length ?? 0;
  const current: Record<string, number> = {
    latency_ms: n ? rows!.reduce((a, r) => a + r.latency_ms, 0) / n : 0,
    cost: (rows ?? []).reduce((a, r) => a + Number(r.cost), 0),
    error_rate: n ? (rows!.filter((r) => r.status === "error").length / n) * 100 : 0,
  };
  const locked = plan === "free" || plan === "starter";
  return (
    <div>
      <h1 className="text-3xl font-semibold">Monitors</h1>
      <p className="mt-2 text-white/70">Thresholds are checked against the last 24 hours of traces. Team plan and above.</p>
      {locked ? <p className="card mt-6 p-5 text-lime-soft">Upgrade to Team or Pro in Billing to create monitors.</p> : (
        <form action={create} className="card mt-6 grid gap-3 p-5 sm:grid-cols-4">
          <input name="name" required placeholder="Monitor name" className="input" />
          <select name="metric" className="input"><option value="latency_ms">Avg latency (ms)</option><option value="cost">Cost / 24h ($)</option><option value="error_rate">Error rate (%)</option></select>
          <input name="threshold" type="number" step="any" required placeholder="Alert above" className="input" />
          <button className="btn btn-primary">Add monitor</button>
        </form>
      )}
      <div className="mt-6 space-y-3">
        {(monitors ?? []).map((m) => {
          const cur = current[m.metric] ?? 0, firing = cur > Number(m.threshold);
          return (
            <div key={m.id} className={`card flex items-center justify-between p-4 ${firing ? "border-red-400/60" : ""}`}>
              <div><b>{m.name}</b> <span className="text-sm text-white/60">{m.metric} &gt; {m.threshold}</span><div className="text-sm">Current {cur.toFixed(2)} · <span className={firing ? "text-red-400" : "text-lime"}>{firing ? "ALERT" : "OK"}</span></div></div>
              <form action={remove}><input type="hidden" name="id" value={m.id} /><button className="text-sm text-white/60 hover:text-red-400">Delete</button></form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
