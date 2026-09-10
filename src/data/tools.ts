export interface ToolMeta {
  slug: string;
  name: string;
  shortName: string;
  emoji: string;
  tagline: string;
  category: "Input" | "Display" | "Audio/Video" | "Controller";
}

export const tools: ToolMeta[] = [
  {
    slug: "cps-test",
    name: "CPS Test (Click Speed Test)",
    shortName: "CPS Test",
    emoji: "🖱️",
    tagline: "Measure how many times you can click per second.",
    category: "Input",
  },
  {
    slug: "keyboard-tester",
    name: "Keyboard Tester",
    shortName: "Keyboard Tester",
    emoji: "⌨️",
    tagline: "Check every key works and see live key codes.",
    category: "Input",
  },
  {
    slug: "dead-pixel-test",
    name: "Dead Pixel Test",
    shortName: "Dead Pixel Test",
    emoji: "🖥️",
    tagline: "Scan your screen for dead or stuck pixels.",
    category: "Display",
  },
  {
    slug: "webcam-test",
    name: "Webcam Test",
    shortName: "Webcam Test",
    emoji: "📷",
    tagline: "Check your camera works before a call.",
    category: "Audio/Video",
  },
  {
    slug: "microphone-test",
    name: "Microphone Test",
    shortName: "Mic Test",
    emoji: "🎙️",
    tagline: "See a live level meter to confirm your mic is heard.",
    category: "Audio/Video",
  },
  {
    slug: "gamepad-tester",
    name: "Gamepad Tester",
    shortName: "Gamepad Tester",
    emoji: "🎮",
    tagline: "Test every button and check your sticks for drift.",
    category: "Controller",
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}
