import { tools } from "@/data/tools";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Hero />

      <ToolsGrid tools={tools} />

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">
          Why test your own hardware?
        </h2>
        <div className="space-y-3 text-[var(--color-ink-soft)] leading-relaxed text-sm">
          <p>
            Most of us only find out a key doesn&rsquo;t work, a monitor has
            a dead pixel, or a mic sounds muffled in the middle of a game or
            a call — the worst possible time. A quick check before it
            matters catches the problem while you can still do something
            about it, like returning a new peripheral within its warranty
            window.
          </p>
          <p>
            Every tool here runs entirely in your browser. Nothing you
            type, click, record, or capture is ever sent anywhere — there&rsquo;s
            no server involved, so there&rsquo;s nothing to upload in the
            first place.
          </p>
        </div>
      </section>
    </div>
  );
}
