"use client";

import { motion } from "framer-motion";
import GearIllustration from "@/components/illustrations/GearIllustration";

/**
 * Renders a title where a word wrapped in ~tildes~ gets a hand-drawn
 * underline swipe beneath it, e.g. "Test Your ~Gear~, Right In Your Browser".
 */
function HighlightedTitle({ text }: { text: string }) {
  const parts = text.split(/~/);
  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
      {parts.map((part, index) =>
        index === 1 ? (
          <span key={index} className="relative whitespace-nowrap">
            <span className="relative z-10">{part}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute -bottom-2 left-0 h-3 w-full text-[var(--color-accent2)]"
              preserveAspectRatio="none"
            >
              <path
                d="M203.371.916c-26.013-2.078-76.686 1.98-114.243 8.919-37.556 6.939-78.622 17.103-122.256 28.703-43.633 11.6-4.984 14.306 43.123 7.021 48.107-7.285 93.638-16.096 146.446-17.742 52.808-1.646 105.706 5.429 158.649 14.13 52.943 8.701 105.886 19.342 158.826 29.483 52.94 10.141 52.94 10.141-11.41-19.043C371.18 14.363 322.753 5.488 281.339 2.143 239.925-1.201 203.371.916 203.371.916z"
                fill="currentColor"
              />
            </svg>
          </span>
        ) : (
          part
        ),
      )}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center lg:text-left"
      >
        <HighlightedTitle text="Test Your ~Gear~, Right In Your Browser" />
        <p className="mt-4 text-[var(--color-ink-soft)] max-w-md mx-auto lg:mx-0">
          Free, instant tests for your keyboard, mouse, monitor, webcam,
          microphone, and gamepad. No downloads, no sign-up — everything
          runs locally on your device.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex justify-center"
      >
        <GearIllustration className="w-full max-w-sm h-auto" />
      </motion.div>
    </section>
  );
}
