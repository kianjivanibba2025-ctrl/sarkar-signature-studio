import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { Atmosphere } from "@/components/sarkar/Atmosphere";
import { BottleVisual } from "@/components/sarkar/BottleVisual";
import { Btn } from "@/components/sarkar/Btn";
import { Pyramid } from "@/components/sarkar/Pyramid";
import { SelectCard } from "@/components/sarkar/SelectCard";
import { usePerfume } from "@/lib/perfume-store";
import { cn } from "@/lib/utils";
import {
  BOTTLES,
  CAP_FINISHES,
  LABEL_STYLES,
  NOTES,
  PERSONALITIES,
  SCENT_FAMILIES,
  SIZES,
  describe,
  formatINR,
  generateName,
  getBottle,
  getFamily,
  getPersonality,
  priceOf,
  type NoteLayer,
} from "@/lib/perfume-data";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Your Perfume — SARKAR" },
      {
        name: "description",
        content:
          "The SARKAR customization studio: choose a scent family, compose top, heart and base notes, pick a character, a chess-king bottle and name your fragrance.",
      },
      { property: "og:title", content: "Create Your Perfume — SARKAR" },
      {
        property: "og:description",
        content: "Five steps to a fragrance that belongs to no one else.",
      },
    ],
  }),
  component: CreatePage,
});

const STEPS = ["Scent", "Notes", "Character", "Bottle", "Name", "Review"];

