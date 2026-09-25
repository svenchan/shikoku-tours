"use client";

import { useState } from "react";

type Labels = {
  share: string;
  shareWhatsApp: string;
  shareEmail: string;
  shareCopy: string;
  shareCopied: string;
};

export function ShareButtons({ title, labels }: { title: string; labels: Labels }) {
  const [copied, setCopied] = useState(false);

  function pageUrl() {
    return window.location.href;
  }

  function shareWhatsApp() {
    const text = `${title} ${pageUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function shareEmail() {
    const href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pageUrl())}`;
    window.location.href = href;
  }

  async function copyLink() {
    await navigator.clipboard.writeText(pageUrl());
    setCopied(true);
  }

  const buttonClass =
    "inline-flex min-h-11 items-center rounded-full border border-stone bg-paper px-4 text-sm text-ink hover:border-forest";

  return (
    <div className="mt-10 flex flex-wrap items-center gap-2">
      <p className="mr-2 text-sm tracking-wide text-muted uppercase">{labels.share}</p>
      <button type="button" className={buttonClass} onClick={shareWhatsApp}>
        {labels.shareWhatsApp}
      </button>
      <button type="button" className={buttonClass} onClick={shareEmail}>
        {labels.shareEmail}
      </button>
      <button type="button" className={buttonClass} onClick={copyLink}>
        {copied ? labels.shareCopied : labels.shareCopy}
      </button>
    </div>
  );
}
