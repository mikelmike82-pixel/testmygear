import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Why this site exists and how the tools work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">About TestMyGear</h1>
      <div className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed">
        <p>
          Most hardware problems get discovered at the worst possible
          moment — a dead key mid-game, a dead pixel you only notice weeks
          after buying a monitor, a mic that turns out to be muted five
          minutes into a call. TestMyGear is a set of quick, free tools to
          check your keyboard, mouse, screen, webcam, microphone, and
          controller before that happens.
        </p>
        <p>
          Every tool runs entirely in your own browser. There&rsquo;s no
          account, no download, and no server involved — nothing you type,
          click, record, or capture ever leaves your device.
        </p>
      </div>
    </div>
  );
}
