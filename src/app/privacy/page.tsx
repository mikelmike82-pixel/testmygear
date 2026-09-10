import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-[var(--color-ink-soft)] leading-relaxed">
        This site does not currently collect personal information or run
        advertising. Camera and microphone access, where used, happens
        entirely inside your own browser and is never transmitted or
        stored. A full privacy policy will be published here before ads are
        introduced.
      </p>
    </div>
  );
}
