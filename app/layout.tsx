import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const SITE_NAME = "Neozava";
const SITE_URL = "https://neozava.com";
const TITLE = "Neozava: Pinjam Uang dan e-commerce otomotif";
const DESCRIPTION =
  "Gadai BPKB Mobil, Gadai BPKB Motor, Take Over, Kredit Bekas, Top Up Adira. Adira, BFI, dan WOM Finance berizin dan diawasi oleh Otoritas Jasa Keuangan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  verification: {
    google: "3GI6iadjOOWGeLLSFkzztWJCHfB5bsisG3UzU43HllU",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/Neozava.png", width: 1181, height: 289, alt: SITE_NAME }],
  },
};

// LocalBusiness structured data built only from facts already published
// elsewhere on the site (footer address/phone/social links) — not new
// claims. @type is the generic "LocalBusiness" rather than something
// like "FinancialService" on purpose: Neozava's exact legal relationship
// to Adira/BFI/WOM (aggregator vs. agent vs. digital partner) hasn't
// been confirmed, so this avoids asserting a regulated-business category
// it may not accurately hold.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/images/Neozava.png`,
  image: `${SITE_URL}/images/Neozava.png`,
  telephone: "+6281219251995",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sunburst CBD Lot. 1.2, Jl. Kapt. Soebijanto Djojohadikusumo",
    addressLocality: "BSD City, Tangerang Selatan",
    postalCode: "15322",
    addressCountry: "ID",
  },
  sameAs: [
    "https://www.facebook.com/neozava",
    "https://www.instagram.com/neozava",
    "https://youtube.com/@csneozava6249",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div id="mobile-shell">{children}</div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16517459637"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16517459637');
          `}
        </Script>
      </body>
    </html>
  );
}
