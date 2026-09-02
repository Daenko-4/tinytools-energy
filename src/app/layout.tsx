import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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