type ToolIconProps = {
  slug: string;
  /** Size of the badge (square) — a pixel number, or a CSS size like "100%" to fill a parent. */
  size?: number | string;
  className?: string;
};

/**
 * Small hand-drawn line-art pictogram for each tool, inside a rounded
 * gradient badge matching the site logo (see Logo.tsx). Replaces the
 * emoji icons that used to sit on tool cards and tool pages.
 */
export default function ToolIcon({ slug, size = 40, className }: ToolIconProps) {
  const gradientId = `tool-icon-grad-${slug}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6d5ef1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={`url(#${gradientId})`} />
      <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {slug === "cps-test" && (
          <>
            <path d="M22 26c0-6 4.5-10 10-10s10 4 10 10v16c0 6-4.5 8-10 8s-10-2-10-8V26z" />
            <line x1="32" y1="16" x2="32" y2="24" />
            <rect x="29.5" y="18" width="5" height="7" rx="2.5" fill="white" stroke="none" />
          </>
        )}

        {slug === "keyboard-tester" && (
          <>
            <rect x="13" y="21" width="38" height="23" rx="4" />
            <rect x="18.5" y="27" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="26" y="27" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="33.5" y="27" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="41" y="27" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="18.5" y="34" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="26" y="34" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="33.5" y="34" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="41" y="34" width="4" height="4" rx="1" fill="white" stroke="none" />
            <rect x="18.5" y="40.5" width="26.5" height="3" rx="1.5" fill="white" stroke="none" />
          </>
        )}

        {slug === "dead-pixel-test" && (
          <>
            <rect x="13" y="14" width="38" height="25" rx="3" />
            <rect x="23.5" y="23" width="5" height="5" fill="#f97066" stroke="none" />
            <rect x="29.5" y="23" width="5" height="5" fill="#34d399" stroke="none" />
            <rect x="35.5" y="23" width="5" height="5" fill="#60a5fa" stroke="none" />
            <line x1="32" y1="39" x2="32" y2="45" />
            <line x1="24" y1="48" x2="40" y2="48" />
          </>
        )}

        {slug === "webcam-test" && (
          <>
            <rect x="13" y="22" width="38" height="22" rx="4" />
            <rect x="21" y="16" width="10" height="6" rx="2" />
            <circle cx="32" cy="33" r="7.5" />
            <circle cx="32" cy="33" r="2.2" fill="white" stroke="none" />
          </>
        )}

        {slug === "microphone-test" && (
          <>
            <rect x="26" y="10" width="12" height="20" rx="6" />
            <path d="M20 26v2a12 12 0 0 0 24 0v-2" />
            <line x1="32" y1="40" x2="32" y2="46" />
            <line x1="24" y1="46" x2="40" y2="46" />
          </>
        )}

        {slug === "gamepad-tester" && (
          <>
            <rect x="12" y="23" width="40" height="20" rx="10" />
            <line x1="20.5" y1="33" x2="27.5" y2="33" strokeWidth="2.5" />
            <line x1="24" y1="29.5" x2="24" y2="36.5" strokeWidth="2.5" />
            <circle cx="40.5" cy="29.5" r="2" fill="white" stroke="none" />
            <circle cx="36.5" cy="33.5" r="2" fill="white" stroke="none" />
            <circle cx="44.5" cy="33.5" r="2" fill="white" stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}
