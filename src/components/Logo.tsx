type LogoProps = {
  /** Pixel size of the icon mark (square). */
  size?: number;
  /** Whether to render the "TestMyGear" wordmark next to the icon. */
  showText?: boolean;
  className?: string;
};

/**
 * TestMyGear logo: a rounded badge with a checkmark (verified / working
 * gear), in the site's purple-to-cyan brand gradient, optionally paired
 * with the text wordmark. Used in the header, footer, and as the base for
 * the favicon/app icon (see src/app/icon.svg, which mirrors this mark).
 */
export default function Logo({ size = 28, showText = true, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tmg-logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6d5ef1" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#tmg-logo-gradient)" />
        <path
          d="M18 34 L27 43 L46 21"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showText && (
        <span className="font-semibold text-lg tracking-tight whitespace-nowrap">
          TestMyGear
        </span>
      )}
    </span>
  );
}
