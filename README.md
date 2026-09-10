# TestMyGear

A free, ad-supported website of browser-based hardware test tools — click speed (CPS) test, keyboard tester, dead pixel test, webcam test, microphone test, and gamepad tester — built with Next.js, TypeScript, and Tailwind CSS.

This folder is a working copy of the project for your own records. The actual building, testing, and deployment is handled by Claude in a separate cloud workspace and pushed to GitHub, then deployed automatically to Vercel — you shouldn't need to run any commands here yourself.

## What's in this project

- `src/data/tools.ts` — the registry of tools shown on the home page and in navigation
- `src/app/<tool-slug>/page.tsx` — one page per tool (content + SEO metadata)
- `src/components/tools/*Widget.tsx` — the actual interactive logic for each tool
- `src/components/ToolShell.tsx`, `FAQ.tsx` — shared layout pieces every tool page uses

Everything runs client-side in the browser (no server, no database, no AI calls) — camera and microphone access, where used, never leaves the visitor's own device.
