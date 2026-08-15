import type { ServiceSlug } from "@/lib/site";

export type NavKey =
  | "about"
  | "services"
  | "process"
  | "compensation"
  | "locations"
  | "faq"
  | "contact";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  brand: {
    kicker: string;
    name: string;
    legal: string;
  };
  nav: Record<NavKey, string> & { consult: string; home: string };
  hero: {
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    cta: string;
    cta2: string;
  };
  stats: { value: string; label: string }[];
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    founder: string;
    founderRole: string;
    badge: string;
  };
  services: {
    kicker: string;
    title: string;
    intro: string;
    more: string;
  };
  practice: Record<
    ServiceSlug,
    {
      title: string;
      short: string;
      seoTitle: string;
      seoDescription: string;
      intro: string;
      body: string;
      bullets: string[];
    }
  >;
  process: {
    kicker: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  why: { title: string; desc: string }[];
  compensation: {
    kicker: string;
    title: string;
    p1: string;
    points: string[];
  };
  locations: {
    kicker: string;
    title: string;
    jeddahTitle: string;
    jeddahDesc: string;
    lahoreTitle: string;
    lahoreDesc: string;
    banner: string;
    banner2: string;
  };
  people: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: { title: string; button: string };
  contact: {
    title: string;
    phones: string;
    email: string;
    name: string;
    emailPh: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    another: string;
    or: string;
    subjectDefault: string;
  };
  footer: {
    blurb: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  notFound: { title: string; body: string; home: string };
  legal: {
    privacyTitle: string;
    privacyBody: string[];
    termsTitle: string;
    termsBody: string[];
  };
  whatsapp: string;
  serviceCta: string;
  backHome: string;
};
