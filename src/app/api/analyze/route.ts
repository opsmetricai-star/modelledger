import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage, gemini } from "@/lib/server";

const out = z.object({ summary: z.string(), likely_cause: z.string(), suggestions: z.array(z.string()).max(6) });

// AI-assisted trace analysis with structured, validated output.
export async function POST(req: Request) {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = z.object({ traceId: z.string().uuid() }).safeParse(await req.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const plan = await getPlan(sb, user.id);
  if (plan !== "pro") return NextResponse.json({ error: "AI trace analysis is included in the Pro plan." }, { status: 403 });
  if ((await getUsage(sb, user.id)) >= LIMITS[plan]) return NextResponse.json({ error: "Monthly limit reached" }, { status: 429 });

  const { data: t } = await sb.from("traces").select("*").eq("id", body.data.traceId).single();
  if (!t) return NextResponse.json({ error: "Trace not found" }, { status: 404 });
  try {
    const r = await gemini(
      `Analyze this AI application trace. Respond with ONLY JSON: {"summary":string,"likely_cause":string,"suggestions":string[]}.\n\n${JSON.stringify({ name: t.name, status: t.status, latency_ms: t.latency_ms, tokens: t.tokens, input: t.input, output: t.output, spans: t.spans })}`,
    );
    const json = JSON.parse(r.text.replace(/^```json|```$/gm, "").trim());
    const parsed = out.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Model returned an unexpected format. Try again." }, { status: 502 });
    return NextResponse.json(parsed.data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Analysis failed" }, { status: 502 });
  }
}
