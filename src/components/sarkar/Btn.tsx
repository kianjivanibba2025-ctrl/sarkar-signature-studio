import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export const btnVariants = cva(
  "shimmer inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-luxe transition-all duration-500 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        royal:
          "bg-royal text-primary-foreground halo hover:-translate-y-0.5 hover:brightness-115",
        outline:
          "border border-border bg-transparent text-foreground hover:border-chrome/70 hover:bg-secondary/40 hover:-translate-y-0.5",
        chrome:
          "bg-chrome text-ink hover:-translate-y-0.5 hover:brightness-105",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-8",
        lg: "h-14 px-10",
      },
    },
    defaultVariants: { variant: "royal", size: "md" },
  },
);

type BtnProps = ComponentProps<"button"> & VariantProps<typeof btnVariants>;

export function Btn({ className, variant, size, ...props }: BtnProps) {
  return <button className={cn(btnVariants({ variant, size }), className)} {...props} />;
}

type BtnLinkProps = ComponentProps<typeof Link> & VariantProps<typeof btnVariants>;

export function BtnLink({ className, variant, size, ...props }: BtnLinkProps) {
  return <Link className={cn(btnVariants({ variant, size }), className)} {...props} />;
}
