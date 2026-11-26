import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, adminClient, getPlan, getUsage } from "@/lib/server";

const schema = z.object({
  name: z.string().min(1).max(120),
  input: z.string().max(20000).optional(),
  output: z.string().max(20000).optional(),
  model: z.string().max(80).optional(),
  latency_ms: z.number().int().min(0).default(0),
  tokens: z.number().int().min(0).default(0),
  cost: z.number().min(0).default(0),
  status: z.enum(["ok", "error"]).default("ok"),
  spans: z.array(z.object({ name: z.string(), latency_ms: z.number().optional(), tokens: z.number().optional() })).max(200).default([]),
});

export async function POST(req: Request) {
  // Authenticate with an API key (Bearer) or, for in-app use, the signed-in session.
  const auth = req.headers.get("authorization") ?? "";
  const key = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  let userId: string | null = null;
  let db: ReturnType<typeof adminClient> | ReturnType<typeof serverClient>;

  if (key) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Ingestion is temporarily unavailable." }, { status: 503 });
    const admin = adminClient();
    const hash = createHash("sha256").update(key).digest("hex");
    const { data } = await admin.from("api_keys").select("id,user_id").eq("key_hash", hash).maybeSingle();
    if (!data) return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    userId = data.user_id;
    db = admin;
    await admin.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", data.id);
  } else {
    const sb = serverClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    userId = user.id;
    db = sb;
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid trace payload", issues: parsed.error.flatten() }, { status: 400 });

  const plan = await getPlan(db, userId!);
  if ((await getUsage(db, userId!)) >= LIMITS[plan]) return NextResponse.json({ error: "Monthly limit reached" }, { status: 429 });

  const { error } = await db.from("traces").insert({ ...parsed.data, user_id: userId });
  if (error) return NextResponse.json({ error: "Could not store the trace." }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
