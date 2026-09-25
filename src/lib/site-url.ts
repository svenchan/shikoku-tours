export function siteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").trim().replace(/\/+$/, "");
  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}
