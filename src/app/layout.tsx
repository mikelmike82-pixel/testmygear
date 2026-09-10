import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "TestMyGear — Free Online Tests for Keyboard, Mouse, Screen, Webcam, Mic & Gamepad",
    template: "%s | TestMyGear",
  },
  description:
    "Free, instant browser tools to test your keyboard, mouse click speed, monitor for dead pixels, webcam, microphone, and gamepad — no downloads required.",
  verification: {
    google: "JxHtE4X15YJvw_RMGIfzB1J5YU6fw6iIW--gw8Ft_g0",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
