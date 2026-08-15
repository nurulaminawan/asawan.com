export const SITE = {
  brand: "AS Awan",
  legalName: "Abdul Salam Awan Solicitors",
  person: "Abdul Salam Awan",
  url: "https://asawan.com",
  email: "abdulsalamawan@gmail.com",
  themeColor: "#ff6310",
  foundingYear: 1998,
  phones: [
    {
      id: "pk",
      e164: "+923334343438",
      display: "+92 333 4343438",
      label: "Pakistan",
      country: "PK",
    },
    {
      id: "sa",
      e164: "+966593353839",
      display: "+966 59 335 3839",
      label: "Saudi Arabia",
      country: "SA",
    },
  ],
  offices: {
    jeddah: {
      id: "jeddah",
      city: "Jeddah",
      country: "Saudi Arabia",
      countryCode: "SA",
      region: "Makkah Province",
      street: "Palestine Road",
      address: "Palestine Road, Jeddah, Kingdom of Saudi Arabia",
      lat: 21.54333,
      lng: 39.17278,
      mapSrc:
        "https://www.openstreetmap.org/export/embed.html?bbox=39.12%2C21.51%2C39.23%2C21.58&layer=mapnik&marker=21.54333%2C39.17278",
      phone: "+966593353839",
    },
    lahore: {
      id: "lahore",
      city: "Lahore",
      country: "Pakistan",
      countryCode: "PK",
      region: "Punjab",
      street: "Turner Road, Lahore High Court",
      address: "Turner Road, Lahore High Court, Lahore, Pakistan",
      lat: 31.5704,
      lng: 74.3095,
      mapSrc:
        "https://www.openstreetmap.org/export/embed.html?bbox=74.29%2C31.56%2C74.33%2C31.585&layer=mapnik&marker=31.5704%2C74.3095",
      phone: "+923334343438",
    },
  },
} as const;

export const LANGS = ["en", "ar", "ur", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<
  Lang,
  { label: string; native: string; locale: string; dir: "ltr" | "rtl"; og: string }
> = {
  en: { label: "English", native: "English", locale: "en", dir: "ltr", og: "en_GB" },
  ar: { label: "Arabic", native: "العربية", locale: "ar", dir: "rtl", og: "ar_SA" },
  ur: { label: "Urdu", native: "اردو", locale: "ur", dir: "rtl", og: "ur_PK" },
  fr: { label: "French", native: "Français", locale: "fr", dir: "ltr", og: "fr_FR" },
};

export const SERVICE_SLUGS = [
  "consultancy",
  "civil",
  "criminal",
  "family",
  "contracts",
  "insurance",
  "company",
  "compensation",
  "labour",
  "immigration",
  "opinions",
  "conveyancing",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

export function parsePath(pathname: string): { lang: Lang; rest: string } {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] && isLang(parts[0]) && parts[0] !== "en") {
    const rest = "/" + parts.slice(1).join("/");
    return { lang: parts[0], rest: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/" };
  }
  return { lang: "en", rest: clean === "" ? "/" : clean };
}

export function localizePath(lang: Lang, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const trimmed = normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
  if (lang === "en") return trimmed;
  return trimmed === "/" ? `/${lang}` : `/${lang}${trimmed}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function hreflangUrls(pathWithoutLang: string): Record<Lang | "x-default", string> {
  return {
    en: absoluteUrl(localizePath("en", pathWithoutLang)),
    ar: absoluteUrl(localizePath("ar", pathWithoutLang)),
    ur: absoluteUrl(localizePath("ur", pathWithoutLang)),
    fr: absoluteUrl(localizePath("fr", pathWithoutLang)),
    "x-default": absoluteUrl(localizePath("en", pathWithoutLang)),
  };
}
