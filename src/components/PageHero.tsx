import Link from "next/link";

export default function PageHero({ eyebrow, title, body, cta = true }: { eyebrow?: string; title: string; body?: string; cta?: boolean }) {
  return (
    <section className="bg-ink-900 py-20 text-center sm:py-28">
      <div className="container-x">
        {eyebrow && <p className="mb-4 font-hand text-3xl text-lime">{eyebrow}</p>}
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
        {body && <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80">{body}</p>}
        {cta && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn btn-primary">Sign up</Link>
            <Link href="/login" className="btn btn-ghost">Log in</Link>
          </div>
        )}
      </div>
    </section>
  );
}
