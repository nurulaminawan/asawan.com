import { SITE } from "@/lib/site";

export default function Maintenance() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-background text-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(900px 420px at 50% -10%, hsl(39 48% 57% / 0.12), transparent 55%)",
        }}
      />
      <main className="relative z-10 max-w-xl w-full text-center">
        <p className="text-4xl md:text-5xl font-black tracking-tighter font-display mb-6">
          AS<span className="text-primary"> Awan</span>
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Site under maintenance</h1>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          We are updating asawan.com. Please check back shortly, or contact the practice directly.
        </p>
        <div className="space-y-2 text-sm md:text-base" dir="ltr">
          {SITE.phones.map((p) => (
            <p key={p.id}>
              <span className="text-muted-foreground">{p.label}: </span>
              <a href={`tel:${p.e164}`} className="text-primary hover:underline">
                {p.display}
              </a>
            </p>
          ))}
          <p>
            <span className="text-muted-foreground">WhatsApp: </span>
            <a
              href={`https://wa.me/${SITE.whatsapp.e164.replace("+", "")}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.whatsapp.display}
            </a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
              {SITE.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
