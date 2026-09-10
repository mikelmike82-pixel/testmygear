"use client";

import { useEffect, useState } from "react";

const COLORS: { name: string; hex: string }[] = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#ff0000" },
  { name: "Green", hex: "#00ff00" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Gray", hex: "#808080" },
];

export default function DeadPixelTestWidget() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  function start() {
    setIndex(0);
    setActive(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }

  function stop() {
    setActive(false);
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  function next() {
    setIndex((i) => (i + 1) % COLORS.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + COLORS.length) % COLORS.length);
  }

  useEffect(() => {
    if (!active) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") stop();
      else if (e.key === "ArrowRight" || e.key === " ") next();
      else if (e.key === "ArrowLeft") prev();
    }
    function onFullscreenChange() {
      if (!document.fullscreenElement) setActive(false);
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const current = COLORS[index];
  const isDark = current.hex === "#000000" || current.hex === "#0000ff";

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {COLORS.map((c) => (
          <div
            key={c.hex}
            className="aspect-square rounded-lg border border-[var(--color-border)]"
            style={{ backgroundColor: c.hex }}
            title={c.name}
          />
        ))}
      </div>

      <button
        onClick={start}
        className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition"
      >
        Start Full-Screen Test
      </button>
      <p className="mt-2 text-center text-xs text-[var(--color-ink-soft)]">
        Click or press the arrow keys to move between colors. Press Escape
        to exit at any time.
      </p>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center cursor-pointer"
          style={{ backgroundColor: current.hex }}
          onClick={next}
        >
          <div
            className={`mb-8 px-4 py-2 rounded-full text-sm ${
              isDark ? "bg-white/15 text-white" : "bg-black/15 text-black"
            }`}
          >
            {current.name} &middot; {index + 1} / {COLORS.length} &middot;
            click or press space for next &middot; Esc to exit
          </div>
        </div>
      )}
    </div>
  );
}
