export const locales = ["nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
