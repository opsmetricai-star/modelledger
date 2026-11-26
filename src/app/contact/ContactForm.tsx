"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) });
    if (res.ok) setState("done");
    else { setErr((await res.json()).error || "Something went wrong"); setState("error"); }
  }
  if (state === "done") return <p className="card p-6 text-center text-lg">Thanks. We will reply by email shortly.</p>;
  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-8">
      <input name="name" required placeholder="Your name" className="input" />
      <input name="email" type="email" required placeholder="Work email" className="input" />
      <textarea name="message" required rows={5} placeholder="How can we help?" className="input" />
      {state === "error" && <p className="text-sm text-red-400">{err}</p>}
      <button disabled={state === "sending"} className="btn btn-primary w-full">{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
