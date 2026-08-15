import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { LANGS, LANG_META, SITE, localizePath, type Lang } from "@/lib/site";
import type { NavKey } from "@/i18n/types";

const NAV: NavKey[] = [
  "about",
  "services",
  "process",
  "compensation",
  "locations",
  "faq",
  "contact",
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang, t, rest } = useI18n();
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHomeSection = (id: string) => {
    setOpen(false);
    const home = localizePath(lang, "/");
    if (rest !== "/") {
      setLocation(home);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLang = (next: Lang) => {
    setOpen(false);
    setLocation(localizePath(next, rest));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <header>
        <nav
          aria-label="Main"
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
            scrolled
              ? "bg-[#0b1220]/92 backdrop-blur-md border-primary/20 shadow-sm py-3"
              : "bg-transparent border-transparent py-5"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
            <Link
              href={localizePath(lang, "/")}
              className="flex flex-col leading-none"
              aria-label={`${SITE.brand} — ${SITE.legalName}`}
            >
              <span className="text-2xl font-black tracking-tighter font-display">
                AS<span className="text-primary"> Awan</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1 hidden sm:block">
                {t.brand.kicker}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {NAV.map((item) => (
                <button
                  key={item}
                  onClick={() => goHomeSection(item)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {t.nav[item]}
                </button>
              ))}
              <LanguageSwitch lang={lang} onChange={switchLang} />
              <Button
                onClick={() => goHomeSection("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-6"
              >
                {t.nav.consult}
              </Button>
            </div>

            <button
              className="lg:hidden text-foreground"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {open && (
            <div className="lg:hidden absolute top-full inset-x-0 bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-3">
              {NAV.map((item) => (
                <button
                  key={item}
                  onClick={() => goHomeSection(item)}
                  className="text-start text-lg font-medium hover:text-primary"
                >
                  {t.nav[item]}
                </button>
              ))}
              <LanguageSwitch lang={lang} onChange={switchLang} />
              <Button onClick={() => goHomeSection("contact")} className="bg-primary text-primary-foreground w-full font-bold">
                {t.nav.consult}
              </Button>
            </div>
          )}
        </nav>
      </header>

      {children}

      <footer className="bg-background border-t border-border py-12" itemScope itemType="https://schema.org/WPFooter">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3 max-w-md">
            <Link href={localizePath(lang, "/")}>
              <span className="text-2xl font-black tracking-tighter font-display">
                AS<span className="text-primary"> Awan</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm text-center md:text-start">{t.footer.blurb}</p>
            <address className="not-italic text-xs text-muted-foreground/70 text-center md:text-start">
              {SITE.offices.jeddah.address}
              <br />
              {SITE.offices.lahore.address}
              <br />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </address>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <button key={item} onClick={() => goHomeSection(item)} className="hover:text-primary">
                {t.nav[item]}
              </button>
            ))}
          </nav>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link href={localizePath(lang, "/privacy")} className="hover:text-primary">
              {t.footer.privacy}
            </Link>
            <Link href={localizePath(lang, "/terms")} className="hover:text-primary">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${SITE.phones[0].e164.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
        className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-50" />
        <MessageSquare className="w-8 h-8 relative z-10" />
      </a>
    </div>
  );
}

function LanguageSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border px-1 py-1" role="group" aria-label="Language">
      {LANGS.map((code) => (
        <button
          key={code}
          onClick={() => onChange(code)}
          className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
            lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          lang={LANG_META[code].locale}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
