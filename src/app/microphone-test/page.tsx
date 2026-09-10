import ToolShell from "@/components/ToolShell";
import MicrophoneTestWidget from "@/components/tools/MicrophoneTestWidget";
import FAQ, { QA } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";

const TITLE = "Microphone Test — Check Your Mic Online";
const DESCRIPTION =
  "Test your microphone right in your browser with a live volume meter. Confirm you'll be heard clearly before a call or recording — free, no download.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/microphone-test",
});

const faqItems: QA[] = [
  {
    q: "Is my voice recorded or sent anywhere?",
    a: "No. Audio is analyzed only to draw the level meter in your browser — nothing is recorded, saved, or transmitted anywhere.",
  },
  {
    q: "Why is there a delay between speaking and the bar moving?",
    a: "There shouldn't be a noticeable one under normal conditions. A significant delay usually points to a slow device or too many other tabs and applications competing for resources.",
  },
  {
    q: "Can this test tell me if I sound clear, not just loud?",
    a: "Not directly — a level meter measures volume, not audio quality. For clarity issues like background noise or a muffled sound, try a quick voice recording and listen back to it, or ask someone on a call to confirm.",
  },
];

export default function MicrophoneTestPage() {
  return (
    <>
      <JsonLd data={toolSchema({ name: TITLE, description: DESCRIPTION, path: "/microphone-test" })} />
      <JsonLd data={faqSchema(faqItems)} />
      <ToolShell
      slug="microphone-test"
      title="Microphone Test"
      tagline="Speak normally and watch the level meter to confirm your mic is picking up your voice."
    >
      <MicrophoneTestWidget />

      <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">
          What a healthy level looks like
        </h2>
        <p>
          Speaking at a normal conversational volume should move the bar to
          somewhere around the middle — comfortably above zero, but not
          slammed all the way to the end. If the bar barely moves even when
          you speak up, your input volume is likely too low. If it&rsquo;s
          pinned near the maximum on quiet speech, it&rsquo;s probably set
          too high and may sound distorted to others.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          If the bar isn&rsquo;t moving at all
        </h2>
        <p>
          Double-check you picked the right microphone in the device list if
          you have more than one connected — it&rsquo;s common for a laptop
          to default to its built-in mic even with a headset plugged in.
          Also check for a physical mute switch or button on a headset or
          webcam, which cuts the signal before it ever reaches your browser.
        </p>
      </section>

      <FAQ items={faqItems} />
      </ToolShell>
    </>
  );
}
