"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "requesting" | "active" | "denied" | "no-device" | "error";

export default function MicrophoneTestWidget() {
  const [status, setStatus] = useState<Status>("idle");
  const [level, setLevel] = useState(0);
  const [peak, setPeak] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const peakRef = useRef(0);

  function stopAll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
  }

  async function startStream(deviceId?: string) {
    setStatus("requesting");
    try {
      stopAll();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      peakRef.current = 0;

      function tick() {
        analyser.getByteTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sumSquares += v * v;
        }
        const rms = Math.sqrt(sumSquares / data.length);
        const pct = Math.min(100, Math.round(rms * 220));
        setLevel(pct);
        if (pct > peakRef.current) {
          peakRef.current = pct;
          setPeak(pct);
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      tick();

      const track = stream.getAudioTracks()[0];
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices(allDevices.filter((d) => d.kind === "audioinput"));
      setSelectedDeviceId(track.getSettings().deviceId ?? "");

      setStatus("active");
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setStatus("denied");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setStatus("no-device");
      } else {
        setStatus("error");
      }
    }
  }

  useEffect(() => {
    return () => stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status === "idle" && (
        <button
          onClick={() => startStream()}
          className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition"
        >
          Turn On Microphone
        </button>
      )}

      {status === "requesting" && (
        <div className="py-10 text-center text-[var(--color-ink-soft)]">
          Waiting for microphone permission&hellip;
        </div>
      )}

      {status === "denied" && (
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 p-5 text-sm">
          <p className="font-medium text-[var(--color-warn)]">
            Microphone access was blocked
          </p>
          <p className="mt-1 text-[var(--color-ink-soft)]">
            Click the microphone icon in your browser&rsquo;s address bar
            and allow access, then try again.
          </p>
          <button
            onClick={() => startStream()}
            className="mt-3 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {status === "no-device" && (
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 p-5 text-sm text-[var(--color-ink-soft)]">
          No microphone was found on this device.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 p-5 text-sm text-[var(--color-ink-soft)]">
          Something went wrong trying to access your microphone. Try
          reloading the page.
        </div>
      )}

      {status === "active" && (
        <div>
          <p className="text-center text-sm text-[var(--color-ink-soft)] mb-3">
            Say something — the bar below should move as you speak
          </p>
          <div className="h-10 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden relative">
            <div
              className="h-full bg-[var(--color-accent2)] transition-[width] duration-75"
              style={{ width: `${level}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-ok)]"
              style={{ left: `${peak}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-[var(--color-ink-soft)]">
            <span>Live level</span>
            <span>Peak: {peak}%</span>
          </div>

          {devices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => startStream(e.target.value)}
              className="mt-4 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm"
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || "Microphone"}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}
