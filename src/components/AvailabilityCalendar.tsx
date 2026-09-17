"use client";

import { useEffect, useMemo, useState } from "react";
import { dayStatus, type DayStatus } from "@/lib/content";

function monthLabel(year: number, month: number, locale: string) {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function iso(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function cellClass(status: DayStatus) {
  if (status === "booked") return "bg-booked/90 text-paper";
  if (status === "available") return "bg-available/90 text-paper";
  return "bg-unavailable text-ink/70";
}

function MonthGrid({
  year,
  month,
  locale,
  availability,
  weekdayLabels,
}: {
  year: number;
  month: number;
  locale: string;
  availability: Record<string, DayStatus>;
  weekdayLabels: string[];
}) {
  const first = new Date(year, month, 1).getDay();
  const count = daysInMonth(year, month);
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];

  return (
    <div>
      <h3 className="font-display mb-4 text-2xl text-forest capitalize">
        {monthLabel(year, month, locale)}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted uppercase">
        {weekdayLabels.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const key = iso(year, month, day);
          const status = dayStatus(key, availability);
          return (
            <div
              key={key}
              className={`flex aspect-square items-center justify-center rounded-sm text-sm ${cellClass(status)}`}
              aria-label={`${key}: ${status}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar({
  availability,
  locale,
  labels,
}: {
  availability: Record<string, DayStatus>;
  locale: string;
  labels: { prev: string; next: string; available: string; booked: string; unavailable: string };
}) {
  const [cursor, setCursor] = useState({ year: 2026, month: 8 });

  useEffect(() => {
    const now = new Date();
    setCursor({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  const second =
    cursor.month === 11
      ? { year: cursor.year + 1, month: 0 }
      : { year: cursor.year, month: cursor.month + 1 };

  const sundayFirst = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { weekday: "short" });
    return [0, 1, 2, 3, 4, 5, 6].map((offset) => fmt.format(new Date(2026, 1, 1 + offset)));
  }, [locale]);

  function back() {
    setCursor((c) => (c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }));
  }
  function forward() {
    setCursor((c) => (c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }));
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-available" /> {labels.available}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-booked" /> {labels.booked}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-unavailable" /> {labels.unavailable}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={back}
            className="min-h-11 rounded-full border border-stone px-4 text-sm text-forest hover:bg-stone"
          >
            ← {labels.prev}
          </button>
          <button
            type="button"
            onClick={forward}
            className="min-h-11 rounded-full border border-stone px-4 text-sm text-forest hover:bg-stone"
          >
            {labels.next} →
          </button>
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <MonthGrid
          year={cursor.year}
          month={cursor.month}
          locale={locale}
          availability={availability}
          weekdayLabels={sundayFirst}
        />
        <MonthGrid
          year={second.year}
          month={second.month}
          locale={locale}
          availability={availability}
          weekdayLabels={sundayFirst}
        />
      </div>
    </div>
  );
}
