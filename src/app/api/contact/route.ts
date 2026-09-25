import { Resend } from "resend";
import { getTours } from "@/lib/content";
import { isLocale } from "@/i18n/locales";

export const runtime = "nodejs";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (str(body.website)) {
    return Response.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const preferredDates = str(body.preferredDates);
  const people = str(body.people);
  const tourSlug = str(body.tourSlug);
  const message = str(body.message);

  if (!name || !email || !preferredDates || !people || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!emailOk.test(email) || name.length > 200 || message.length > 8000) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }

  const locale = str(body.locale);
  const tours = getTours(isLocale(locale) ? locale : "nl");
  const tourTitle = tours.find((t) => t.slug === tourSlug)?.title ?? (tourSlug || "Not specified");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Shikoku Walks <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return Response.json({ error: "Email is not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Shikoku inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Preferred dates: ${preferredDates}`,
      `People: ${people}`,
      `Tour: ${tourTitle}`,
      tourSlug ? `Tour slug: ${tourSlug}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error(error);
    return Response.json({ error: "Send failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
