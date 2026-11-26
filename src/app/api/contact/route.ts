import { NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/server";

const schema = z.object({ name: z.string().min(1).max(120), email: z.string().email(), message: z.string().min(5).max(4000) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete all fields with a valid email." }, { status: 400 });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Contact storage is not configured yet." }, { status: 503 });
  const { error } = await adminClient().from("contact_messages").insert(parsed.data);
  if (error) return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
