import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import KeyboardTesterWidget from "@/components/tools/KeyboardTesterWidget";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Keyboard Tester — Check Every Key Online",
  description:
    "Test your keyboard online. Press any key to see it highlight on a virtual keyboard, plus its key code — free, no download required.",
};

export default function KeyboardTesterPage() {
  return (
    <ToolShell
      slug="keyboard-tester"
      title="Keyboard Tester"
      tagline="Press any key on your keyboard — it'll light up below if it's registering correctly."
    >
      <KeyboardTesterWidget />

      <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">
          How to use this keyboard tester
        </h2>
        <p>
          Press every key on your physical keyboard one at a time. Each key
          turns bright while held down, then stays a different color once
          released, so you can work through the whole board and see at a
          glance which keys you&rsquo;ve already checked and which you
          haven&rsquo;t reached yet.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          What this test can and can&rsquo;t catch
        </h2>
        <p>
          This confirms your browser is receiving a signal for each key,
          which covers the most common problems — a key that&rsquo;s
          physically stuck, unresponsive, or wired incorrectly. It won&rsquo;t
          catch every hardware issue, though: some keyboards drop input only
          under specific multi-key combinations (a rollover or
          &ldquo;ghosting&rdquo; limitation), which shows up when you hold
          several keys at once rather than one at a time.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          Testing for ghosting and rollover
        </h2>
        <p>
          Try holding down three or more keys in a cluster at the same time
          (for example, in a common gaming combination like W, A, and
          Space). If one of them stops registering only when the others are
          also held, your keyboard has a rollover limit at that key
          combination — common on cheaper membrane keyboards, and much
          rarer on keyboards built for gaming with full N-key rollover.
        </p>
      </section>

      <FAQ
        items={[
          {
            q: "Why does a key not light up even though I pressed it?",
            a: "Click anywhere on this page first so your browser tab has focus — a keyboard test can't detect key presses if a different tab or window is focused. If it still doesn't register, that key may not be sending a signal to your computer at all.",
          },
          {
            q: "Does this work with laptop keyboards?",
            a: "Yes — this reads standard keyboard input, so it works the same way for a laptop's built-in keyboard as it does for an external one.",
          },
          {
            q: "Some keys aren't on the diagram — can I still test them?",
            a: "This layout covers the standard main keyboard area. Keys outside it, like a numpad or dedicated media keys, will still show up in the \"last key pressed\" readout above the diagram even though they're not drawn on it.",
          },
          {
            q: "Is my keyboard input recorded anywhere?",
            a: "No. Key presses are only used to update what's on this page in your browser — nothing is logged, stored, or sent anywhere.",
          },
        ]}
      />
    </ToolShell>
  );
}
