"use client";

import { useState } from "react";

import EnergyCalculator from "@/components/EnergyCalculator";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const categories = [
  { name: "Küche", href: "/geraete#kueche", icon: "kitchen" },
  { name: "Waschen", href: "/geraete#waschen", icon: "washer" },
  { name: "Haushalt", href: "/geraete#haushalt", icon: "home" },
  { name: "Bad", href: "/geraete#bad", icon: "shower" },
  {
    name: "Unterhaltung",
    href: "/geraete#unterhaltung",
    icon: "monitor",
  },
  { name: "Büro", href: "/geraete#buero", icon: "laptop" },
];

const benefits = [
  {
    icon: "gift",
    title: "Kostenlos",
    text: "Nutze den Rechner ohne Anmeldung oder versteckte Kosten.",
  },
  {
    icon: "chart",
    title: "Sofort verständlich",
    text: "Sieh Kosten pro Nutzung, Woche, Monat und Jahr auf einen Blick.",
  },
  {
    icon: "settings",
    title: "Flexibel",
    text: "Nutze unsere Orientierungswerte oder trage deine eigenen Messwerte ein.",
  },
];

const steps = [
  {
    number: "01",
    icon: "search",
    title: "Gerät auswählen",
    text: "Wähle ein typisches Haushaltsgerät oder lege ein eigenes Gerät an.",
  },
  {
    number: "02",
    icon: "settings",
    title: "Nutzung anpassen",
    text: "Passe Strompreis, Laufzeit und Nutzungshäufigkeit an deinen Alltag an.",
  },
  {
    number: "03",
    icon: "chart",
    title: "Kosten verstehen",
    text: "TinyTools berechnet deinen ungefähren Stromverbrauch und die daraus entstehenden Kosten.",
  },
];

const faqs = [
  {
    question: "Wie genau ist der Stromkosten-Rechner?",
    answer:
      "Im Modus „Gerät auswählen“ arbeitet TinyTools mit Orientierungswerten und deinen Angaben zur Nutzung. Das Ergebnis ist deshalb eine Schätzung. Unter „Eigene Werte“ kannst du einen selbst gemessenen oder bekannten Verbrauch pro Nutzung eintragen.",
  },
  {
    question: "Wo finde ich die Leistung meines Geräts?",
    answer:
      "Die Leistung in Watt findest du häufig auf dem Typenschild, auf dem Netzteil oder in der Bedienungsanleitung des Geräts.",
  },
  {
    question: "Wo finde ich meinen Strompreis?",
    answer:
      "Für die Berechnung brauchst du deinen Arbeitspreis in Euro pro Kilowattstunde. Diesen findest du in der Regel auf deiner Stromrechnung oder in deinem Stromtarif.",
  },
  {
    question: "Warum können die tatsächlichen Kosten abweichen?",
    answer:
      "Programme, Temperatur, Alter des Geräts und die tatsächliche Nutzung können den Verbrauch beeinflussen.",
  },
  {
    question: "Kann ich auch ein Gerät berechnen, das nicht in der Liste steht?",
    answer:
      "Ja. Wähle „Eigenes Gerät“ und trage Leistung und Nutzung selbst ein.",
  },
];

