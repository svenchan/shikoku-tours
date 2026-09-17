import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f4efe6", color: "#1c241e", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1>Page not found</h1>
        <p>
          <a href="/en">English</a>
          {" · "}
          <a href="/nl">Nederlands</a>
        </p>
      </body>
    </html>
  );
}
