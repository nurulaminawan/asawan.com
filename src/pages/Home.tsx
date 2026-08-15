import React, { useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Scale,
  Gavel,
  Users,
  FileText,
  Shield,
  Building2,
  HeartPulse,
  Briefcase,
  Plane,
  PenLine,
  Landmark,
  Handshake,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Languages,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";
import { SITE, SERVICE_SLUGS, localizePath, type ServiceSlug } from "@/lib/site";
import { orgJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const ICONS: Record<ServiceSlug, React.ReactNode> = {
  consultancy: <Handshake className="w-8 h-8" />,
  civil: <Scale className="w-8 h-8" />,
  criminal: <Gavel className="w-8 h-8" />,
  family: <Users className="w-8 h-8" />,
  contracts: <FileText className="w-8 h-8" />,
  insurance: <Shield className="w-8 h-8" />,
  company: <Building2 className="w-8 h-8" />,
  compensation: <HeartPulse className="w-8 h-8" />,
  labour: <Briefcase className="w-8 h-8" />,
  immigration: <Plane className="w-8 h-8" />,
  opinions: <PenLine className="w-8 h-8" />,
  conveyancing: <Landmark className="w-8 h-8" />,
};

export default function Home() {
  const { lang, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || t.contact.subjectDefault);
    const message = String(data.get("message") || "");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
    setFormState("success");
    formRef.current?.reset();
  };

  return (
    <>
      <Seo
        title={t.meta.title}
        description={t.meta.description}
        path="/"
        jsonLd={[orgJsonLd(), faqJsonLd(t.faq), breadcrumbJsonLd([{ name: t.nav.home, path: localizePath(lang, "/") }])]}
      />
      <main id="main-content">
        <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b1220]/50 via-[#0b1220]/78 to-[#0b1220]" />
            <img
              src="/hero-bg.png"
              alt="Law library and scales of justice — Abdul Salam Awan Solicitors, AS Awan"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M 100 800 Q 300 700 400 400 T 800 200"
                fill="none"
                stroke="#c6a15b"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 1 }}
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center lg:text-start">
            <div className="w-full lg:w-5/6 max-w-5xl">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6 lang-hero"
              >
                <motion.span variants={fadeUp} className="block text-primary">
                  {t.hero.line1}
                </motion.span>
                <motion.span variants={fadeUp} className="block">
                  {t.hero.line2}
                </motion.span>
                <motion.span variants={fadeUp} className="block text-primary">
                  {t.hero.line3}
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-8 text-lg w-full sm:w-auto rounded-none"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t.hero.cta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg w-full sm:w-auto rounded-none"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t.hero.cta2}
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 border-t border-primary/20 bg-[#0b1220]/95 backdrop-blur z-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rtl:divide-x-reverse">
                {t.stats.map((stat, i) => (
                  <div key={i} className="p-4 md:p-6 text-center">
                    <div className="text-2xl md:text-4xl font-black text-primary mb-1">{stat.value}</div>
                    <div className="text-[10px] md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary" />
                  {t.about.kicker}
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">
                  {t.about.title}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {t.about.p1}
                </motion.p>
                <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t.about.p2}
                </motion.p>
                <motion.div variants={fadeUp} className="flex items-center gap-4 border-s-4 border-primary ps-6 py-2">
                  <div>
                    <p className="font-bold text-lg">{t.about.founder}</p>
                    <p className="text-sm text-muted-foreground">{t.about.founderRole}</p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                  <img src="/about-office.png" alt="AS Awan solicitor office" className="object-cover w-full h-full" loading="lazy" />
                </div>
                <div className="absolute -bottom-8 -start-4 sm:-start-8 bg-primary p-6 sm:p-8 rounded-xl shadow-2xl max-w-[80%]">
                  <Scale className="w-10 h-10 text-primary-foreground mb-3" />
                  <p className="text-primary-foreground font-bold text-lg">{t.about.badge}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
                <span className="w-8 h-1 bg-primary" />
                {t.services.kicker}
                <span className="w-8 h-1 bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">{t.services.title}</h2>
              <p className="text-muted-foreground text-lg">{t.services.intro}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_SLUGS.map((slug, i) => {
                const s = t.practice[slug];
                return (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.08 }}
                  >
                    <Link href={localizePath(lang, `/services/${slug}`)}>
                      <Card className="bg-card border-border hover:border-primary transition-colors h-full group">
                        <CardContent className="p-8">
                          <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {ICONS[slug]}
                          </div>
                          <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                          <p className="text-muted-foreground mb-4">{s.short}</p>
                          <span className="text-primary text-sm font-semibold">{t.services.more} →</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">{t.process.kicker}</div>
              <h2 className="text-4xl md:text-5xl font-black">{t.process.title}</h2>
            </div>
            <div className="relative">
              <div className="absolute top-8 inset-x-0 h-1 bg-border hidden lg:block" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                {t.process.steps.map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-background border-4 border-border flex items-center justify-center text-xl font-black mb-6">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.why.map((feature, i) => {
                const WhyIcon = [Globe, HeartPulse, Languages, Clock][i];
                return (
                  <div key={i} className="flex flex-col items-center text-center p-6">
                    <div className="text-primary mb-4 p-4 bg-primary/10 rounded-full">
                      <WhyIcon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="compensation" className="relative">
          <div className="relative h-56 md:h-72 overflow-hidden">
            <img src="/gulf-highway.png" alt="Gulf highway — road accident and workplace injury compensation" className="w-full h-full object-cover opacity-40" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/25" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <p className="text-3xl md:text-5xl font-black tracking-tight">
                  <span className="text-primary">{t.locations.banner}</span>{" "}
                  <span>{t.locations.banner2}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="py-24">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <img src="/scales.png" alt="Scales of justice — Gulf compensation claims" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">{t.compensation.kicker}</div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">{t.compensation.title}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t.compensation.p1}</p>
                <div className="space-y-4">
                  {t.compensation.points.map((p) => (
                    <div key={p} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                      <p className="text-lg font-medium">{p}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={localizePath(lang, "/services/compensation")}
                  className="inline-flex mt-10 bg-primary text-primary-foreground font-bold h-14 px-8 items-center hover:bg-primary/90"
                >
                  {t.services.more} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="locations" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16">
              <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">{t.locations.kicker}</div>
              <h2 className="text-4xl md:text-5xl font-black">{t.locations.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { office: SITE.offices.jeddah, img: "/jeddah.png", title: t.locations.jeddahTitle, desc: t.locations.jeddahDesc },
                { office: SITE.offices.lahore, img: "/lahore-court.png", title: t.locations.lahoreTitle, desc: t.locations.lahoreDesc },
              ].map((loc) => (
                <div key={loc.office.id} className="bg-background border border-border rounded-xl overflow-hidden group">
                  <div className="h-48 w-full relative">
                    <img src={loc.img} alt={loc.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="h-48 w-full">
                    <iframe
                      src={loc.office.mapSrc}
                      className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all"
                      title={loc.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
                      <MapPin className="text-primary w-6 h-6" />
                      {loc.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">{loc.desc}</p>
                    <p className="text-sm">{loc.office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">{t.people.kicker}</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">{t.people.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">{t.people.p1}</p>
              <p className="text-muted-foreground text-lg">{t.people.p2}</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border">
              <img src="/consultation.png" alt="Legal consultation at AS Awan" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">{t.faqTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-start text-lg font-bold hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-6xl font-black mb-8 max-w-4xl mx-auto tracking-tight">{t.cta.title}</h2>
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 font-bold h-16 px-10 text-xl rounded-none border border-background"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.cta.button}
            </Button>
          </div>
        </section>

        <section id="contact" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8">{t.contact.title}</h2>
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t.contact.phones}</h4>
                      {SITE.phones.map((p) => (
                        <p key={p.id} className="text-muted-foreground mb-1">
                          {p.label}:{" "}
                          <a href={`tel:${p.e164}`} className="hover:text-primary" dir="ltr">
                            {p.display}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t.contact.email}</h4>
                      <a href={`mailto:${SITE.email}`} className="text-muted-foreground hover:text-primary">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>

                {formState === "success" ? (
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-black mb-2">{t.contact.sentTitle}</h3>
                    <p className="text-muted-foreground mb-4">{t.contact.sentBody}</p>
                    <button onClick={() => setFormState("idle")} className="text-sm text-primary hover:underline">
                      {t.contact.another}
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                    <Input name="name" placeholder={t.contact.name} required className="bg-background h-12" autoComplete="name" />
                    <Input name="email" type="email" placeholder={t.contact.emailPh} required className="bg-background h-12" autoComplete="email" />
                    <Input name="subject" placeholder={t.contact.subject} className="bg-background h-12" />
                    <Textarea name="message" placeholder={t.contact.message} required className="bg-background min-h-[140px]" />
                    <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-none">
                      {t.contact.send}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {t.contact.or}{" "}
                      <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                        {SITE.email}
                      </a>
                    </p>
                  </form>
                )}
              </div>
              <div className="min-h-[400px] rounded-xl overflow-hidden border border-border">
                <iframe
                  src={SITE.offices.jeddah.mapSrc}
                  className="w-full h-full min-h-[400px] border-0"
                  title={t.locations.jeddahTitle}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
