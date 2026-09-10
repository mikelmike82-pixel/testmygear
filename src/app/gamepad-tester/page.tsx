import ToolShell from "@/components/ToolShell";
import GamepadTesterWidget from "@/components/tools/GamepadTesterWidget";
import FAQ, { QA } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, toolSchema, faqSchema } from "@/lib/seo";

const TITLE = "Gamepad Tester — Test Buttons & Check Stick Drift Online";
const DESCRIPTION =
  "Test every button on your Xbox, PlayStation, or PC controller and check your analog sticks for drift — free, right in your browser, no download.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/gamepad-tester",
});

const faqItems: QA[] = [
  {
    q: "Does this work with PlayStation and Xbox controllers?",
    a: "Yes, along with most PC and generic USB or Bluetooth controllers. Button labels above follow the standard Xbox-style layout, so on a PlayStation controller, A/B/X/Y correspond to Cross/Circle/Square/Triangle in the same positions.",
  },
  {
    q: "Only some buttons are labeled correctly — why?",
    a: "Controllers that don't follow the standard browser gamepad mapping may report buttons in a different order. The live pressed/released state is still accurate even if a specific label doesn't match your controller.",
  },
  {
    q: "Can I test two controllers at once?",
    a: "This page currently shows one connected controller at a time — the first one that sends an input. Disconnect or stay idle on the first controller and use the second one to test it separately.",
  },
];

export default function GamepadTesterPage() {
  return (
    <>
      <JsonLd data={toolSchema({ name: TITLE, description: DESCRIPTION, path: "/gamepad-tester" })} />
      <JsonLd data={faqSchema(faqItems)} />
      <ToolShell
      slug="gamepad-tester"
      title="Gamepad Tester"
      tagline="Connect a controller, press every button, and check both sticks for drift."
    >
      <GamepadTesterWidget />

      <section className="mt-12 space-y-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">
          What is stick drift?
        </h2>
        <p>
          Stick drift is when an analog stick registers movement even
          though nothing is touching it — usually from worn-out internal
          components after months or years of use. It shows up in games as
          a character slowly walking or a camera slowly turning on its own.
          The readout under each stick above shows the raw position value;
          if it doesn&rsquo;t settle near zero when you let go, that stick
          has some degree of drift.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          Testing triggers and shoulder buttons
        </h2>
        <p>
          LT and RT (or L2/R2) are usually analog, not just on-or-off — as
          you squeeze one gradually, you should see its percentage climb
          smoothly in the button grid above rather than jumping straight to
          100%. A trigger that jumps erratically or won&rsquo;t reach 100%
          even when fully pressed may need cleaning or, on some
          controllers, isn&rsquo;t user-serviceable at all.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-ink)] pt-2">
          Why won&rsquo;t my controller connect?
        </h2>
        <p>
          Browsers only detect a controller after it sends at least one
          button press or stick movement — simply plugging it in or pairing
          it over Bluetooth usually isn&rsquo;t enough on its own. If
          nothing happens after pressing a button, check that the
          controller works in another app first, and that its batteries
          (for wireless controllers) aren&rsquo;t the issue.
        </p>
      </section>

      <FAQ items={faqItems} />
      </ToolShell>
    </>
  );
}
