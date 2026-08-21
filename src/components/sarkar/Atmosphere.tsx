import { useMemo } from "react";

/** Subtle drifting light particles for the dark background. */
export function Atmosphere({ count = 18 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 1.7) % 14}s`,
        duration: `${14 + ((i * 5) % 14)}s`,
        size: 1 + ((i * 3) % 3),
        bottom: `${(i * 11) % 60}%`,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-veil animate-pulse-glow" />
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-drift absolute rounded-full bg-chrome/40"
          style={{
            left: d.left,
            bottom: d.bottom,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  );
}
