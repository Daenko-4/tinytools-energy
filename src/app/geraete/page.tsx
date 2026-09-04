import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { devices } from "@/data/devices";

export const metadata: Metadata = {
  title: "Stromkosten nach Gerät berechnen",
  description:
    "Entdecke Stromkosten-Rechner für typische Haushaltsgeräte – vom Wasserkocher über Waschmaschine und Fernseher bis zum Computer.",

  alternates: {
    canonical: "/geraete",
  },

  openGraph: {
    url: "/geraete",
    title: "Stromkosten nach Gerät berechnen",
    description:
      "Entdecke Stromkosten-Rechner für typische Haushaltsgeräte – vom Wasserkocher über Waschmaschine und Fernseher bis zum Computer.",
  },
};

const categories = Array.from(
  new Set(devices.map((device) => device.category))
);

export default function DevicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Gerätebibliothek
            </p>

            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Was kostet welches Gerät an Strom?
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Wähle ein Haushaltsgerät und berechne mit wenigen Angaben,
              wie viel Strom und Geld deine Nutzung ungefähr pro Woche,
              Monat und Jahr kostet.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Geräte */}
        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-16">
            {categories.map((category) => {
              const categoryDevices = devices.filter(
                (device) => device.category === category
              );

              return (
                <div
                  key={category}
                  id={category.toLowerCase()}
                  className="scroll-mt-8"
                >
                  <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                        Kategorie
                      </p>

                      <h2 className="mt-2 text-3xl font-bold tracking-tight">
                        {category}
                      </h2>
                    </div>

                    <p className="text-sm text-slate-500">
                      {categoryDevices.length}{" "}
                      {categoryDevices.length === 1 ? "Gerät" : "Geräte"}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryDevices.map((device) => (
                      <Link
                        key={device.slug}
                        href={`/geraete/${device.slug}`}
                        className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-blue-600">
                              {device.category}
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-slate-900">
                              {device.name}
                            </h3>
                          </div>

                          <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                            →
                          </span>
                        </div>

                        <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                          {device.description}
                        </p>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Datenbasis
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-600">
                            {device.dataBasis}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Eigene Geräte */}
        <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                  Gerät nicht dabei?
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Berechne dein eigenes Gerät
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  Im allgemeinen TinyTools-Rechner kannst du ein eigenes
                  Gerät anlegen und Leistung, Laufzeit und Nutzung selbst
                  eingeben.
                </p>
              </div>

              <Link
                href="/#rechner"
                className="inline-flex justify-center rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Zum Rechner
              </Link>
            </div>
          </div>
        </section>

        {/* Transparenz */}
        <section className="px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                Wie sind die Gerätewerte zu verstehen?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                TinyTools arbeitet mit Orientierungswerten. Wo ein
                Energieverbrauch pro Zyklus sinnvoll verfügbar ist,
                verwenden wir einen kWh-Wert als Ausgangspunkt. Bei
                einfacheren Geräten berechnen wir den Verbrauch
                näherungsweise aus Leistung und Laufzeit.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Für dein konkretes Gerät sind Typenschild,
                Bedienungsanleitung, Energielabel oder ein eigener
                Messwert immer die bessere Grundlage. Deshalb kannst du
                die vorgeschlagenen Werte im Rechner anpassen.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}