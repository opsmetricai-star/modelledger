"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase-browser";

type Mode = "login" | "signup" | "forgot" | "reset";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const configured = supabaseConfigured();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setBusy(true); setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "");
    const password = String(f.get("password") || "");
    const sb = createClient();
    const origin = window.location.origin;
    let error: { message: string } | null = null;
    if (mode === "login") ({ error } = await sb.auth.signInWithPassword({ email, password }));
    if (mode === "signup") {
      const r = await sb.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/dashboard` } });
      error = r.error;
      if (!error && !r.data.session) { setMsg({ ok: true, text: "Check your email to confirm your account." }); setBusy(false); return; }
    }
    if (mode === "forgot") {
      ({ error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/reset-password` }));
      if (!error) { setMsg({ ok: true, text: "Password reset link sent. Check your inbox." }); setBusy(false); return; }
    }
    if (mode === "reset") {
      ({ error } = await sb.auth.updateUser({ password }));
      if (!error) { router.push("/dashboard"); return; }
    }
    if (error) { setMsg({ ok: false, text: error.message }); setBusy(false); return; }
    router.push("/dashboard"); router.refresh();
  }

  const title = { login: "Log in", signup: "Create your account", forgot: "Reset your password", reset: "Choose a new password" }[mode];
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-ink-900 px-5 py-16">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4 p-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {(sp.get("setup") || !configured) && (
          <p className="rounded-md border border-lime/40 bg-lime/10 p-3 text-sm text-lime-soft">
            Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart.
          </p>
        )}
        {mode !== "reset" && <input name="email" type="email" required placeholder="Email" className="input" />}
        {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className="input" />}
        {msg && <p className={`text-sm ${msg.ok ? "text-lime" : "text-red-400"}`}>{msg.text}</p>}
        <button disabled={busy || !configured} className="btn btn-primary w-full disabled:opacity-50">{busy ? "Please wait…" : title}</button>
        <div className="flex justify-between text-sm text-white/70">
          {mode === "login" && <><Link href="/signup" className="hover:text-lime">Create account</Link><Link href="/forgot-password" className="hover:text-lime">Forgot password?</Link></>}
          {mode === "signup" && <Link href="/login" className="hover:text-lime">Already have an account? Log in</Link>}
          {mode === "forgot" && <Link href="/login" className="hover:text-lime">Back to log in</Link>}
        </div>
      </form>
    </main>
  );
}
