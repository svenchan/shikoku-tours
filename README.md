# Shikoku Walks

Marketing and inquiry site for an independent Shikoku tour guide. Dutch only. No live booking, payments, CMS, or database.

## Stack

Next.js (App Router) · Tailwind CSS · Resend · Vercel Analytics

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Bare paths and old `/en` URLs redirect to `/nl`.

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

- `content/nl/site.json` — brand copy, nav, page chrome
- `content/nl/tours.json` — tours
- `content/nl/faq.json`
- `content/nl/reviews.json`
- `content/nl/posts.json` — blog posts

The availability calendar is not public. Its page lives in `src/app/[locale]/_availability/` and `content/availability.json` is unused until that route is restored. Requests to `/availability` redirect to the contact form.

## Deploy

Push to GitHub and import the repo in Vercel. Set the environment variables above, including a production `NEXT_PUBLIC_SITE_URL`.
