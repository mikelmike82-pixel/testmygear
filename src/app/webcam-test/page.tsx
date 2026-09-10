import ToolShell from "@/components/ToolShell";
import WebcamTestWidget from "@/components/tools/WebcamTestWidget";
import FAQ, { QA } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";

const TITLE = "Webcam Test — Check Your Camera Online";
const DESCRIPTION =
  "Test your webcam right in your browser before a call or stream. See a live preview, resolution, and switch between cameras — free, no download.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/webcam-test",
});

const faqItems: QA[] = [
  {
    q: "Why do I look flipped compared to a photo of myself?",
    a: "This preview mirrors your camera by default, the same way a mirror or most video call apps do, since that feels more natural while looking at yourself. You can turn mirroring off with the toggle above the preview.",
  },
  {
    q: "Is my video sent anywhere or recorded?",
    a: "No. The video feed only ever exists inside your own browser tab, displayed back to you — nothing is uploaded, streamed, or saved.",
  },
  {
    q: "I have two cameras — how do I test the other one?",
    a: "Once your camera is on, a dropdown appears below the preview listing every camera your browser can see. Pick the other one from that list.",
  },
];

export default function WebcamTestPage() {
  return (
    <>
      <JsonLd data={toolSchema({ name: TITLE, description: DESCRIPTION, path: "/webcam-test" })} />
      <JsonLd data={faqSchema(faqItems)} />
      <ToolShell
      slug="webcam-test"
      title="Webcam Test"
      tagline="Check your camera works, see its live resolution, and switch devices if you have more than one."
    >
      <WebcamTestWidget />

      <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">
          What to check before a call
        </h2>
        <p>
          Beyond just seeing yourself, look at three things: is the image
          sharp and not blurry, is the lighting reasonable (too dark is the
          most common video-call complaint), and does the resolution shown
          above look right for your camera&rsquo;s advertised specs. A 1080p
          webcam reporting 640 × 480 usually means an app or driver setting
          is capping the quality somewhere.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          If your camera doesn&rsquo;t show up
        </h2>
        <p>
          Most often this is a permissions issue rather than a hardware
          fault — check that your browser has camera access allowed for
          this site, and that no other application (a video call already in
          progress, for instance) currently has exclusive control of the
          camera. On a laptop, also check for a physical privacy shutter or
          a function-key camera toggle.
        </p>
      </section>

      <FAQ items={faqItems} />
      </ToolShell>
    </>
  );
}
