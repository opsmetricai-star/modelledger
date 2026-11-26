import Link from "next/link";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/server";

const nav: [string, string][] = [
  ["Overview", "/dashboard"],
  ["Traces", "/dashboard/traces"],
  ["Evaluations", "/dashboard/evaluations"],
  ["Playground", "/dashboard/playground"],
  ["Monitors", "/dashboard/monitors"],
  ["Billing", "/dashboard/billing"],
  ["Settings", "/dashboard/settings"],
];

async function signOut() {
  "use server";
  await serverClient().auth.signOut();
  redirect("/");
}

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const { data: { user } } = await serverClient().auth.getUser();
  if (!user) redirect("/login");
  const items = isAdmin(user.email) ? [...nav, ["Admin", "/dashboard/admin"] as [string, string]] : nav;
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-[1400px] flex-col md:flex-row">
      <aside className="shrink-0 border-b border-white/10 p-4 md:w-60 md:border-b-0 md:border-r">
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {items.map(([l, h]) => <Link key={l} href={h} className="whitespace-nowrap rounded-md px-3 py-2.5 text-[15px] hover:bg-ink-700 hover:text-lime">{l}</Link>)}
        </nav>
        <form action={signOut} className="mt-3 md:mt-4"><button className="w-full rounded-md border border-white/15 px-3 py-2.5 text-left text-sm text-white/80 hover:border-lime hover:text-lime">Log out</button></form>
      </aside>
      <div className="min-w-0 flex-1 p-5 sm:p-8">{children}</div>
    </div>
  );
}
