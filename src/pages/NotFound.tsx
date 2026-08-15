import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";
import { localizePath } from "@/lib/site";

export default function NotFound() {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo title={`${t.notFound.title} | AS Awan`} description={t.notFound.body} path="/404" />
      <main className="min-h-[70vh] flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-lg">
          <p className="text-primary font-black text-6xl mb-4">404</p>
          <h1 className="text-3xl font-black mb-4">{t.notFound.title}</h1>
          <p className="text-muted-foreground mb-8">{t.notFound.body}</p>
          <Link href={localizePath(lang, "/")} className="text-primary font-bold">
            {t.notFound.home} →
          </Link>
        </div>
      </main>
    </>
  );
}
