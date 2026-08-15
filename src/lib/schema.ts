import { SITE } from "./site";
import type { Lang } from "./site";

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "Attorney"],
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        alternateName: [SITE.brand, "AS Awan Solicitors", "Abdul Salam Awan"],
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phones.map((p) => p.e164),
        image: `${SITE.url}/opengraph.jpg`,
        logo: `${SITE.url}/favicon.svg`,
        founder: { "@type": "Person", name: SITE.person, jobTitle: "Principal Solicitor" },
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: SITE.offices.jeddah.street,
            addressLocality: SITE.offices.jeddah.city,
            addressRegion: SITE.offices.jeddah.region,
            addressCountry: "SA",
          },
          {
            "@type": "PostalAddress",
            streetAddress: SITE.offices.lahore.street,
            addressLocality: SITE.offices.lahore.city,
            addressRegion: SITE.offices.lahore.region,
            addressCountry: "PK",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Pakistan" },
          { "@type": "AdministrativeArea", name: "Gulf Cooperation Council" },
        ],
        knowsLanguage: ["en", "ar", "ur", "fr"],
        priceRange: "$$",
        sameAs: [`https://wa.me/923334343438`],
      },
      {
        "@type": "LegalService",
        "@id": `${SITE.url}/#jeddah`,
        name: `${SITE.legalName} — Jeddah`,
        telephone: "+966593353839",
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Palestine Road",
          addressLocality: "Jeddah",
          addressRegion: "Makkah Province",
          addressCountry: "SA",
        },
        geo: { "@type": "GeoCoordinates", latitude: 21.54333, longitude: 39.17278 },
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "LegalService",
        "@id": `${SITE.url}/#lahore`,
        name: `${SITE.legalName} — Lahore High Court`,
        telephone: "+923334343438",
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Turner Road, Lahore High Court",
          addressLocality: "Lahore",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        geo: { "@type": "GeoCoordinates", latitude: 31.5704, longitude: 74.3095 },
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd(name: string, description: string, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    inLanguage: lang,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: ["SA", "PK", "AE", "QA", "KW", "BH", "OM"],
  };
}
