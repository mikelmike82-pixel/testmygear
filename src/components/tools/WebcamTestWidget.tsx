"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "requesting" | "active" | "denied" | "no-device" | "error";

export default function WebcamTestWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const [mirror, setMirror] = useState(true);

  async function startStream(deviceId?: string) {
    setStatus("requesting");
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      setResolution(
        settings.width && settings.height
          ? `${settings.width} × ${settings.height}${
              settings.frameRate ? ` @ ${Math.round(settings.frameRate)}fps` : ""
            }`
          : ""
      );

      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === "videoinput");
      setDevices(videoInputs);
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
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div>
      {status === "idle" && (
        <button
          onClick={() => startStream()}
          className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition"
        >
          Turn On Camera
        </button>
      )}

      {status === "requesting" && (
        <div className="py-10 text-center text-[var(--color-ink-soft)]">
          Waiting for camera permission&hellip;
        </div>
      )}

      {status === "denied" && (
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 p-5 text-sm">
          <p className="font-medium text-[var(--color-warn)]">
            Camera access was blocked
          </p>
          <p className="mt-1 text-[var(--color-ink-soft)]">
            Click the camera icon in your browser&rsquo;s address bar and
            allow access, then try again.
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
          No camera was found on this device.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 p-5 text-sm text-[var(--color-ink-soft)]">
          Something went wrong trying to access your camera. Try reloading
          the page.
        </div>
      )}

      {status === "active" && (
        <div>
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ transform: mirror ? "scaleX(-1)" : undefined }}
              className="w-full aspect-video object-cover"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="text-[var(--color-ink-soft)] font-mono-text">
              {resolution}
            </span>
            <button
              onClick={() => setMirror((m) => !m)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent2)]/50 transition"
            >
              {mirror ? "Mirrored" : "Not mirrored"} — toggle
            </button>
          </div>

          {devices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => startStream(e.target.value)}
              className="mt-3 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm"
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || "Camera"}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}
