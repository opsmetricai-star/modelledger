import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Talk to the team" body="Questions, demos or enterprise requirements: tell us what you need." cta={false} />
      <section className="bg-ink-850 py-16">
        <div className="container-x max-w-xl"><ContactForm /></div>
      </section>
    </main>
  );
}
