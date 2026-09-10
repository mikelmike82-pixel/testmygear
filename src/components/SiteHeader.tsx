import Link from "next/link";
import Logo from "@/components/Logo";
import NavDock from "@/components/NavDock";

export default function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <NavDock />
      </div>
    </header>
  );
}
