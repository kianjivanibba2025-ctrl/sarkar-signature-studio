import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  accent?: string;
}

export function SelectCard({
  selected,
  onClick,
  title,
  subtitle,
  children,
  className,
  accent,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "shimmer group relative overflow-hidden border p-6 text-left transition-all duration-500 md:p-8",
        selected
          ? "border-chrome/70 bg-card halo"
          : "border-border bg-card/30 hover:-translate-y-1 hover:border-chrome/40 hover:bg-card/60",
        className,
      )}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500"
          style={{ background: accent, opacity: selected ? 0.4 : 0.12 }}
        />
      )}
      <span
        className={cn(
          "absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500",
          selected ? "border-chrome bg-chrome text-ink" : "border-border text-transparent",
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      <span className="relative block font-display text-2xl md:text-3xl">{title}</span>
      {subtitle && (
        <span className="relative mt-2 block text-[0.62rem] uppercase tracking-luxe text-muted-foreground">
          {subtitle}
        </span>
      )}
      {children && <span className="relative mt-6 block">{children}</span>}
    </button>
  );
}
