import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase-server";

async function rename(fd: FormData) {
  "use server";
  const name = String(fd.get("name") || "").trim().slice(0, 80);
  await serverClient().auth.updateUser({ data: { full_name: name } });
  revalidatePath("/dashboard/settings");
}

export default async function Settings() {
  const { data: { user } } = await serverClient().auth.getUser();
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <div className="card mt-6 space-y-3 p-5">
        <div className="text-sm text-white/60">Email</div><div>{user?.email}</div>
        <form action={rename} className="space-y-3">
          <div className="text-sm text-white/60">Display name</div>
          <input name="name" defaultValue={user?.user_metadata?.full_name ?? ""} className="input" />
          <button className="btn btn-primary">Save</button>
        </form>
        <p className="text-sm text-white/60">To change your password, use “Forgot password” on the login page.</p>
      </div>
    </div>
  );
}
