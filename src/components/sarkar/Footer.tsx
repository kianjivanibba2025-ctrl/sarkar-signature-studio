import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[110rem] gap-12 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-[0.45em] text-chrome">SARKAR</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A fragrance house built on presence. Every bottle is shaped after the chess king —
            strategy, restraint and quiet command.
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/create", label: "Create your perfume" },
              { to: "/collection", label: "The collection" },
              { to: "/story", label: "Our story" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">Maison</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Mumbai • Dubai • Paris</li>
            <li>concierge@sarkar.parfums</li>
            <li>+91 22 4000 1857</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-[0.65rem] uppercase tracking-luxe text-muted-foreground md:px-10">
        © {new Date().getFullYear()} Sarkar Parfums — Your scent. Your bottle. Your Sarkar.
      </div>
    </footer>
  );
}
