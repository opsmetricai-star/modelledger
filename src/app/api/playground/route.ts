import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage, gemini, costOf } from "@/lib/server";

const schema = z.object({ name: z.string().min(1).max(80).default("playground.run"), system: z.string().max(4000).optional(), prompt: z.string().min(1).max(12000) });

export async function POST(req: Request) {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const plan = await getPlan(sb, user.id);
  if ((await getUsage(sb, user.id)) >= LIMITS[plan]) return NextResponse.json({ error: `Monthly limit reached for the ${plan} plan. Upgrade in Billing.` }, { status: 429 });

  const { name, system, prompt } = parsed.data;
  try {
    const r = await gemini(prompt, system);
    await sb.from("traces").insert({ user_id: user.id, name, input: prompt, output: r.text, model: r.model, latency_ms: r.latency_ms, tokens: r.tokens, cost: costOf(r.tokens), status: "ok",
      spans: [{ name: "llm.generate", latency_ms: r.latency_ms, tokens: r.tokens }] });
    return NextResponse.json({ output: r.text, latency_ms: r.latency_ms, tokens: r.tokens });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Model call failed";
    await sb.from("traces").insert({ user_id: user.id, name, input: prompt, output: message, status: "error" });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
