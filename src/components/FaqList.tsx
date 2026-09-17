"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      {items.map((item) => {
        const isOpen = open === item.question;
        return (
          <div key={item.question} className="border-b border-stone py-5">
            <button
              type="button"
              className="flex min-h-11 w-full items-start justify-between gap-4 text-left text-lg text-forest"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.question)}
            >
              {item.question}
              <span className={`text-sage ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen ? <p className="mt-3 leading-relaxed text-muted">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
