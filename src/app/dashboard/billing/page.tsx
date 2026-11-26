import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage } from "@/lib/server";
import { plans } from "@/lib/site";

// Records a pending request, then sends the user to checkout. The plan only becomes
// active after an administrator verifies the payment (see /dashboard/admin).
async function requestPlan(fd: FormData) {
  "use server";
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const plan = plans.find((p) => p.id === String(fd.get("plan")));
  if (!user || !plan) return;
  await sb.from("subscriptions").insert({ user_id: user.id, plan: plan.id, status: "pending" });
  redirect(plan.link);
}

export default async function Billing({ searchParams }: { searchParams: { plan?: string } }) {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const plan = await getPlan(sb, user!.id);
  const used = await getUsage(sb, user!.id);
  const { data: subs } = await sb.from("subscriptions").select("*").order("requested_at", { ascending: false }).limit(10);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Billing</h1>
      <div className="card mt-6 p-5">
        <div>Current plan: <b className="text-lime">{plan.toUpperCase()}</b></div>
        <div className="mt-1 text-white/70">{used.toLocaleString()} of {LIMITS[plan].toLocaleString()} calls used this month</div>
        <div className="mt-3 h-2 rounded bg-ink-600"><div className="h-2 rounded bg-lime" style={{ width: `${Math.min(100, (used / LIMITS[plan]) * 100)}%` }} /></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <form key={p.id} action={requestPlan} className={`card p-5 ${searchParams.plan === p.id ? "border-lime" : ""}`}>
            <h3 className="text-xl font-semibold">{p.name} · ${p.price}/mo</h3>
            <ul className="mt-3 space-y-1 text-sm text-white/75">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            <input type="hidden" name="plan" value={p.id} />
            <button disabled={plan === p.id} className="btn btn-primary mt-4 w-full disabled:opacity-40">{plan === p.id ? "Current plan" : "Pay & upgrade"}</button>
          </form>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/60">After paying, your plan is activated once the payment is verified. Redirecting back alone does not change your plan.</p>
      <h2 className="mb-2 mt-8 text-xl font-semibold">Subscription history</h2>
      {(subs ?? []).map((s) => <div key={s.id} className="border-b border-white/10 py-2 text-sm">{s.plan} · <span className={s.status === "active" ? "text-lime" : "text-white/60"}>{s.status}</span> · {new Date(s.requested_at).toLocaleDateString()}</div>)}
    </div>
  );
}
