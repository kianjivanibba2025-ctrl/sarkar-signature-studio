import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePerfume } from "@/lib/perfume-store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/create", label: "Create" },
  { to: "/collection", label: "Collection" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = usePerfume();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl hairline" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[110rem] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          className="font-display text-2xl tracking-[0.45em] text-chrome md:text-3xl"
          aria-label="SARKAR home"
        >
          SARKAR
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="relative text-[0.68rem] uppercase tracking-luxe transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            <Search className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.2} />
          </button>
          <button
            aria-label="Account"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            <User className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.2} />
          </button>
          <button aria-label="Cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.2} />
            {cart > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] text-primary-foreground">
                {cart}
              </span>
            )}
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.2} /> : <Menu className="h-5 w-5" strokeWidth={1.2} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/50 py-4 text-xs uppercase tracking-luxe text-muted-foreground transition-colors last:border-0 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
