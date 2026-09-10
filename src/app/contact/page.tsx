import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Who built TestMyGear and how the site works.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <div className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed">
        <p>
          TestMyGear is developed by{" "}
          <a
            href="https://iaperma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent2)] underline underline-offset-2"
          >
            iaperma.com
          </a>{" "}
          software company.
        </p>
        <p>
          Every tool on this site runs entirely in your browser — no
          accounts, no server, and nothing you type, click, or record is
          ever uploaded or stored.
        </p>
      </div>
    </div>
  );
}
