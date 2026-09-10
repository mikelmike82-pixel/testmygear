"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { tools, ToolMeta } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

const MIN_SIZE = 30;
const MAX_SIZE = 46;
const MAGNIFY_RANGE = 90; // px of mouse distance that affects icon size

function DockIcon({
  tool,
  mouseX,
  isActive,
}: {
  tool: ToolMeta;
  mouseX: MotionValue<number>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [MIN_SIZE, MAX_SIZE, MIN_SIZE],
  );
  const size = useSpring(sizeSync, { mass: 0.15, stiffness: 220, damping: 14 });

  return (
    <Link
      href={`/${tool.slug}`}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div ref={ref} style={{ width: size, height: size }} className="flex items-center justify-center">
        <ToolIcon slug={tool.slug} size="100%" className="w-full h-full" />
      </motion.div>

      <span
        className={`mt-1 h-1 w-1 rounded-full transition-colors ${
          isActive ? "bg-[var(--color-accent2)]" : "bg-transparent"
        }`}
      />

      <motion.span
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.15 }}
        style={{ top: 50 }}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs text-[var(--color-ink)] shadow-lg z-10"
      >
        {tool.shortName}
      </motion.span>
    </Link>
  );
}

/**
 * macOS-dock-style tool navigation: icons magnify toward the mouse and
 * show a name tooltip on hover, with a small dot marking the current page.
 * Desktop-only (hover-driven) — hidden below md, same as the plain nav it
 * replaced.
 */
export default function NavDock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex items-end gap-3 lg:gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/70 backdrop-blur px-4 py-2"
    >
      {tools.map((tool) => (
        <DockIcon key={tool.slug} tool={tool} mouseX={mouseX} isActive={pathname === `/${tool.slug}`} />
      ))}
    </motion.div>
  );
}
