import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://tinytools-energy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "TinyTools Energy – Stromkosten einfach berechnen",
    template: "%s | TinyTools Energy",
  },

  description:
    "Berechne kostenlos die Stromkosten deiner Haushaltsgeräte. Sieh Kosten pro Nutzung, Woche, Monat und Jahr – einfach und ohne Anmeldung.",

  keywords: [
    "Stromkosten Rechner",
    "Stromverbrauch berechnen",
    "Stromkosten Gerät",
    "Stromverbrauch Haushaltsgeräte",
    "Stromkosten pro Jahr",
    "kWh Kosten berechnen",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "TinyTools Energy",
    title: "TinyTools Energy – Stromkosten einfach berechnen",
    description:
      "Berechne kostenlos die Stromkosten deiner Haushaltsgeräte – pro Nutzung, Woche, Monat und Jahr.",
    images: [
      {
        url: "/brand/tinytools-og.png",
        width: 1200,
        height: 630,
        alt: "TinyTools Energy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TinyTools Energy – Stromkosten einfach berechnen",
    description:
      "Berechne kostenlos die Stromkosten deiner Haushaltsgeräte.",
    images: ["/brand/tinytools-og.png"],
  },

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}