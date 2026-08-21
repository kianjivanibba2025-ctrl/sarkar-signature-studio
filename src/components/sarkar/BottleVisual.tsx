import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getBottle } from "@/lib/perfume-data";

interface Props {
  bottleId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** enables pointer-driven rotation */
  interactive?: boolean;
  float?: boolean;
  priority?: boolean;
  label?: string;
}

const dims = {
  sm: "h-56",
  md: "h-[26rem]",
  lg: "h-[34rem] md:h-[42rem]",
};

export function BottleVisual({
  bottleId,
  size = "md",
  className,
  interactive = false,
  float = false,
  priority = false,
  label,
}: Props) {
  const bottle = getBottle(bottleId);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 10, y: px * 26 });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={cn("relative flex items-center justify-center", className)}
      style={{ perspective: "1400px" }}
    >
      <div
        aria-hidden
        className="animate-pulse-glow absolute h-2/3 w-2/3 rounded-full blur-[90px]"
        style={{ background: bottle.glow, opacity: 0.4 }}
      />
      <div
        className={cn("relative transition-transform duration-500 ease-out", float && "animate-float-slow")}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={bottle.image}
          alt={label ?? `${bottle.name} perfume bottle with chess king cap`}
          width={1024}
          height={1536}
          loading={priority ? "eager" : "lazy"}
          className={cn(dims[size], "w-auto object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.65)]")}
        />
        <div
          aria-hidden
          className="mx-auto h-24 w-2/3 -translate-y-4 scale-y-[-1] opacity-20 blur-[2px]"
          style={{
            backgroundImage: `url(${bottle.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}