type CalculatorMode = "estimate" | "exact";

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const props = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "kitchen":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <path d="M5 9h14l-1 10H6L5 9Z" />
          <path d="M8 9V7h8v2" />
          <path d="M10 5h4" />
          <path d="M19 11h2v5h-2" />
        </svg>
      );

    case "washer":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 6h1" />
          <path d="M12 6h4" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      );

    case "home":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "shower":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <path d="M5 13V8a5 5 0 0 1 10 0" />
          <path d="M14 8h5" />
          <path d="M15 12v1" />
          <path d="M18 12v1" />
          <path d="M12 15v1" />
          <path d="M15 16v1" />
          <path d="M18 15v1" />
          <path d="M12 19v1" />
          <path d="M16 19v1" />
        </svg>
      );

    case "monitor":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );

    case "laptop":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <rect x="5" y="4" width="14" height="11" rx="1.5" />
          <path d="M3 19h18" />
          <path d="m5 15-2 4" />
          <path d="m19 15 2 4" />
        </svg>
      );

    case "gift":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <rect x="3" y="9" width="18" height="12" rx="2" />
          <path d="M12 9v12" />
          <path d="M3 13h18" />
          <path d="M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9" />
          <path d="M12 9h3.5A2.5 2.5 0 1 0 13 6.5V9" />
        </svg>
      );

    case "chart":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <path d="M5 20V11" />
          <path d="M10 20V6" />
          <path d="M15 20V14" />
          <path d="M20 20V3" />
        </svg>
      );

    case "search":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 5 5" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          {...props}
          aria-hidden="true"
        >
          <path d="M4 6h10" />
          <path d="M18 6h2" />
          <path d="M4 12h2" />
          <path d="M10 12h10" />
          <path d="M4 18h7" />
          <path d="M15 18h5" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="13" cy="18" r="2" />
        </svg>
      );
  }
}

