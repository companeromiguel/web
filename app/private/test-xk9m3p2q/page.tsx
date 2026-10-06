import type { Metadata } from "next";

/* No metadata title/description exposed — keeps this off search engines */
export const metadata: Metadata = {
  title: "Test Page",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function TestPage() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
        fontFamily: "var(--font-inter, sans-serif)",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "inline-block",
          background: "#f59e0b",
          color: "#000",
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.25rem 0.75rem",
          borderRadius: "4px",
        }}
      >
        TEST
      </div>

      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
        }}
      >
        Test Page
      </h1>

      <p
        style={{
          color: "#6b7280",
          margin: 0,
          textAlign: "center",
          maxWidth: "420px",
        }}
      >
        This page is not publicly listed. Only people with this link can access it.
      </p>

      {/* Button — replace the href below with your target URL */}
      <a
        href="https://replace-with-your-link.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          padding: "0.75rem 2rem",
          background: "#1d4ed8",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
          borderRadius: "6px",
          textDecoration: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Open Link
      </a>
    </main>
  );
}
