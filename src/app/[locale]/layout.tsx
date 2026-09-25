import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { locales } from "@/i18n/locales";
import { defaultOgImage, getSite, requireLocale } from "@/lib/content";
import "../globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    metadataBase: new URL(url),
    title: {
      default: `${site.brand} — ${site.tagline}`,
      template: `%s · ${site.brand}`,
    },
    description: site.home.heroLead,
    openGraph: {
      siteName: site.brand,
      locale: "nl_NL",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <Header locale={locale} site={site} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} site={site} />
        <Analytics />
      </body>
    </html>
  );
}
