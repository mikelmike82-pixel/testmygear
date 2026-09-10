"use client";

import { useEffect, useRef, useState } from "react";

const DURATIONS = [1, 5, 10, 60];

function rating(cps: number): string {
  if (cps >= 10) return "Elite — top-tier clicking speed";
  if (cps >= 7) return "Excellent — well above average";
  if (cps >= 5) return "Good — above the typical average";
  if (cps >= 3) return "Average — typical for a casual clicker";
  return "Below average — most people click faster with practice";
}

export default function CpsTestWidget() {
  const [duration, setDuration] = useState(5);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const startRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function reset(newDuration = duration) {
    setStatus("idle");
    setClicks(0);
    setTimeLeft(newDuration);
    startRef.current = null;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function handleClick() {
    if (status === "done") return;

    if (status === "idle") {
      setStatus("running");
      startRef.current = Date.now();
      setClicks(1);
      setTimeLeft(duration);

      timeoutRef.current = setTimeout(() => {
        setStatus("done");
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, duration * 1000);

      intervalRef.current = setInterval(() => {
        if (!startRef.current) return;
        const elapsed = (Date.now() - startRef.current) / 1000;
        setTimeLeft(Math.max(0, duration - elapsed));
      }, 50);
    } else if (status === "running") {
      setClicks((c) => c + 1);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const cps = status === "done" ? clicks / duration : null;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => {
              setDuration(d);
              reset(d);
            }}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              duration === d
                ? "bg-[var(--color-accent2)] text-black border-[var(--color-accent2)] font-medium"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent2)]/50"
            }`}
          >
            {d}s
          </button>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full aspect-[2/1] max-h-72 rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-card)] flex flex-col items-center justify-center select-none active:scale-[0.99] transition"
      >
        {status === "idle" && (
          <>
            <span className="text-2xl font-semibold">Click to start</span>
            <span className="mt-1 text-sm text-[var(--color-ink-soft)]">
              Timer starts on your first click
            </span>
          </>
        )}
        {status === "running" && (
          <>
            <span className="text-6xl font-bold font-mono-text tabular-nums">
              {clicks}
            </span>
            <span className="mt-2 text-[var(--color-accent2)] font-mono-text">
              {timeLeft.toFixed(1)}s left
            </span>
          </>
        )}
        {status === "done" && cps !== null && (
          <>
            <span className="text-5xl font-bold font-mono-text">
              {cps.toFixed(2)} CPS
            </span>
            <span className="mt-2 text-sm text-[var(--color-ink-soft)]">
              {clicks} clicks in {duration}s
            </span>
          </>
        )}
      </button>

      {status === "done" && cps !== null && (
        <div className="mt-4 text-center">
          <p className="text-[var(--color-ok)] font-medium">{rating(cps)}</p>
          <button
            onClick={() => reset()}
            className="mt-3 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm hover:opacity-90 transition"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
