import ToolShell from "@/components/ToolShell";
import DeadPixelTestWidget from "@/components/tools/DeadPixelTestWidget";
import FAQ, { QA } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";

const TITLE = "Dead Pixel Test — Check Your Screen for Dead or Stuck Pixels";
const DESCRIPTION =
  "Free full-screen dead pixel test. Cycle through solid colors to spot dead or stuck pixels on any monitor, laptop, or phone screen.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/dead-pixel-test",
});

const faqItems: QA[] = [
  {
    q: "Why does the test go full-screen?",
    a: "A dead or stuck pixel is often just one dot among millions — full-screen solid colors remove every other visual distraction so a single mismatched pixel actually stands out.",
  },
  {
    q: "Can this test damage my screen?",
    a: "No. It only displays solid colors, the same as any other image or video your screen already shows.",
  },
  {
    q: "Does this work on phones and tablets?",
    a: "Yes — open this page in your phone or tablet's browser and run the test the same way. Full-screen mode may behave slightly differently depending on your browser.",
  },
  {
    q: "I see a colored dot only sometimes — is that still a stuck pixel?",
    a: "Possibly. If it appears in the same physical spot on screen regardless of what's actually being displayed there, that's consistent with a stuck or dead pixel rather than something in the image itself.",
  },
];

export default function DeadPixelTestPage() {
  return (
    <>
      <JsonLd data={toolSchema({ name: TITLE, description: DESCRIPTION, path: "/dead-pixel-test" })} />
      <JsonLd data={faqSchema(faqItems)} />
      <ToolShell
      slug="dead-pixel-test"
      title="Dead Pixel Test"
      tagline="Cycle through solid colors full-screen to spot pixels that don't match everything around them."
    >
      <DeadPixelTestWidget />

      <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">
          Dead pixel vs. stuck pixel — what&rsquo;s the difference?
        </h2>
        <p>
          A <strong className="text-[var(--color-ink)]">dead pixel</strong> is
          permanently off — it shows up as a black dot no matter what color
          the rest of the screen is displaying. A{" "}
          <strong className="text-[var(--color-ink)]">stuck pixel</strong> is
          different: it&rsquo;s frozen showing a single color (often red,
          green, or blue) instead of changing with the image behind it.
          Stuck pixels can sometimes be fixed; dead pixels generally
          can&rsquo;t.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          How to run the test properly
        </h2>
        <p>
          Clean your screen first — a speck of dust or a smudge is very easy
          to mistake for a stuck pixel. Dim the room if you can, since a
          dark room makes both dead and stuck pixels much easier to spot,
          especially against the black and white screens. Step through each
          color slowly and look closely, ideally from a few different
          angles.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          If you find one
        </h2>
        <p>
          Many manufacturers replace a screen with even a single dead pixel
          within the warranty period, though policies vary — some only
          cover a certain number of pixels or a specific screen region.
          Check your warranty terms before attempting anything else. Gently
          massaging a stuck pixel is a commonly suggested fix, but it
          carries a real risk of damaging the screen if done with too much
          pressure — approach it carefully, and know that it doesn&rsquo;t
          always work.
        </p>
      </section>

      <FAQ items={faqItems} />
      </ToolShell>
    </>
  );
}
