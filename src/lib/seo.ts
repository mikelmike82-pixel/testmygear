import type { Metadata } from "next";

export const SITE_URL = "https://testmygear.tech";
export const SITE_NAME = "TestMyGear";
const OG_IMAGE_PATH = "/og-image.png";

/**
 * Builds a complete per-page Metadata object (canonical URL, Open Graph,
 * Twitter card) from just a title and description, so every page controls
 * its own full metadata rather than relying on Next's partial merging of
 * nested fields like `openGraph` across layouts.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

/** JSON-LD for a free browser tool, so search engines can identify it as a working app. */
export function toolSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with JavaScript enabled.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/** JSON-LD FAQPage schema built straight from a page's existing FAQ items, so it can never drift from what's shown on the page. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
