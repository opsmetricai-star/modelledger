import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase-server";
import { adminClient, isAdmin } from "@/lib/server";

async function guard() {
  const { data: { user } } = await serverClient().auth.getUser();
  if (!isAdmin(user?.email)) notFound();
}

async function activate(fd: FormData) {
  "use server";
  await guard();
  const db = adminClient();
  const id = String(fd.get("id")), uid = String(fd.get("uid"));
  await db.from("subscriptions").update({ status: "cancelled" }).eq("user_id", uid).eq("status", "active");
  await db.from("subscriptions").update({ status: "active", verified_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/dashboard/admin");
}

export default async function Admin() {
  await guard();
  const { data } = await adminClient().from("subscriptions").select("*").eq("status", "pending").order("requested_at", { ascending: false });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Payment verification</h1>
      <p className="mt-2 text-white/70">Confirm a payment in your Selar dashboard first, then activate the matching request.</p>
      <div className="mt-6 space-y-3">
        {(data ?? []).length === 0 && <p className="text-white/60">No pending requests.</p>}
        {(data ?? []).map((s) => (
          <form key={s.id} action={activate} className="card flex items-center justify-between p-4">
            <span>{s.user_id} · <b>{s.plan}</b> · {new Date(s.requested_at).toLocaleString()}</span>
            <input type="hidden" name="id" value={s.id} /><input type="hidden" name="uid" value={s.user_id} />
            <button className="btn btn-primary !py-2">Verify &amp; activate</button>
          </form>
        ))}
      </div>
    </div>
  );
}
