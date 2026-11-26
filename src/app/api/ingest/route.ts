import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage } from "@/lib/server";

// Authenticated ingest endpoint for SDK-style trace submission (uses the user's session).
const schema = z.object({
  name: z.string().min(1).max(120), input: z.string().max(20000).optional(), output: z.string().max(20000).optional(),
  model: z.string().max(80).optional(), latency_ms: z.number().int().min(0).default(0), tokens: z.number().int().min(0).default(0),
  cost: z.number().min(0).default(0), status: z.enum(["ok", "error"]).default("ok"),
  spans: z.array(z.object({ name: z.string(), latency_ms: z.number().optional(), tokens: z.number().optional() })).max(200).default([]),
});

export async function POST(req: Request) {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid trace payload", issues: parsed.error.flatten() }, { status: 400 });
  const plan = await getPlan(sb, user.id);
  if ((await getUsage(sb, user.id)) >= LIMITS[plan]) return NextResponse.json({ error: "Monthly limit reached" }, { status: 429 });
  const { error } = await sb.from("traces").insert({ ...parsed.data, user_id: user.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
