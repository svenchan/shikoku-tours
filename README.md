# Shikoku Walks

Marketing and inquiry site for an independent Shikoku tour guide. English and Dutch. No live booking, payments, CMS, or database.

## Stack

Next.js (App Router) · Tailwind CSS · Resend · Vercel Analytics

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Bare paths redirect to `/en` or `/nl` from `Accept-Language`.

## Environment

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sending key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Guide inbox for inquiries |
| `CONTACT_FROM_EMAIL` | Verified Resend from-address |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap and Open Graph |

Without Resend configured, the contact form returns HTTP 503.

## Content

Edit files in `content/` and redeploy:

- `content/[en|nl]/site.json` — brand copy, nav, page chrome
- `content/[en|nl]/tours.json` — tours (`slug` must match across locales)
- `content/[en|nl]/faq.json`
- `content/[en|nl]/reviews.json`
- `content/availability.json` — `"YYYY-MM-DD": "available" | "booked" | "unavailable"`

**Unlisted dates default to unavailable.** Mark both open days (`available`) and taken days (`booked`) explicitly. Grey days on the calendar are off.

## Deploy

Push to GitHub and import the repo in Vercel. Set the environment variables above, including a production `NEXT_PUBLIC_SITE_URL`.
