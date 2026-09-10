"use client";

import { useEffect, useState } from "react";

interface KeyDef {
  label: string;
  code: string;
  width?: number;
}

const ROWS: KeyDef[][] = [
  [
    { label: "Esc", code: "Escape" },
    { label: "F1", code: "F1" },
    { label: "F2", code: "F2" },
    { label: "F3", code: "F3" },
    { label: "F4", code: "F4" },
    { label: "F5", code: "F5" },
    { label: "F6", code: "F6" },
    { label: "F7", code: "F7" },
    { label: "F8", code: "F8" },
    { label: "F9", code: "F9" },
    { label: "F10", code: "F10" },
    { label: "F11", code: "F11" },
    { label: "F12", code: "F12" },
  ],
  [
    { label: "`", code: "Backquote" },
    { label: "1", code: "Digit1" },
    { label: "2", code: "Digit2" },
    { label: "3", code: "Digit3" },
    { label: "4", code: "Digit4" },
    { label: "5", code: "Digit5" },
    { label: "6", code: "Digit6" },
    { label: "7", code: "Digit7" },
    { label: "8", code: "Digit8" },
    { label: "9", code: "Digit9" },
    { label: "0", code: "Digit0" },
    { label: "-", code: "Minus" },
    { label: "=", code: "Equal" },
    { label: "Backspace", code: "Backspace", width: 2 },
  ],
  [
    { label: "Tab", code: "Tab", width: 1.5 },
    { label: "Q", code: "KeyQ" },
    { label: "W", code: "KeyW" },
    { label: "E", code: "KeyE" },
    { label: "R", code: "KeyR" },
    { label: "T", code: "KeyT" },
    { label: "Y", code: "KeyY" },
    { label: "U", code: "KeyU" },
    { label: "I", code: "KeyI" },
    { label: "O", code: "KeyO" },
    { label: "P", code: "KeyP" },
    { label: "[", code: "BracketLeft" },
    { label: "]", code: "BracketRight" },
    { label: "\\", code: "Backslash", width: 1.5 },
  ],
  [
    { label: "Caps", code: "CapsLock", width: 1.75 },
    { label: "A", code: "KeyA" },
    { label: "S", code: "KeyS" },
    { label: "D", code: "KeyD" },
    { label: "F", code: "KeyF" },
    { label: "G", code: "KeyG" },
    { label: "H", code: "KeyH" },
    { label: "J", code: "KeyJ" },
    { label: "K", code: "KeyK" },
    { label: "L", code: "KeyL" },
    { label: ";", code: "Semicolon" },
    { label: "'", code: "Quote" },
    { label: "Enter", code: "Enter", width: 2 },
  ],
  [
    { label: "Shift", code: "ShiftLeft", width: 2.25 },
    { label: "Z", code: "KeyZ" },
    { label: "X", code: "KeyX" },
    { label: "C", code: "KeyC" },
    { label: "V", code: "KeyV" },
    { label: "B", code: "KeyB" },
    { label: "N", code: "KeyN" },
    { label: "M", code: "KeyM" },
    { label: ",", code: "Comma" },
    { label: ".", code: "Period" },
    { label: "/", code: "Slash" },
    { label: "Shift", code: "ShiftRight", width: 2.25 },
  ],
  [
    { label: "Ctrl", code: "ControlLeft", width: 1.5 },
    { label: "Win", code: "MetaLeft", width: 1.5 },
    { label: "Alt", code: "AltLeft", width: 1.5 },
    { label: "Space", code: "Space", width: 6 },
    { label: "Alt", code: "AltRight", width: 1.5 },
    { label: "Win", code: "MetaRight", width: 1.5 },
    { label: "Ctrl", code: "ControlRight", width: 1.5 },
  ],
];

export default function KeyboardTesterWidget() {
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [lastKey, setLastKey] = useState<{
    key: string;
    code: string;
    keyCode: number;
  } | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Tab") e.preventDefault();
      setPressed((prev) => new Set(prev).add(e.code));
      setLastKey({ key: e.key, code: e.code, keyCode: e.keyCode });
    }
    function onKeyUp(e: KeyboardEvent) {
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      setTested((prev) => new Set(prev).add(e.code));
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const totalKeys = ROWS.flat().length;

  function keyClass(code: string) {
    if (pressed.has(code)) return "bg-[var(--color-accent2)] border-[var(--color-accent2)] text-black";
    if (tested.has(code)) return "bg-[var(--color-ok)]/20 border-[var(--color-ok)] text-[var(--color-ok)]";
    return "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-ink-soft)]";
  }

  return (
    <div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-3 mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-[var(--color-ink-soft)]">
          {lastKey ? (
            <>
              Last key:{" "}
              <span className="font-mono-text text-[var(--color-ink)]">
                {lastKey.key === " " ? "Space" : lastKey.key}
              </span>{" "}
              (code: <span className="font-mono-text">{lastKey.code}</span>,
              keyCode: <span className="font-mono-text">{lastKey.keyCode}</span>)
            </>
          ) : (
            "Press any key to begin"
          )}
        </span>
        <span className="text-[var(--color-ink-soft)]">
          {tested.size} / {totalKeys} keys tested
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px] flex flex-col gap-1.5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex gap-1.5">
              {row.map((k) => (
                <div
                  key={k.code}
                  style={{ flex: k.width ?? 1 }}
                  className={`h-11 rounded-md border flex items-center justify-center text-xs font-medium select-none transition-colors ${keyClass(
                    k.code
                  )}`}
                >
                  {k.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setTested(new Set())}
        className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm hover:opacity-90 transition"
      >
        Reset test
      </button>
    </div>
  );
}
