import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const DEFAULT_TITLE =
  "TestMyGear — Free Online Tests for Keyboard, Mouse, Screen, Webcam, Mic & Gamepad";
const DEFAULT_DESCRIPTION =
  "Free, instant browser tools to test your keyboard, mouse click speed, monitor for dead pixels, webcam, microphone, and gamepad — no downloads required.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | TestMyGear",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  verification: {
    google: "JxHtE4X15YJvw_RMGIfzB1J5YU6fw6iIW--gw8Ft_g0",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
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
