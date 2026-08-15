import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";
import { localizePath } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { lang, t } = useI18n();
  const year = String(new Date().getFullYear());
  const title = kind === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle;
  const body = (kind === "privacy" ? t.legal.privacyBody : t.legal.termsBody).map((p) =>
    p.replace("%YEAR%", year),
  );
  const path = kind === "privacy" ? "/privacy" : "/terms";

  return (
    <>
      <Seo
        title={`${title} | AS Awan`}
        description={body[0]}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t.nav.home, path: localizePath(lang, "/") },
            { name: title, path: localizePath(lang, path) },
          ]),
        ]}
      />
      <main className="pt-28 pb-24">
        <article className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8">{title}</h1>
          {body.map((p) => (
            <p key={p.slice(0, 40)} className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {p}
            </p>
          ))}
        </article>
      </main>
    </>
  );
}
