import { Link, useParams } from "wouter";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { SERVICE_SLUGS, localizePath, type ServiceSlug } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";

function isSlug(s: string | undefined): s is ServiceSlug {
  return !!s && (SERVICE_SLUGS as readonly string[]).includes(s);
}

export default function ServicePage() {
  const params = useParams<{ slug?: string }>();
  const { lang, t } = useI18n();
  const slug = params.slug;

  if (!isSlug(slug)) {
    return (
      <main className="pt-32 pb-24 container mx-auto px-4 text-center">
        <h1 className="text-4xl font-black mb-4">{t.notFound.title}</h1>
        <Link href={localizePath(lang, "/")} className="text-primary font-bold">
          {t.notFound.home}
        </Link>
      </main>
    );
  }

  const s = t.practice[slug];

  return (
    <>
      <Seo
        title={s.seoTitle}
        description={s.seoDescription}
        path={`/services/${slug}`}
        jsonLd={[
          serviceJsonLd(s.title, s.seoDescription, lang),
          breadcrumbJsonLd([
            { name: t.nav.home, path: localizePath(lang, "/") },
            { name: t.nav.services, path: `${localizePath(lang, "/")}#services` },
            { name: s.title, path: localizePath(lang, `/services/${slug}`) },
          ]),
        ]}
      />
      <main className="pt-28 pb-24">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">{t.brand.legal}</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6">{s.title}</h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{s.intro}</p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{s.body}</p>
          <ul className="space-y-4 mb-12">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                <span className="text-lg">{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`${localizePath(lang, "/")}#contact`}>
              <Button className="bg-primary text-white font-bold h-12 px-8 rounded-none">{t.serviceCta}</Button>
            </Link>
            <Link href={`${localizePath(lang, "/")}#services`} className="text-primary font-semibold self-center">
              {t.backHome} →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
