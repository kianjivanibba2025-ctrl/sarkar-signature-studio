import { cn } from "@/lib/utils";

interface Props {
  top: string[];
  heart: string[];
  base: string[];
  className?: string;
}

const ROWS = [
  { key: "top", label: "Top", width: "w-2/5" },
  { key: "heart", label: "Heart", width: "w-3/5" },
  { key: "base", label: "Base", width: "w-4/5" },
] as const;

export function Pyramid({ top, heart, base, className }: Props) {
  const map = { top, heart, base };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {ROWS.map((row) => {
        const notes = map[row.key];
        return (
          <div
            key={row.key}
            className={cn(
              "surface-panel flex min-h-[4.5rem] flex-col items-center justify-center gap-2 px-4 py-3 text-center transition-all duration-500",
              row.width,
            )}
          >
            <p className="text-[0.58rem] uppercase tracking-luxe text-muted-foreground">
              {row.label}
            </p>
            {notes.length === 0 ? (
              <p className="text-xs font-light text-muted-foreground/60">Not composed yet</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-1.5">
                {notes.map((n) => (
                  <span
                    key={n}
                    className="animate-rise rounded-full border border-border px-3 py-1 text-[0.68rem] text-foreground/90"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
