import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { I18nProvider } from "@/lib/i18n";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LegalPage from "@/pages/LegalPage";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ar" component={Home} />
        <Route path="/ur" component={Home} />
        <Route path="/fr" component={Home} />
        <Route path="/services/:slug" component={ServicePage} />
        <Route path="/ar/services/:slug" component={ServicePage} />
        <Route path="/ur/services/:slug" component={ServicePage} />
        <Route path="/fr/services/:slug" component={ServicePage} />
        <Route path="/privacy">{() => <LegalPage kind="privacy" />}</Route>
        <Route path="/ar/privacy">{() => <LegalPage kind="privacy" />}</Route>
        <Route path="/ur/privacy">{() => <LegalPage kind="privacy" />}</Route>
        <Route path="/fr/privacy">{() => <LegalPage kind="privacy" />}</Route>
        <Route path="/terms">{() => <LegalPage kind="terms" />}</Route>
        <Route path="/ar/terms">{() => <LegalPage kind="terms" />}</Route>
        <Route path="/ur/terms">{() => <LegalPage kind="terms" />}</Route>
        <Route path="/fr/terms">{() => <LegalPage kind="terms" />}</Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <I18nProvider>
        <ScrollToTop />
        <Routes />
      </I18nProvider>
    </WouterRouter>
  );
}
