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
            streetAddress: SITE.offices.lahore.street,
            addressLocality: SITE.offices.lahore.city,
            addressRegion: SITE.offices.lahore.region,
            addressCountry: "PK",
          },
          {
            "@type": "PostalAddress",
            streetAddress: SITE.offices.jeddah.street,
            addressLocality: SITE.offices.jeddah.city,
            addressRegion: SITE.offices.jeddah.region,
            addressCountry: "SA",
          },
          {
            "@type": "PostalAddress",
            streetAddress: SITE.offices.dubai.street,
            addressLocality: SITE.offices.dubai.city,
            addressRegion: SITE.offices.dubai.region,
            addressCountry: "AE",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Pakistan" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "City", name: "Lahore" },
          { "@type": "City", name: "Jeddah" },
          { "@type": "City", name: "Riyadh" },
          { "@type": "City", name: "Dubai" },
          { "@type": "AdministrativeArea", name: "Gulf Cooperation Council" },
        ],
        knowsLanguage: [
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Urdu", alternateName: "ur" },
          { "@type": "Language", name: "Arabic", alternateName: "ar" },
          { "@type": "Language", name: "French", alternateName: "fr" },
        ],
        priceRange: "$$",
        sameAs: [`https://wa.me/${SITE.whatsapp.e164.replace("+", "")}`],
        description:
          "Pakistani and Gulf solicitors (AS Awan / Abdul Salam Awan Solicitors). Urdu-, Arabic-, English- and French-speaking lawyers with offices in Lahore, Jeddah and Dubai; also serving Riyadh and wider KSA. Named principal with published telephone and WhatsApp contact.",
      },
      {
        "@type": "LegalService",
        "@id": `${SITE.url}/#lahore`,
        name: `${SITE.legalName} — Lahore High Court`,
        telephone: SITE.offices.lahore.phone,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.offices.lahore.street,
          addressLocality: SITE.offices.lahore.city,
          addressRegion: SITE.offices.lahore.region,
          addressCountry: "PK",
        },
        geo: { "@type": "GeoCoordinates", latitude: SITE.offices.lahore.lat, longitude: SITE.offices.lahore.lng },
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "LegalService",
        "@id": `${SITE.url}/#jeddah`,
        name: `${SITE.legalName} — Jeddah`,
        telephone: SITE.offices.jeddah.phone,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.offices.jeddah.street,
          addressLocality: SITE.offices.jeddah.city,
          addressRegion: SITE.offices.jeddah.region,
          addressCountry: "SA",
        },
        geo: { "@type": "GeoCoordinates", latitude: SITE.offices.jeddah.lat, longitude: SITE.offices.jeddah.lng },
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "LegalService",
        "@id": `${SITE.url}/#dubai`,
        name: `${SITE.legalName} — Dubai`,
        telephone: SITE.offices.dubai.phone,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.offices.dubai.street,
          addressLocality: SITE.offices.dubai.city,
          addressRegion: SITE.offices.dubai.region,
          addressCountry: "AE",
        },
        geo: { "@type": "GeoCoordinates", latitude: SITE.offices.dubai.lat, longitude: SITE.offices.dubai.lng },
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
