import { useEffect } from "react";
import {
  SITE,
  LANG_META,
  LANGS,
  type Lang,
  hreflangUrls,
  localizePath,
  absoluteUrl,
} from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type Props = {
  title: string;
  description: string;
  path: string;
  jsonLd?: object[];
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const key = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(key) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function Seo({ title, description, path, jsonLd = [] }: Props) {
  const { lang } = useI18n();
  const meta = LANG_META[lang];
  const canonical = absoluteUrl(localizePath(lang, path));
  const alts = hreflangUrls(path);

  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: meta.og });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertLink("canonical", canonical);
    (Object.keys(alts) as (Lang | "x-default")[]).forEach((code) => {
      upsertLink("alternate", alts[code], { hreflang: code });
    });

    const id = "dynamic-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd);

    LANGS.filter((l) => l !== lang).forEach((l) => {
      upsertMeta(`meta[property="og:locale:alternate"][content="${LANG_META[l].og}"]`, {
        property: "og:locale:alternate",
        content: LANG_META[l].og,
      });
    });
  }, [title, description, canonical, lang, meta.og, jsonLd, alts, path]);

  return (
    <noscript>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>
        {SITE.legalName} · {SITE.email} · {SITE.offices.jeddah.address} · {SITE.offices.lahore.address}
      </p>
    </noscript>
  );
}
