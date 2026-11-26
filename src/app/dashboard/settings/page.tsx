import { revalidatePath } from "next/cache";
import { randomBytes, createHash } from "node:crypto";
import { serverClient } from "@/lib/supabase-server";
import { adminClient } from "@/lib/server";
import NewKey from "./NewKey";

async function rename(fd: FormData) {
  "use server";
  const name = String(fd.get("name") || "").trim().slice(0, 80);
  await serverClient().auth.updateUser({ data: { full_name: name } });
  revalidatePath("/dashboard/settings");
}

async function createKey(_: unknown, fd: FormData): Promise<{ key?: string; error?: string }> {
  "use server";
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { error: "Session expired. Log in again." };
  const name = String(fd.get("name") || "").trim().slice(0, 60) || "Default key";
  const key = `ml_live_${randomBytes(24).toString("hex")}`;
  const { error } = await adminClient().from("api_keys").insert({
    user_id: user.id, name, prefix: key.slice(0, 12), key_hash: createHash("sha256").update(key).digest("hex"),
  });
  if (error) return { error: "The key could not be created. Try again." };
  revalidatePath("/dashboard/settings");
  return { key };
}

async function revokeKey(fd: FormData) {
  "use server";
  await serverClient().from("api_keys").delete().eq("id", String(fd.get("id")));
  revalidatePath("/dashboard/settings");
}

export default async function Settings() {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: keys } = await sb.from("api_keys").select("id,name,prefix,created_at,last_used_at").order("created_at", { ascending: false });
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <div className="card mt-6 space-y-3 p-5">
        <div className="text-sm text-white/60">Email</div>
        <div>{user?.email}</div>
        <form action={rename} className="space-y-3">
          <div className="text-sm text-white/60">Display name</div>
          <input name="name" defaultValue={user?.user_metadata?.full_name ?? ""} className="input" />
          <button className="btn btn-primary">Save</button>
        </form>
        <p className="text-sm text-white/60">To change your password, use Forgot password on the login page.</p>
      </div>

      <div className="card mt-6 p-5">
        <h2 className="text-xl font-semibold">API keys</h2>
        <p className="mt-1 text-sm text-white/70">Authenticate trace ingestion from your systems. A key is displayed once, at creation.</p>
        <NewKey action={createKey} />
        <div className="mt-4 divide-y divide-white/10">
          {(keys ?? []).length === 0 && <p className="py-2 text-sm text-white/50">No keys yet.</p>}
          {(keys ?? []).map((k) => (
            <form key={k.id} action={revokeKey} className="flex items-center justify-between py-3 text-sm">
              <span><b>{k.name}</b> <span className="font-mono text-white/60">{k.prefix}...</span>
                <span className="block text-xs text-white/50">Created {new Date(k.created_at).toLocaleDateString()}{k.last_used_at ? `, last used ${new Date(k.last_used_at).toLocaleDateString()}` : ", never used"}</span></span>
              <input type="hidden" name="id" value={k.id} />
              <button className="text-white/60 hover:text-red-400">Revoke</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
