import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
