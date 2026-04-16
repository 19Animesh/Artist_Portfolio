import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata = {
  title: "Contact | Anshika Agarwal",
  description: "Get in touch with Anshika Agarwal for inquiries, commissions, or exhibitions.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 bg-gradient-to-b from-[#0c0a09] to-[#050403]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Text Section */}
          <div className="md:w-1/2">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-gold-100)] uppercase mb-6">
                Let&apos;s Talk
              </h1>
              <p className="text-[var(--color-gold-300)] font-light leading-relaxed mb-12">
                Whether you&apos;re interested in a piece, a commission, or simply want to talk about
                art — I&apos;d genuinely love to hear from you.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs tracking-widest text-[var(--color-gold-600)] uppercase mb-2">Email</h4>
                  <a href="mailto:anshika@artistportfolio.com" className="text-xl font-serif text-[var(--color-gold-200)] hover:text-[var(--color-gold-400)] transition-colors">
                    anshika@artistportfolio.com
                  </a>
                </div>
                <div>
                  <h4 className="text-xs tracking-widest text-[var(--color-gold-600)] uppercase mb-2">Based in</h4>
                  <p className="text-xl font-serif text-[var(--color-gold-200)]">India</p>
                </div>
                <div>
                  <h4 className="text-xs tracking-widest text-[var(--color-gold-600)] uppercase mb-2">Response time</h4>
                  <p className="text-sm text-[var(--color-gold-400)] font-light">Usually within 2–3 days</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Section */}
          <div className="md:w-1/2">
            <ScrollReveal delay={0.3}>
              <div className="bg-[var(--color-gold-950)]/20 p-8 md:p-10 border border-[var(--color-gold-900)]/50 backdrop-blur-sm">
                <h3 className="text-xl font-serif text-[var(--color-gold-200)] mb-8">Send a Message</h3>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
