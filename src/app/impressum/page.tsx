import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Offenlegung für TinyTools Energy.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-green-600 hover:text-green-700"
        >
          ← Zurück zu TinyTools Energy
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Rechtliches
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Impressum & Offenlegung
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Informationen zum privaten Webprojekt TinyTools Energy.
          </p>
        </div>

        <div className="mt-12 space-y-10 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Medieninhaber und Betreiber
            </h2>

            <div className="mt-4 space-y-1 leading-7">
              <p>Dan Florian</p>
              <p>Traiskirchen</p>
              <p>Österreich</p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:dan.florian@gmx.at"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  dan.florian@gmx.at
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Projekt
            </h2>

            <p className="mt-4 leading-7">
              TinyTools Energy ist derzeit ein privates,
              nicht kommerzielles Webprojekt.
            </p>

            <p className="mt-3 leading-7">
              Zweck des Projekts ist die Bereitstellung einfacher
              Online-Werkzeuge und Informationen zur überschlägigen
              Berechnung und zum besseren Verständnis von
              Stromverbrauch und Stromkosten im Alltag.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Grundlegende Richtung
            </h2>

            <p className="mt-4 leading-7">
              TinyTools Energy stellt neutrale Rechenhilfen und
              allgemeine Informationen rund um Stromverbrauch,
              Energiekosten und einen bewussten Umgang mit Energie
              bereit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Haftung für Inhalte
            </h2>

            <p className="mt-4 leading-7">
              Die Inhalte und Berechnungen auf TinyTools Energy
              dienen der allgemeinen Information und Orientierung.
              Berechnete Werte sind Schätzungen und können vom
              tatsächlichen Stromverbrauch und den tatsächlichen
              Kosten abweichen.
            </p>

            <p className="mt-3 leading-7">
              Für individuelle Entscheidungen sollten insbesondere
              die Verbrauchswerte des konkreten Geräts, Messwerte
              sowie der persönliche Stromtarif berücksichtigt werden.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}