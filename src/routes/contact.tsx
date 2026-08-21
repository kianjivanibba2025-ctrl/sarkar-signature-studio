import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Btn } from "@/components/sarkar/Btn";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SARKAR Parfums" },
      {
        name: "description",
        content:
          "Speak to the SARKAR concierge about bespoke commissions, gifting and private appointments in Mumbai, Dubai and Paris.",
      },
      { property: "og:title", content: "Contact — SARKAR Parfums" },
      { property: "og:description", content: "Private appointments and bespoke commissions." },
    ],
  }),
  component: ContactPage,
});

const field =
  "w-full border-b border-border bg-transparent py-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-chrome/70";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "A valid email is required.";
    if (form.message.trim().length < 10) next.message = "A little more detail, please.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message received", {
        description: "The Sarkar concierge will reply within one business day.",
      });
    }, 900);
  };

  return (
    <div className="pt-32">
      <div className="mx-auto grid max-w-[110rem] gap-20 px-5 pb-28 md:px-10 lg:grid-cols-2">
        <div>
          <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">Concierge</p>
          <h1 className="font-display mt-6 text-[clamp(2.4rem,7vw,5rem)] leading-none">
            GET IN <span className="italic text-chrome">TOUCH</span>
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted-foreground">
            Bespoke commissions, corporate gifting, or a private appointment at one of our ateliers
            — write to us and we will arrange it.
          </p>
          <dl className="mt-14 space-y-8 text-sm">
            {[
              ["Email", "concierge@sarkar.parfums"],
              ["Telephone", "+91 22 4000 1857"],
              ["Ateliers", "Mumbai • Dubai • Paris"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.62rem] uppercase tracking-luxe text-muted-foreground">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={submit} className="surface-panel p-8 md:p-12" noValidate>
          <div className="space-y-8">
            {(
              [
                ["name", "Your name", "text"],
                ["email", "Email address", "email"],
              ] as const
            ).map(([key, placeholder, type]) => (
              <div key={key}>
                <input
                  type={type}
                  value={form[key]}
                  placeholder={placeholder}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={cn(field, errors[key] && "border-destructive")}
                />
                {errors[key] && (
                  <p className="mt-2 text-xs text-destructive">{errors[key]}</p>
                )}
              </div>
            ))}
            <div>
              <textarea
                rows={5}
                value={form.message}
                placeholder="How can we help?"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={cn(field, "resize-none", errors.message && "border-destructive")}
              />
              {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
            </div>
          </div>
          <Btn type="submit" className="mt-10 w-full" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
          </Btn>
        </form>
      </div>
    </div>
  );
}
