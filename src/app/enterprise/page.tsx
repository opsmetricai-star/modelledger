import PageHero from "@/components/PageHero";

export default function Enterprise() {
  return (
    <main>
      <PageHero eyebrow="Enterprise" title="AI observability for regulated, large-scale teams" body="Dedicated deployment, SSO, audit logs and custom retention." />
      <section id="security" className="bg-ink-850 py-20">
        <div className="container-x"><h2 className="text-3xl font-semibold">Security &amp; compliance</h2>
          <p className="mt-4 max-w-3xl text-lg text-white/80">Row-level data isolation, encryption in transit and at rest, role-based access and a full audit trail of administrative actions.</p></div>
      </section>
      <section id="deploy" className="bg-ink-900 py-20">
        <div className="container-x"><h2 className="text-3xl font-semibold">Dedicated deployment</h2>
          <p className="mt-4 max-w-3xl text-lg text-white/80">Run in a single-tenant environment with your own retention, region and network rules.</p></div>
      </section>
    </main>
  );
}
