import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/sarkar/Atmosphere";
import { BottleVisual } from "@/components/sarkar/BottleVisual";
import { BtnLink } from "@/components/sarkar/Btn";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — SARKAR Parfums" },
      {
        name: "description",
        content:
          "Not just a fragrance. A statement of presence. The idea behind SARKAR and its chess-king flacon.",
      },
      { property: "og:title", content: "Our Story — SARKAR Parfums" },
      {
        property: "og:description",
        content: "Authority, individuality, confidence, presence — the SARKAR philosophy.",
      },
    ],
  }),
  component: StoryPage,
});

const CHAPTERS = [
  {
    n: "I",
    title: "The Silhouette",
    body: "The flacon is modelled on the king — the slowest piece on the board and the reason the game exists. It moves one square at a time and still decides everything.",
  },
  {
    n: "II",
    title: "The Composition",
    body: "Oils sourced from Grasse, Mysore and Assam. Macerated for six weeks, filtered cold, hand-filled in small batch. No shortcuts that the skin would notice.",
  },
  {
    n: "III",
    title: "The Wearer",
    body: "Sarkar is not worn to be noticed. It is worn to be remembered — a signature left in a room after the door closes.",
  },
];

function StoryPage() {
  return (
    <div className="pt-32">
      <section className="relative overflow-hidden px-5 pb-28 md:px-10">
        <Atmosphere count={12} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">Our story</p>
          <h1 className="font-display mt-8 text-[clamp(2.2rem,6.5vw,5rem)] leading-[1.02]">
            NOT JUST A FRAGRANCE.
            <span className="block italic text-chrome">A STATEMENT OF PRESENCE.</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            Sarkar represents authority, individuality, confidence and presence. The
            chess-king-inspired bottle represents strategy, power, and the ability to command
            attention without saying a word.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[110rem] items-center gap-16 border-t border-border px-5 py-24 md:px-10 lg:grid-cols-2">
        <BottleVisual bottleId="royale" size="lg" interactive float />
        <div className="space-y-14">
          {CHAPTERS.map((c) => (
            <div key={c.n} className="animate-rise border-l border-border pl-8">
              <p className="font-display text-xl text-primary/80">{c.n}</p>
              <h2 className="font-display mt-3 text-3xl">{c.title}</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-5 py-28 text-center md:px-10">
        <p className="font-display mx-auto max-w-3xl text-[clamp(1.6rem,4vw,3rem)] italic leading-tight text-chrome">
          “You didn't choose a perfume. You created your SARKAR.”
        </p>
        <div className="mt-12 flex justify-center">
          <BtnLink to="/create" size="lg">
            Create your perfume
          </BtnLink>
        </div>
      </section>
    </div>
  );
}