function CreatePage() {
  const { creation, update, toggleNote, step, setStep, hydrated, addToCart, saveCreation, reset } =
    usePerfume();
  const [generating, setGenerating] = useState(false);
  const [added, setAdded] = useState(false);

  const totalNotes = creation.top.length + creation.heart.length + creation.base.length;

  const canAdvance = useMemo(() => {
    if (step === 0) return !!creation.family;
    if (step === 1) return totalNotes >= 2;
    if (step === 2) return !!creation.personality;
    if (step === 4) return creation.name.trim().length > 1;
    return true;
  }, [step, creation, totalNotes]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const description = describe(creation);
  const price = priceOf(creation);
  const displayName = creation.name.trim() || "UNTITLED SARKAR";

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      update({ name: generateName(creation) });
      setGenerating(false);
    }, 700);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
          Opening the atelier…
        </p>
      </div>
    );
  }

  return (
    <div className="relative pt-28">
      <Atmosphere count={12} />

      {/* PROGRESS */}
      <div className="sticky top-20 z-40 border-y border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[110rem] px-5 py-4 md:px-10">
          <div className="flex items-center gap-3 overflow-x-auto">
            {STEPS.map((label, i) => (
              <button
                key={label}
                onClick={() => i <= step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex shrink-0 items-center gap-2 text-[0.6rem] uppercase tracking-luxe transition-colors duration-300",
                  i === step
                    ? "text-foreground"
                    : i < step
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-foreground/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem]",
                    i === step
                      ? "border-chrome bg-chrome text-ink"
                      : i < step
                        ? "border-chrome/50"
                        : "border-border",
                  )}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-border">
            <div
              className="h-px bg-royal transition-all duration-700"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div key={step} className="animate-rise mx-auto max-w-[110rem] px-5 py-16 md:px-10 md:py-24">
        {step === 0 && (
          <StepShell
            eyebrow="Step one"
            title="CHOOSE YOUR SCENT FAMILY"
            lede="Every Sarkar begins with a territory. Pick the world your fragrance lives in."
          >
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {SCENT_FAMILIES.map((f) => (
                <SelectCard
                  key={f.id}
                  selected={creation.family === f.id}
                  onClick={() => update({ family: f.id })}
                  title={f.name}
                  subtitle={f.tagline}
                  accent={f.accent}
                  className="min-h-[15rem]"
                >
                  <span className="flex flex-wrap gap-2">
                    {f.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="rounded-full border border-border px-3 py-1 text-[0.65rem] text-muted-foreground"
                      >
                        {ing}
                      </span>
                    ))}
                  </span>
                </SelectCard>
              ))}
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            eyebrow="Step two"
            title="BUILD THE FRAGRANCE"
            lede="Compose the three layers. Select as many notes as your signature demands."
          >
            <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="space-y-14">
                {(Object.keys(NOTES) as NoteLayer[]).map((layer) => (
                  <section key={layer}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-display text-3xl">{NOTES[layer].title}</h3>
                      <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                        {NOTES[layer].caption}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {NOTES[layer].options.map((note) => {
                        const active = creation[layer].includes(note);
                        return (
                          <button
                            key={note}
                            onClick={() => toggleNote(layer, note)}
                            aria-pressed={active}
                            className={cn(
                              "shimmer rounded-full border px-5 py-2.5 text-xs transition-all duration-400",
                              active
                                ? "border-chrome/80 bg-card text-foreground halo"
                                : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-chrome/40 hover:text-foreground",
                            )}
                          >
                            {note}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="lg:sticky lg:top-56 lg:self-start">
                <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                  Live fragrance pyramid
                </p>
                <Pyramid
                  className="mt-6"
                  top={creation.top}
                  heart={creation.heart}
                  base={creation.base}
                />
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  {totalNotes} note{totalNotes === 1 ? "" : "s"} selected
                </p>
              </aside>
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step three"
            title="WHAT SHOULD YOUR SARKAR FEEL LIKE?"
            lede="Character shapes the final composition and the way it is described."
          >
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {PERSONALITIES.map((p) => (
                <SelectCard
                  key={p.id}
                  selected={creation.personality === p.id}
                  onClick={() => update({ personality: p.id })}
                  title={p.name}
                  subtitle={p.traits.join(" • ")}
                  className="min-h-[14rem]"
                >
                  <span className="block max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {p.line}
                  </span>
                </SelectCard>
              ))}
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            eyebrow="Step four"
            title="CHOOSE THE BOTTLE"
            lede="The chess-king cap stays. Everything else is yours to decide."
          >
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="surface-panel relative flex flex-col items-center justify-center py-10">
                <BottleVisual bottleId={creation.bottle} size="md" interactive float />
                <p className="mt-6 font-display text-2xl">{getBottle(creation.bottle).name}</p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-muted-foreground">
                  {CAP_FINISHES.find((c) => c.id === creation.cap)?.name} •{" "}
                  {LABEL_STYLES.find((l) => l.id === creation.label)?.name} •{" "}
                  {SIZES.find((s) => s.id === creation.size)?.name}
                </p>
              </div>

              <div className="space-y-12">
                <OptionRow label="Bottle">
                  <div className="grid gap-px bg-border sm:grid-cols-2">
                    {BOTTLES.map((b) => (
                      <SelectCard
                        key={b.id}
                        selected={creation.bottle === b.id}
                        onClick={() => update({ bottle: b.id })}
                        title={b.name}
                        subtitle={b.subtitle}
                        accent={b.glow}
                        className="p-5 md:p-6"
                      />
                    ))}
                  </div>
                </OptionRow>

                <OptionRow label="Cap finish">
                  <Chips
                    options={CAP_FINISHES.map((c) => ({ id: c.id, label: c.name }))}
                    value={creation.cap}
                    onChange={(id) => update({ cap: id })}
                  />
                </OptionRow>

                <OptionRow label="Label style">
                  <Chips
                    options={LABEL_STYLES.map((l) => ({ id: l.id, label: l.name }))}
                    value={creation.label}
                    onChange={(id) => update({ label: id })}
                  />
                </OptionRow>

                <OptionRow label="Size">
                  <Chips
                    options={SIZES.map((s) => ({ id: s.id, label: s.name }))}
                    value={creation.size}
                    onChange={(id) => update({ size: id })}
                  />
                </OptionRow>

                <p className="font-display text-3xl text-chrome">{formatINR(price)}</p>
              </div>
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            eyebrow="Step five"
            title="EVERY SARKAR NEEDS A NAME."
            lede="Give your composition an identity — or let the atelier propose one."
          >
            <div className="mx-auto max-w-2xl">
              <input
                value={creation.name}
                onChange={(e) => update({ name: e.target.value.slice(0, 28) })}
                placeholder="Name your fragrance"
                aria-label="Name your fragrance"
                className="font-display w-full border-b border-border bg-transparent pb-5 text-center text-[clamp(1.8rem,6vw,3.5rem)] uppercase tracking-[0.12em] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-chrome/70"
              />
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Btn variant="outline" onClick={handleGenerate} disabled={generating}>
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.4} />
                  {generating ? "Composing…" : "Generate name"}
                </Btn>
                {creation.name && (
                  <Btn variant="ghost" size="md" onClick={() => update({ name: "" })}>
                    Clear
                  </Btn>
                )}
              </div>
              {!creation.name && (
                <p className="mt-10 text-center text-xs text-muted-foreground">
                  Suggestions: Sarkar Noir • Royal Oud • Midnight King • Blue Reign • The Crown
                </p>
              )}
            </div>
          </StepShell>
        )}

        {step === 5 && (
          <StepShell
            eyebrow="Step six"
            title="YOUR SARKAR"
            lede="Composed from your selections. Nothing about it is standard."
          >
            <div className="surface-panel grid gap-12 p-6 md:p-14 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative flex items-center justify-center">
                <BottleVisual bottleId={creation.bottle} size="md" interactive float />
              </div>

              <div>
                <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                  {getFamily(creation.family)?.name ?? "Signature"} •{" "}
                  {getPersonality(creation.personality)?.name ?? "Bespoke"}
                </p>
                <h3 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none text-chrome">
                  {displayName}
                </h3>
                <p className="mt-3 text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
                  {SIZES.find((s) => s.id === creation.size)?.name} Eau de Parfum
                </p>

                <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <dl className="mt-8 space-y-3 text-sm">
                  {(
                    [
                      ["Top", creation.top],
                      ["Heart", creation.heart],
                      ["Base", creation.base],
                    ] as const
                  ).map(([label, notes]) => (
                    <div key={label} className="flex gap-4">
                      <dt className="w-16 shrink-0 text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-foreground/90">
                        {notes.length ? notes.join(" • ") : "—"}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="font-display mt-10 text-4xl">{formatINR(price)}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Btn
                    onClick={() => {
                      addToCart();
                      setAdded(true);
                      toast.success(`${displayName} added to cart`, {
                        description: `${SIZES.find((s) => s.id === creation.size)?.name} • ${formatINR(price)}`,
                      });
                    }}
                  >
                    {added ? "Added ✓" : "Add to cart"}
                  </Btn>
                  <Btn variant="outline" onClick={() => setStep(0)}>
                    Edit my perfume
                  </Btn>
                  <Btn
                    variant="ghost"
                    onClick={() => {
                      saveCreation();
                      toast("Creation saved", { description: "Kept in your private atelier." });
                    }}
                  >
                    Save my creation
                  </Btn>
                </div>

                <button
                  onClick={() => {
                    reset();
                    toast("Atelier cleared");
                  }}
                  className="mt-8 text-[0.6rem] uppercase tracking-luxe text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  Start over
                </button>
              </div>
            </div>
          </StepShell>
        )}

        {/* NAVIGATION */}
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8">
          <Btn variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </Btn>
          <p className="text-[0.6rem] uppercase tracking-luxe text-muted-foreground">
            {!canAdvance && step === 1 && "Select at least two notes"}
            {!canAdvance && step === 0 && "Select a scent family"}
            {!canAdvance && step === 2 && "Select a character"}
            {!canAdvance && step === 4 && "Name your fragrance"}
          </p>
          {step < STEPS.length - 1 ? (
            <Btn onClick={() => setStep(step + 1)} disabled={!canAdvance}>
              Continue
            </Btn>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">{eyebrow}</p>
      <h2 className="font-display mt-5 max-w-4xl text-[clamp(1.9rem,5.5vw,4rem)] leading-[1.02]">
        {title}
      </h2>
      <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
        {lede}
      </p>
      <div className="mt-14">{children}</div>
    </section>
  );
}

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">{label}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Chips({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cn(
            "shimmer rounded-full border px-5 py-2.5 text-xs transition-all duration-400",
            value === o.id
              ? "border-chrome/80 bg-card text-foreground halo"
              : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-chrome/40 hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
