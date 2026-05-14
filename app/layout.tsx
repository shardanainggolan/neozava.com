import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Neozava: Pinjam Uang dan e-commerce otomotif",
  description:
    "Gadai BPKB Mobil, Gadai BPKB Motor, Take Over, Kredit Bekas, Top Up Adira. Adira, BFI, dan WOM Finance berizin dan diawasi oleh Otoritas Jasa Keuangan.",
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
