import { createFileRoute, Link } from "@tanstack/react-router";
import { BtnLink } from "@/components/sarkar/Btn";
import { Atmosphere } from "@/components/sarkar/Atmosphere";
import { BottleVisual } from "@/components/sarkar/BottleVisual";
import { COLLECTION, formatINR } from "@/lib/perfume-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SARKAR — Create Your Signature Perfume" },
      {
        name: "description",
        content:
          "Design a fragrance that belongs to no one else. Choose your scent family, notes, personality and chess-king bottle at the SARKAR customization studio.",
      },
      { property: "og:title", content: "SARKAR — Create Your Signature Perfume" },
      {
        property: "og:description",
        content: "A fragrance designed by you. Crafted by SARKAR.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <Atmosphere />
        <div className="relative mx-auto grid w-full max-w-[110rem] items-center gap-10 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise order-2 lg:order-1">
            <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Maison Sarkar — Parfums de Caractère
            </p>
            <h1 className="font-display mt-7 text-[clamp(2.9rem,8vw,7rem)] leading-[0.92] tracking-tight">
              <span className="block text-chrome">CREATE YOUR</span>
              <span className="block italic text-foreground/90">SIGNATURE.</span>
            </h1>
            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              A fragrance designed by you. Crafted by SARKAR.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <BtnLink to="/create" variant="royal" size="lg">
                Create your perfume
              </BtnLink>
              <BtnLink to="/collection" variant="outline" size="lg">
                Explore Sarkar
              </BtnLink>
            </div>
            <p className="mt-14 text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Your scent. Your bottle. Your SARKAR.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <BottleVisual bottleId="classic" size="lg" interactive float priority />
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-[110rem] gap-px sm:grid-cols-3">
          {[
            ["01", "Composed by you", "Five steps, one signature."],
            ["02", "Hand-filled", "Small batch, Grasse-sourced oils."],
            ["03", "Chess-king flacon", "The house silhouette, since day one."],
          ].map(([n, t, s]) => (
            <div key={n} className="px-8 py-12">
              <p className="font-display text-2xl text-primary/80">{n}</p>
              <p className="mt-4 text-sm uppercase tracking-luxe">{t}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTION PREVIEW */}
      <section className="mx-auto max-w-[110rem] px-5 py-28 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-none">
            The <span className="italic text-chrome">Collection</span>
          </h2>
          <Link
            to="/collection"
            className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTION.map((item) => (
            <Link
              key={item.id}
              to="/collection"
              className="group bg-background px-6 py-10 transition-colors duration-500 hover:bg-card"
            >
              <BottleVisual bottleId={item.id} size="sm" className="transition-transform duration-700 group-hover:scale-[1.04]" />
              <p className="mt-8 font-display text-2xl">{item.name}</p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                {item.family}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">{formatINR(item.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="relative overflow-hidden border-t border-border py-32">
        <Atmosphere count={10} />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.02]">
            NOT JUST A FRAGRANCE.
            <span className="block italic text-chrome">A STATEMENT OF PRESENCE.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            Sarkar represents authority, individuality, confidence and presence. The chess-king
            bottle stands for strategy, power, and the ability to command attention without saying
            a word.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <BtnLink to="/story" variant="outline">
              Read the story
            </BtnLink>
            <BtnLink to="/create" variant="royal">
              Begin your creation
            </BtnLink>
          </div>
        </div>
      </section>
    </>
  );
}
