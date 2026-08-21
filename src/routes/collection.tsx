import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Btn, BtnLink } from "@/components/sarkar/Btn";
import { BottleVisual } from "@/components/sarkar/BottleVisual";
import { COLLECTION, formatINR } from "@/lib/perfume-data";
import { usePerfume } from "@/lib/perfume-store";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — SARKAR Parfums" },
      {
        name: "description",
        content:
          "Explore the SARKAR collection: Classic, Noir, Royale and Phantom — four eaux de parfum in the house chess-king flacon.",
      },
      { property: "og:title", content: "The Collection — SARKAR Parfums" },
      {
        property: "og:description",
        content: "Four house fragrances. One silhouette. Discover SARKAR.",
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { addToCart } = usePerfume();

  return (
    <div className="pt-32">
      <header className="mx-auto max-w-[110rem] px-5 pb-16 md:px-10">
        <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">The house</p>
        <h1 className="font-display mt-6 text-[clamp(2.4rem,7vw,5.5rem)] leading-none">
          THE <span className="italic text-chrome">COLLECTION</span>
        </h1>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
          Four compositions from the Sarkar atelier. Each one shares the chess-king flacon; none of
          them share a character.
        </p>
      </header>

      <div className="mx-auto grid max-w-[110rem] gap-px bg-border md:grid-cols-2">
        {COLLECTION.map((item, i) => (
          <article
            key={item.id}
            className="group animate-rise bg-background px-6 py-14 transition-colors duration-500 hover:bg-card md:px-12"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <BottleVisual
              bottleId={item.id}
              size="md"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="mt-10">
              <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                {item.family}
              </p>
              <h2 className="font-display mt-4 text-3xl md:text-4xl">{item.name}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-6 font-display text-2xl text-chrome">{formatINR(item.price)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast(item.name.toUpperCase(), { description: item.description })
                  }
                >
                  View perfume
                </Btn>
                <Btn
                  size="sm"
                  onClick={() => {
                    addToCart();
                    toast.success(`${item.name} added to cart`);
                  }}
                >
                  Add to cart
                </Btn>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="border-t border-border px-5 py-28 text-center md:px-10">
        <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] leading-tight">
          None of them yours? <span className="italic text-chrome">Make one.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <BtnLink to="/create" size="lg">
            Create your perfume
          </BtnLink>
        </div>
      </section>
    </div>
  );
}
