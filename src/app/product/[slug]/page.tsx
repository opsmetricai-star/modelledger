import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ProductIcon } from "@/components/Icons";
import { products } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const others = products.filter((x) => x.slug !== p.slug);
  return (
    <main>
      <PageHero eyebrow={p.name} title={p.headline} body={p.body} />
      <section className="bg-ink-850 py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {p.points.map((pt, i) => (
            <div key={pt} className="card flex gap-5 p-7">
              <span className="font-hand text-5xl text-lime">0{i + 1}</span>
              <p className="pt-2 text-lg">{pt}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-ink-900 py-20">
        <div className="container-x">
          <h2 className="mb-10 text-center text-3xl font-semibold">Runs on the same system of record</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/product/${o.slug}`} className="card flex items-center gap-4 p-6 hover:border-lime/60">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-700"><ProductIcon kind={o.icon} /></span>
                <span><span className="block font-semibold">{o.name}</span><span className="text-sm text-white/70">{o.blurb}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
