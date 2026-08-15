import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://asawan.com";
const langs = ["en", "ar", "ur", "fr"];
const slugs = [
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
];
const lastmod = new Date().toISOString().slice(0, 10);

function loc(lang, path) {
  if (lang === "en") return `${SITE}${path}`;
  return `${SITE}/${lang}${path === "/" ? "" : path}`;
}

const urls = [];
for (const lang of langs) {
  urls.push({ loc: loc(lang, "/"), priority: "1.0" });
  urls.push({ loc: loc(lang, "/privacy"), priority: "0.3" });
  urls.push({ loc: loc(lang, "/terms"), priority: "0.3" });
  for (const slug of slugs) {
    urls.push({ loc: loc(lang, `/services/${slug}`), priority: "0.8" });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((u) => {
    const path = u.loc.replace(SITE, "") || "/";
    const rest = path.replace(/^\/(ar|ur|fr)(?=\/|$)/, "") || "/";
    const xhtml = langs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc(l, rest === "" ? "/" : rest)}"/>`)
      .concat([`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc("en", rest === "" ? "/" : rest)}"/>`])
      .join("\n");
    return `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
${xhtml}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(out, xml);
console.log("Wrote", out, urls.length, "urls");
