import Link from "next/link";
import { tools } from "@/data/tools";
import Logo from "@/components/Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16 bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        <div className="col-span-2 sm:col-span-1">
          <Logo size={24} className="mb-2" />
          <p className="text-[var(--color-ink-soft)]">
            Free browser-based tools to check your hardware actually works.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Tools</p>
          <ul className="space-y-1 text-[var(--color-ink-soft)]">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="hover:text-[var(--color-accent2)]">
                  {t.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Site</p>
          <ul className="space-y-1 text-[var(--color-ink-soft)]">
            <li>
              <Link href="/about" className="hover:text-[var(--color-accent2)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[var(--color-accent2)]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-accent2)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-ink-soft)] space-y-1">
        <p>
          &copy; {new Date().getFullYear()} TestMyGear. All tests run locally
          in your browser — nothing you type, click, or record is uploaded.
        </p>
        <p>
          This site is developed by{" "}
          <a
            href="https://iaperma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent2)] underline underline-offset-2"
          >
            iaperma.com
          </a>{" "}
          software company.
        </p>
      </div>
    </footer>
  );
}
