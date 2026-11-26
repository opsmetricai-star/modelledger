"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

type Mode = "login" | "signup" | "forgot" | "reset";

/** Confirmation and reset links must open the live site. Prefer the configured production URL, never localhost. */
function siteOrigin() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && !/localhost|127\.0\.0\.1/.test(env)) return env.replace(/\/$/, "");
  return window.location.origin;
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const sp = useSearchParams();
  const plan = sp.get("plan");
  const dest = plan ? `/dashboard/billing?plan=${encodeURIComponent(plan)}` : "/dashboard";
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(
    sp.get("error") === "link" ? { ok: false, text: "That link has expired or was already used. Request a new one." } : null
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    const password = String(f.get("password") || "");
    const sb = createClient();
    const origin = siteOrigin();
    const callback = (next: string) => `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
    let error: { message: string } | null = null;

    try {
      if (mode === "login") ({ error } = await sb.auth.signInWithPassword({ email, password }));
      if (mode === "signup") {
        const r = await sb.auth.signUp({ email, password, options: { emailRedirectTo: callback(dest) } });
        error = r.error;
        if (!error && !r.data.session) {
          setMsg({ ok: true, text: "Account created. Confirm your email address using the link we sent to continue." });
          setBusy(false);
          return;
        }
      }
      if (mode === "forgot") {
        ({ error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: callback("/reset-password") }));
        if (!error) {
          setMsg({ ok: true, text: "If an account exists for that address, a reset link is on its way." });
          setBusy(false);
          return;
        }
      }
      if (mode === "reset") {
        ({ error } = await sb.auth.updateUser({ password }));
        if (!error) {
          router.push("/dashboard");
          return;
        }
      }
    } catch {
      error = { message: "The service is unreachable. Check your connection and try again." };
    }

    if (error) {
      setMsg({ ok: false, text: error.message });
      setBusy(false);
      return;
    }
    router.push(dest);
    router.refresh();
  }

  const title = { login: "Log in", signup: "Create account", forgot: "Reset password", reset: "Set a new password" }[mode];
  const sub = {
    login: "Access your ModelLedger workspace.",
    signup: "Start with 1,000 traced calls per month at no charge.",
    forgot: "Enter your work email and we will send a reset link.",
    reset: "Choose a password of at least 8 characters.",
  }[mode];
  const q = plan ? `?plan=${encodeURIComponent(plan)}` : "";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-ink-900 px-5 py-16">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4 p-8">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-white/70">{sub}</p>
        </div>
        {mode !== "reset" && <input name="email" type="email" required autoComplete="email" placeholder="Work email" className="input" />}
        {mode !== "forgot" && <input name="password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Password (8+ characters)" className="input" />}
        {msg && <p role="status" className={`text-sm ${msg.ok ? "text-lime" : "text-red-400"}`}>{msg.text}</p>}
        <button disabled={busy} className="btn btn-primary w-full disabled:opacity-50">{busy ? "Please wait" : title}</button>
        <div className="flex flex-wrap justify-between gap-2 text-sm text-white/70">
          {mode === "login" && (
            <>
              <Link href={`/signup${q}`} className="hover:text-lime">Create account</Link>
              <Link href="/forgot-password" className="hover:text-lime">Forgot password?</Link>
            </>
          )}
          {mode === "signup" && <Link href={`/login${q}`} className="hover:text-lime">Already registered? Log in</Link>}
          {mode === "forgot" && <Link href="/login" className="hover:text-lime">Back to log in</Link>}
        </div>
      </form>
    </main>
  );
}
