"use client";

import { useEffect, useRef, useState } from "react";

const BUTTON_LABELS = [
  "A",
  "B",
  "X",
  "Y",
  "LB",
  "RB",
  "LT",
  "RT",
  "Back",
  "Start",
  "L3",
  "R3",
  "D-Up",
  "D-Down",
  "D-Left",
  "D-Right",
  "Home",
];

interface Snapshot {
  connected: boolean;
  id: string;
  buttons: { pressed: boolean; value: number }[];
  axes: number[];
}

function readGamepad(): Snapshot | null {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const pad of pads) {
    if (pad) {
      return {
        connected: true,
        id: pad.id,
        buttons: pad.buttons.map((b) => ({ pressed: b.pressed, value: b.value })),
        axes: [...pad.axes],
      };
    }
  }
  return null;
}

function StickPad({
  label,
  x,
  y,
}: {
  label: string;
  x: number;
  y: number;
}) {
  const drifting = Math.abs(x) > 0.08 || Math.abs(y) > 0.08;
  return (
    <div className="text-center">
      <p className="text-sm text-[var(--color-ink-soft)] mb-2">{label}</p>
      <div className="relative w-28 h-28 mx-auto rounded-full border border-[var(--color-border)] bg-[var(--color-card)]">
        <div
          className="absolute w-4 h-4 rounded-full bg-[var(--color-accent2)] -translate-x-1/2 -translate-y-1/2 transition-transform"
          style={{
            left: `${50 + x * 40}%`,
            top: `${50 + y * 40}%`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>
      <p
        className={`mt-2 text-xs font-mono-text ${
          drifting ? "text-[var(--color-warn)]" : "text-[var(--color-ink-soft)]"
        }`}
      >
        x: {x.toFixed(2)} &nbsp; y: {y.toFixed(2)}
        {drifting && " ⚠ off-center"}
      </p>
    </div>
  );
}

export default function GamepadTesterWidget() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function loop() {
      setSnapshot(readGamepad());
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!snapshot || !snapshot.connected) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
        <p className="text-lg font-medium">No controller detected</p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Connect a controller (USB or Bluetooth) and press any button on
          it — most browsers only detect a gamepad after it sends its first
          input.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-center text-sm text-[var(--color-ink-soft)] mb-6 font-mono-text truncate">
        {snapshot.id}
      </p>

      <div className="flex justify-center gap-10 mb-8">
        <StickPad
          label="Left Stick"
          x={snapshot.axes[0] ?? 0}
          y={snapshot.axes[1] ?? 0}
        />
        <StickPad
          label="Right Stick"
          x={snapshot.axes[2] ?? 0}
          y={snapshot.axes[3] ?? 0}
        />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {snapshot.buttons.map((b, i) => (
          <div
            key={i}
            className={`rounded-lg border py-2 text-center text-xs transition-colors ${
              b.pressed
                ? "bg-[var(--color-accent2)] border-[var(--color-accent2)] text-black font-medium"
                : "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-ink-soft)]"
            }`}
          >
            <div>{BUTTON_LABELS[i] ?? `#${i}`}</div>
            {b.value > 0 && b.value < 1 && (
              <div className="font-mono-text opacity-80">
                {(b.value * 100).toFixed(0)}%
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-[var(--color-ink-soft)] text-center">
        For a drift check, let go of both sticks completely — the readouts
        above should settle at x: 0.00, y: 0.00. If a stick shows a
        persistent offset while untouched, it likely has drift.
      </p>
    </div>
  );
}
