import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import EnergyCalculator from "@/components/EnergyCalculator";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { devices } from "@/data/devices";

type DevicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const DEFAULT_ELECTRICITY_PRICE = 0.35;

function formatEuro(value: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatKwh(value: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

function getTypicalKwhPerUse(
  device: (typeof devices)[number]
) {
  if (device.calculationType === "consumption") {
    return device.kwhPerUse ?? 0;
  }

  return (
    ((device.watts ?? 0) / 1000) *
    ((device.typicalMinutes ?? 0) / 60)
  );
}

export function generateStaticParams() {
  return devices.map((device) => ({
    slug: device.slug,
  }));
}

export async function generateMetadata({
  params,
}: DevicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const device = devices.find(
    (item) => item.slug === slug
  );

  if (!device) {
    return {};
  }

  return {
    title: `${device.name} Stromkosten berechnen`,
    description: device.description,

    alternates: {
      canonical: `/geraete/${device.slug}`,
    },

    openGraph: {
      url: `/geraete/${device.slug}`,
      title: `${device.name} Stromkosten berechnen`,
      description: device.description,
    },
  };
}

export default async function DevicePage({
  params,
}: DevicePageProps) {
  const { slug } = await params;

  const device = devices.find(
    (item) => item.slug === slug
  );

  if (!device) {
    notFound();
  }

  const kwhPerUse =
    getTypicalKwhPerUse(device);

  const typicalUsesPerWeek =
    device.typicalUsesPerWeek ?? 1;

  const yearlyKwh =
    kwhPerUse *
    typicalUsesPerWeek *
    52;

  const yearlyCost =
    yearlyKwh *
    DEFAULT_ELECTRICITY_PRICE;

  const costPerUse =
    kwhPerUse *
    DEFAULT_ELECTRICITY_PRICE;

  const monthlyCost =
    yearlyCost / 12;

  const relatedDevices = devices
    .filter(
      (item) =>
        item.category === device.category &&
        item.slug !== device.slug
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="/"
                className="font-semibold text-blue-600 transition hover:text-blue-800"
              >
                TinyTools Energy
              </Link>

              <span className="text-slate-300">
                /
              </span>

              <Link
                href="/geraete"
                className="font-semibold text-blue-600 transition hover:text-blue-800"
              >
                Geräte
              </Link>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-slate-500">
                {device.name}
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                {device.category} · Stromkosten-Rechner
              </p>

              <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
                Was kostet {device.name} an Strom?
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {device.description}
              </p>
            </div>
          </div>
        </section>

        {/* Beispielrechnung */}
        <section className="px-5 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Beispielrechnung
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Orientierungswerte für {device.name}
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {device.dataBasis}
                </span>
              </div>

              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                Diese Werte sind ein sinnvoller Startpunkt für den
                Rechner, aber keine garantierten Verbrauchswerte für
                dein konkretes Modell.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {device.calculationType === "power" ? (
                  <>
                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Leistung
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {device.watts} W
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Dauer/Nutzung
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {device.typicalMinutes} Min.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Verbrauch/Nutzung
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {formatKwh(kwhPerUse)} kWh
                    </p>
                  </div>
                )}

                <div className="rounded-xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Nutzungen/Woche
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {typicalUsesPerWeek}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">
                    Beispiel/Jahr
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {formatEuro(yearlyCost)} €
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Zur Datenbasis
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {device.dataNote}
                </p>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                Beispiel mit{" "}
                {formatEuro(DEFAULT_ELECTRICITY_PRICE)} €/kWh.
                Daraus ergeben sich ungefähr{" "}
                {formatEuro(costPerUse)} € pro Nutzung,{" "}
                {formatEuro(monthlyCost)} € pro Monat und{" "}
                {formatKwh(yearlyKwh)} kWh pro Jahr.
              </p>
            </div>
          </div>
        </section>

        {/* Rechner */}
        <section
          id="rechner"
          className="px-5 pb-16 pt-4 sm:px-6 sm:pb-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Deine Werte
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {device.name} Stromkosten selbst berechnen
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Passe die vorgeschlagenen Werte an dein eigenes Gerät,
                deinen Stromtarif und deine tatsächliche Nutzung an.
              </p>
            </div>

            <EnergyCalculator
              initialDevice={device.name}
            />
          </div>
        </section>

        {/* Erklärung */}
        <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Berechnung verstehen
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Wie berechnet TinyTools die Stromkosten?
                </h2>

                {device.calculationType === "power" ? (
                  <div className="mt-5 space-y-4 leading-8 text-slate-600">
                    <p>
                      TinyTools rechnet die Leistung des Geräts von Watt
                      in Kilowatt um und multipliziert sie mit der
                      Nutzungsdauer.
                    </p>

                    <p>
                      Anschließend wird der errechnete Verbrauch mit
                      deinem Strompreis und der Nutzungshäufigkeit
                      multipliziert.
                    </p>

                    <div className="rounded-xl bg-slate-50 p-4 font-medium text-slate-700">
                      Watt ÷ 1.000 × Stunden × Strompreis
                    </div>

                    <p>
                      Das ist eine Näherung. Bei Geräten, deren
                      Leistungsaufnahme während des Betriebs schwankt,
                      ist ein gemessener Verbrauch genauer.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4 leading-8 text-slate-600">
                    <p>
                      Bei diesem Gerät ist ein Verbrauchswert pro
                      Nutzung sinnvoller als eine einfache Rechnung aus
                      Watt und Laufzeit.
                    </p>

                    <p>
                      TinyTools multipliziert deshalb den Verbrauch pro
                      Nutzung mit deinem Strompreis und deiner
                      Nutzungshäufigkeit.
                    </p>

                    <div className="rounded-xl bg-slate-50 p-4 font-medium text-slate-700">
                      kWh pro Nutzung × Strompreis × Nutzungen
                    </div>

                    <p>
                      Wenn dein Energielabel einen Wert pro 100 Zyklen
                      angibt, kannst du diesen durch 100 teilen und als
                      Verbrauch pro Nutzung in TinyTools eintragen.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100 sm:p-8">
                  <p className="text-lg font-bold text-slate-900">
                    💡 Spartipp für {device.name}
                  </p>

                  <p className="mt-4 leading-8 text-slate-600">
                    {device.tip}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 p-6 sm:p-8">
                  <p className="font-bold text-slate-900">
                    Noch genauer?
                  </p>

                  <p className="mt-3 leading-7 text-slate-600">
                    Verwende im Rechner den Modus
                    „Genau berechnen“ und gib einen eigenen Messwert
                    in kWh pro Nutzung ein.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verwandte Geräte */}
        {relatedDevices.length > 0 && (
          <section className="px-5 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Mehr aus {device.category}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    Verwandte Geräte
                  </h2>
                </div>

                <Link
                  href="/geraete"
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Alle Geräte ansehen →
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDevices.map((relatedDevice) => (
                  <Link
                    key={relatedDevice.slug}
                    href={`/geraete/${relatedDevice.slug}`}
                    className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-blue-600">
                      {relatedDevice.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {relatedDevice.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {relatedDevice.description}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-slate-900">
                      Stromkosten berechnen →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Zur Bibliothek */}
        <section className="px-5 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-slate-900">
                Noch ein Gerät prüfen?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                In unserer Gerätebibliothek findest du weitere
                Stromkosten-Rechner.
              </p>
            </div>

            <Link
              href="/geraete"
              className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Alle Geräte
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}