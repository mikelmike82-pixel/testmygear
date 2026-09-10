import Script from "next/script";

const GA_MEASUREMENT_ID = "G-QBZESP65NR";

/**
 * Google Analytics 4 (gtag.js) tracking. Loaded with next/script's
 * "afterInteractive" strategy so it doesn't block the initial page render.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
