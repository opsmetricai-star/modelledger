import { createClient as createAdmin } from "@supabase/supabase-js";
import { serverClient } from "./supabase-server";

export const LIMITS: Record<string, number> = { free: 1000, starter: 10000, team: 100000, pro: 1000000 };

export function adminClient() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
}

export const isAdmin = (email?: string | null) =>
  !!email && (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());

/** Active plan = latest subscription with status 'active', else free. Redirect alone never activates a plan. */
export async function getPlan(sb: ReturnType<typeof serverClient>, userId: string) {
  const { data } = await sb.from("subscriptions").select("plan").eq("user_id", userId).eq("status", "active").order("verified_at", { ascending: false }).limit(1);
  return data?.[0]?.plan ?? "free";
}

export async function getUsage(sb: ReturnType<typeof serverClient>, userId: string) {
  const since = new Date(); since.setDate(1); since.setHours(0, 0, 0, 0);
  const { count } = await sb.from("traces").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", since.toISOString());
  return count ?? 0;
}

/** Calls Gemini and returns text plus rough token usage. Throws if no key is configured. */
export async function gemini(prompt: string, system?: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured on the server.");
  const model = "gemini-2.0-flash";
  const started = Date.now();
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) throw new Error(`Gemini error ${res.status}`);
  const j = await res.json();
  const text: string = j.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ?? "";
  const tokens: number = j.usageMetadata?.totalTokenCount ?? Math.ceil((prompt.length + text.length) / 4);
  return { text, tokens, model, latency_ms: Date.now() - started };
}

export const costOf = (tokens: number) => Number((tokens * 0.0000004).toFixed(6));
