import ToolShell from "@/components/ToolShell";
import CpsTestWidget from "@/components/tools/CpsTestWidget";
import FAQ, { QA } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";

const TITLE = "CPS Test — Click Speed Test (Clicks Per Second)";
const DESCRIPTION =
  "Test how many clicks per second (CPS) you can do. Choose a 1, 5, 10, or 60 second timer and see your rating instantly, free, no download.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/cps-test",
});

const faqItems: QA[] = [
  {
    q: "Why does my result change every time I retake the test?",
    a: "Small variation is normal — human muscle timing naturally fluctuates. Run the test a few times and look at your average, rather than treating one attempt as definitive.",
  },
  {
    q: "Does my mouse affect my CPS?",
    a: "Yes. Cheaper or older switches can have debounce delay that filters out very fast repeated clicks, while mice built for gaming often use switches rated for faster, more consistent actuation.",
  },
  {
    q: "Is a higher CPS always better?",
    a: "Only in specific contexts, like certain PvP game mechanics. For most everyday use and most games, consistent, accurate clicking matters far more than raw speed.",
  },
  {
    q: "Does this test track or save my results?",
    a: "No. Everything happens locally in your browser tab — nothing is recorded, stored, or sent anywhere.",
  },
];

export default function CpsTestPage() {
  return (
    <>
      <JsonLd data={toolSchema({ name: TITLE, description: DESCRIPTION, path: "/cps-test" })} />
      <JsonLd data={faqSchema(faqItems)} />
      <ToolShell
        slug="cps-test"
        title="CPS Test"
        tagline="How many clicks per second can you do? Pick a timer and find out."
      >
        <CpsTestWidget />

        <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">
            What is a CPS test?
          </h2>
          <p>
            CPS stands for clicks per second — a simple measure of how fast
            you can click a mouse button in a fixed window of time. It&rsquo;s
            most often used by gamers, particularly in games where rapid
            clicking (like Minecraft PvP) rewards faster input, but it&rsquo;s
            also a reasonable quick check that a new mouse&rsquo;s button is
            registering clicks reliably and consistently.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
            Average clicking speed
          </h2>
          <p>
            Most people click at roughly 4–6 clicks per second using a normal,
            relaxed clicking motion. Trained or practiced clickers using
            specific techniques can reach considerably higher rates:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mt-2">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-ink)]">
                  <th className="py-2 pr-4">Technique</th>
                  <th className="py-2 pr-4">Typical CPS</th>
                  <th className="py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-2 pr-4">Regular clicking</td>
                  <td className="py-2 pr-4">4–6</td>
                  <td className="py-2">One finger, relaxed pace</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-2 pr-4">Jitter clicking</td>
                  <td className="py-2 pr-4">8–14</td>
                  <td className="py-2">
                    Tensing the forearm to vibrate the finger — tiring to
                    sustain
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-2 pr-4">Butterfly clicking</td>
                  <td className="py-2 pr-4">10–20+</td>
                  <td className="py-2">
                    Alternating two fingers on the same button
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Drag clicking</td>
                  <td className="py-2 pr-4">15–30+</td>
                  <td className="py-2">
                    Dragging a finger across the button&rsquo;s surface — works
                    best on specific mouse switch types
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A quick note on higher-speed techniques: they put more repetitive
            strain on your fingers and wrist than normal clicking. If
            you&rsquo;re practicing them for gaming, take breaks and stop if
            you feel any discomfort.
          </p>
        </section>

        <FAQ items={faqItems} />
      </ToolShell>
    </>
  );
}
