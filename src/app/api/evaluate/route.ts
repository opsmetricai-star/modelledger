import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { LIMITS, getPlan, getUsage, gemini, costOf } from "@/lib/server";

const schema = z.object({
  name: z.string().min(1).max(80),
  prompt_template: z.string().min(1).max(4000), // use {{input}} placeholder
  scorer: z.enum(["contains", "exact"]),
  rows: z.array(z.object({ input: z.string().min(1).max(2000), expected: z.string().min(1).max(1000) })).min(1).max(20),
});

// Deterministic scoring over real model outputs.
const norm = (s: string) => s.trim().toLowerCase();
const score = (kind: "contains" | "exact", out: string, exp: string) => (kind === "exact" ? norm(out) === norm(exp) : norm(out).includes(norm(exp)));

export async function POST(req: Request) {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid evaluation. Provide 1-20 rows with input and expected." }, { status: 400 });
  const { name, prompt_template, scorer, rows } = parsed.data;

  const plan = await getPlan(sb, user.id);
  if (plan === "free" || plan === "starter") return NextResponse.json({ error: "Evaluations are included in the Team plan and above." }, { status: 403 });
  if ((await getUsage(sb, user.id)) + rows.length > LIMITS[plan]) return NextResponse.json({ error: "This run would exceed your monthly limit." }, { status: 429 });

  const results: { input: string; expected: string; output: string; pass: boolean }[] = [];
  try {
    for (const row of rows) {
      const prompt = prompt_template.replaceAll("{{input}}", row.input);
      const r = await gemini(prompt);
      await sb.from("traces").insert({ user_id: user.id, name: `eval:${name}`, input: prompt, output: r.text, model: r.model, latency_ms: r.latency_ms, tokens: r.tokens, cost: costOf(r.tokens) });
      results.push({ ...row, output: r.text, pass: score(scorer, r.text, row.expected) });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Evaluation failed" }, { status: 502 });
  }
  const pct = Number(((results.filter((x) => x.pass).length / results.length) * 100).toFixed(2));
  const { data, error } = await sb.from("evaluations").insert({ user_id: user.id, name, prompt_template, scorer, rows, results, score: pct }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
