import { ReactNode } from "react";
import ToolIcon from "@/components/ToolIcon";

export default function ToolShell({
  slug,
  title,
  tagline,
  children,
}: {
  slug?: string;
  title: string;
  tagline: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        {slug && <ToolIcon slug={slug} size={52} className="mx-auto mb-4" />}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">{tagline}</p>
      </div>
      {children}
    </div>
  );
}
