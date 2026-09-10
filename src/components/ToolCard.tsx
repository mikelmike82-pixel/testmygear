import Link from "next/link";
import { ToolMeta } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:border-[var(--color-accent2)]/60 hover:-translate-y-0.5 transition"
    >
      <ToolIcon slug={tool.slug} size={44} className="mb-3" />
      <h3 className="font-semibold text-[var(--color-ink)]">{tool.name}</h3>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{tool.tagline}</p>
      <span className="mt-3 inline-block text-sm text-[var(--color-accent2)]">
        Run test &rarr;
      </span>
    </Link>
  );
}
