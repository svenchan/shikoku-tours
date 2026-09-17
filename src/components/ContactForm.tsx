"use client";

import { useMemo, useState } from "react";
import type { SiteContent, Tour } from "@/lib/content";

type Props = {
  tours: Tour[];
  copy: SiteContent["contactPage"];
  preselectedSlug?: string;
  locale: string;
};

export function ContactForm({ tours, copy, preselectedSlug, locale }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const initialTour = useMemo(() => {
    if (preselectedSlug && tours.some((t) => t.slug === preselectedSlug)) return preselectedSlug;
    return "";
  }, [preselectedSlug, tours]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          preferredDates: data.get("preferredDates"),
          people: data.get("people"),
          tourSlug: data.get("tourSlug"),
          message: data.get("message"),
          website: data.get("website"),
          locale,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-available/30 bg-paper px-6 py-10">
        <h2 className="font-display text-3xl text-forest">{copy.successTitle}</h2>
        <p className="mt-4 leading-relaxed text-muted">{copy.successBody}</p>
        <button
          type="button"
          className="mt-8 min-h-11 text-sm font-medium text-accent hover:text-accent-dark"
          onClick={() => setStatus("idle")}
        >
          {copy.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} method="dialog" className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.name}</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 text-ink outline-none focus:border-moss"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.email}</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 text-ink outline-none focus:border-moss"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.dates}</span>
        <input
          required
          name="preferredDates"
          placeholder={copy.datesPlaceholder}
          className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 text-ink outline-none focus:border-moss placeholder:text-sage"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.people}</span>
        <input
          required
          name="people"
          inputMode="numeric"
          min={1}
          max={12}
          defaultValue={2}
          type="number"
          className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 text-ink outline-none focus:border-moss"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.tour}</span>
        <select
          name="tourSlug"
          defaultValue={initialTour}
          className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 text-ink outline-none focus:border-moss"
        >
          <option value="">{copy.tourPlaceholder}</option>
          {tours.map((tour) => (
            <option key={tour.slug} value={tour.slug}>
              {tour.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-forest">{copy.message}</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder={copy.messagePlaceholder}
          className="w-full rounded-sm border border-stone bg-paper px-3 py-3 text-ink outline-none focus:border-moss placeholder:text-sage"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" ? <p className="text-sm text-booked">{copy.error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 w-full rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
