/**
 * Hand-drawn hero illustration: a monitor showing a big checkmark (tested
 * & working), with a keyboard and mouse tilted in front of it. Built from
 * flat shapes in the site's own brand gradient — no external images, so
 * nothing to hotlink or break.
 */
export default function GearIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gear-grad" x1="0" y1="0" x2="480" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6d5ef1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="glow-a" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6d5ef1" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6d5ef1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-b" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* background glow */}
      <circle cx="130" cy="110" r="120" fill="url(#glow-a)" />
      <circle cx="370" cy="300" r="130" fill="url(#glow-b)" />

      {/* floating accent dots */}
      <circle cx="60" cy="230" r="6" fill="#22d3ee" opacity="0.8" />
      <circle cx="430" cy="120" r="5" fill="#6d5ef1" opacity="0.8" />
      <circle cx="410" cy="70" r="3.5" fill="#22d3ee" opacity="0.6" />

      {/* monitor stand */}
      <rect x="226" y="216" width="28" height="34" rx="4" fill="#262d3d" />
      <rect x="186" y="248" width="108" height="12" rx="6" fill="#262d3d" />

      {/* monitor */}
      <rect x="112" y="52" width="256" height="172" rx="16" fill="#161b26" stroke="url(#gear-grad)" strokeWidth="4" />
      <rect x="130" y="70" width="220" height="136" rx="8" fill="#0b0e14" />
      <path
        d="M192 148 L222 176 L288 96"
        stroke="url(#gear-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* keyboard, tilted */}
      <g transform="rotate(-5 118 305)">
        <rect x="33" y="270" width="170" height="66" rx="10" fill="#161b26" stroke="url(#gear-grad)" strokeWidth="3" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={44 + col * 24}
              y={281 + row * 15}
              width="15"
              height="9"
              rx="2"
              fill="#2c3547"
            />
          )),
        )}
      </g>

      {/* mouse, tilted */}
      <g transform="rotate(10 400 300)">
        <path
          d="M378 258c0-15 11-25 25-25s25 10 25 25v46c0 15-11 21-25 21s-25-6-25-21v-46z"
          fill="#161b26"
          stroke="url(#gear-grad)"
          strokeWidth="3"
        />
        <line x1="403" y1="233" x2="403" y2="256" stroke="url(#gear-grad)" strokeWidth="3" strokeLinecap="round" />
        <rect x="398" y="242" width="10" height="14" rx="5" fill="url(#gear-grad)" />
      </g>
    </svg>
  );
}