export default function Home() {
  const [calculatorMode, setCalculatorMode] =
    useState<CalculatorMode>("estimate");

  function openCalculator(mode: CalculatorMode) {
    setCalculatorMode(mode);

    window.requestAnimationFrame(() => {
      document.getElementById("rechner")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-950">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_35%,rgba(34,197,94,0.10),transparent_36%),radial-gradient(circle_at_5%_10%,rgba(34,197,94,0.07),transparent_28%)]" />

          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
                <span>🌿</span>
                Einfach. Klar. Direkt verständlich.
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-extrabold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                Viele Geräte,
                <br />
                <span className="text-green-700">ein Rechner</span>
              </h1>

              <h2 className="mt-6 max-w-2xl text-2xl font-bold tracking-tight text-slate-900">
                Berechne die Stromkosten deines Alltags
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Ob Wasserkocher, Waschmaschine oder Fernseher – mit
                TinyTools findest du schnell heraus, wie viel Strom deine
                Geräte wirklich kosten. Einfach, verständlich und kostenlos.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openCalculator("estimate")}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
                >
                  Jetzt Stromkosten berechnen
                  <span>→</span>
                </button>

                <a
                  href="/geraete"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-800"
                >
                  Geräte entdecken
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                {["Kostenlos", "Ohne Anmeldung", "Direkt im Browser"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                        ✓
                      </span>
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden min-h-[540px] lg:block">
              <div className="absolute inset-0 rounded-[3rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-[0_30px_80px_-45px_rgba(21,128,61,0.35)]" />

              <div className="absolute left-10 top-9 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
                ⚡ Stromkosten auf einen Blick
              </div>

              <div className="absolute inset-x-10 top-[105px]">
                <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950">
                  Kleine Geräte.
                  <br />
                  <span className="text-green-700">Große Wirkung.</span>
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
                  Schon kleine Verbräuche können sich über Wochen und Monate
                  bemerkbar machen.
                </p>
              </div>

              <div className="absolute inset-x-10 bottom-8 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                      ☕
                    </div>

                    <div>
                      <p className="font-bold text-slate-950">Wasserkocher</p>
                      <p className="text-sm text-slate-500">1 Nutzung</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-green-700">
                      0,04 €
                    </p>
                    <p className="text-xs text-slate-400">Beispiel</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                      🧺
                    </div>

                    <div>
                      <p className="font-bold text-slate-950">
                        Waschmaschine
                      </p>
                      <p className="text-sm text-slate-500">1 Waschgang</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-green-700">
                      0,31 €
                    </p>
                    <p className="text-xs text-slate-400">Beispiel</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                      📺
                    </div>

                    <div>
                      <p className="font-bold text-slate-950">Fernseher</p>
                      <p className="text-sm text-slate-500">1 Stunde</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-green-700">
                      0,02 €
                    </p>
                    <p className="text-xs text-slate-400">Beispiel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kategorien */}
        <section className="px-5 py-8 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="group flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-3 py-4 text-center shadow-[0_10px_35px_-20px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700 transition group-hover:bg-green-100">
                    <Icon
                      name={category.icon}
                      className="h-5 w-5"
                    />
                  </span>

                  <span className="mt-3 text-sm font-semibold text-slate-900">
                    {category.name}
                  </span>

                  <span className="mt-1 text-sm text-green-700 transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Rechner */}
        <section
          id="rechner"
          className="scroll-mt-24 px-5 py-14 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Stromkosten-Rechner
            </p>

            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-slate-950">
              Schnell zur Antwort
            </h2>

            <p className="mt-3 text-lg text-slate-600">
              Wähle ein Gerät oder gib eigene Werte ein.
            </p>

            <div className="mt-8">
              <EnergyCalculator
                controlledMode={calculatorMode}
                onModeChange={setCalculatorMode}
              />
            </div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="px-5 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <Icon
                    name={benefit.icon}
                    className="h-7 w-7"
                  />
                </span>

                <div>
                  <h3 className="font-bold text-slate-950">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* So funktioniert's */}
        <section
          id="so-funktionierts"
          className="scroll-mt-24 border-y border-slate-200/70 bg-white px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              So funktioniert&apos;s
            </p>

            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-slate-950">
              Von Watt zu Euro – ohne Kopfrechnen
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              TinyTools nimmt dir die Umrechnung ab und zeigt dir das Ergebnis
              in Größen, die im Alltag verständlich sind.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-[#fbfcfb] p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-700">
                      {step.number}
                    </span>

                    <span className="text-green-700">
                      <Icon name={step.icon} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zwei Wege */}
        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 p-7 text-white sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
              Zwei Wege zum Ergebnis
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Schnell schätzen oder genauer rechnen
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-green-50/75">
              Entscheide selbst, ob du mit unseren Orientierungswerten
              starten oder einen eigenen Verbrauchswert verwenden möchtest.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <button
                type="button"
                onClick={() => openCalculator("estimate")}
                className="group rounded-2xl border border-white/10 bg-white/10 p-6 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl transition group-hover:bg-white/15">
                  ⚡
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">
                    Schnell schätzen
                  </h3>

                  <span
                    aria-hidden="true"
                    className="text-xl text-green-200 transition group-hover:translate-x-1 group-hover:text-white"
                  >
                    →
                  </span>
                </div>

                <p className="mt-2 leading-7 text-green-50/80">
                  Nutze unsere Orientierungswerte und passe deine Nutzung an.
                  Ideal für einen schnellen Überblick.
                </p>
              </button>

              <button
                type="button"
                onClick={() => openCalculator("exact")}
                className="group rounded-2xl border border-white/10 bg-white/10 p-6 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl transition group-hover:bg-white/15">
                  🎯
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">
                    Genau berechnen
                  </h3>

                  <span
                    aria-hidden="true"
                    className="text-xl text-green-200 transition group-hover:translate-x-1 group-hover:text-white"
                  >
                    →
                  </span>
                </div>

                <p className="mt-2 leading-7 text-green-50/80">
                  Gib deinen tatsächlichen Verbrauch pro Nutzung ein, wenn
                  du einen Mess- oder Herstellerwert kennst.
                </p>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Häufige Fragen
            </p>

            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">
              Fragen zu TinyTools
            </h2>

            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                    {faq.question}

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-lg text-slate-400 transition group-open:rotate-45 group-open:bg-green-50 group-open:text-green-700">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Abschluss */}
        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-50 p-8 text-center shadow-[0_20px_60px_-35px_rgba(21,128,61,0.35)] sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              🌿
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">
              Was kostet dein Gerät wirklich?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Mit wenigen Angaben bekommst du einen schnellen Überblick über
              Stromverbrauch und Kosten.
            </p>

            <button
              type="button"
              onClick={() => openCalculator("estimate")}
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
            >
              Jetzt berechnen
              <span>→</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}