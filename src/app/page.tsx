import EnergyCalculator from "@/components/EnergyCalculator";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const benefits = [
  {
    title: "Kostenlos",
    text: "Nutze den Rechner ohne Anmeldung oder versteckte Kosten.",
  },
  {
    title: "Sofort verständlich",
    text: "Sieh Kosten pro Nutzung, Woche, Monat und Jahr auf einen Blick.",
  },
  {
    title: "Flexibel",
    text: "Nutze unsere Orientierungswerte oder trage deine eigenen Messwerte ein.",
  },
];

const steps = [
  {
    number: "01",
    title: "Gerät auswählen",
    text: "Wähle ein typisches Haushaltsgerät oder lege ein eigenes Gerät an.",
  },
  {
    number: "02",
    title: "Nutzung anpassen",
    text: "Passe Strompreis, Laufzeit und Nutzungshäufigkeit an deinen Alltag an.",
  },
  {
    number: "03",
    title: "Kosten verstehen",
    text: "TinyTools berechnet deinen ungefähren Stromverbrauch und die daraus entstehenden Kosten.",
  },
];

const categories = [
  {
    name: "Küche",
    href: "/geraete#kueche",
  },
  {
    name: "Waschen",
    href: "/geraete#waschen",
  },
  {
    name: "Haushalt",
    href: "/geraete#haushalt",
  },
  {
    name: "Bad",
    href: "/geraete#bad",
  },
  {
    name: "Unterhaltung",
    href: "/geraete#unterhaltung",
  },
  {
    name: "Büro",
    href: "/geraete#buero",
  },
];

const faqs = [
  {
    question: "Wie genau ist der Stromkosten-Rechner?",
    answer:
      "Im Modus „Schnell schätzen“ arbeitet TinyTools mit Orientierungswerten und deinen Angaben zur Nutzung. Das Ergebnis ist deshalb eine Schätzung. Im Modus „Genau berechnen“ kannst du einen selbst gemessenen oder bekannten Verbrauch pro Nutzung eintragen.",
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
      "Viele Geräte verbrauchen während des Betriebs nicht konstant dieselbe Leistung. Programme, Temperatur, Alter des Geräts und die tatsächliche Nutzung können den Verbrauch beeinflussen.",
  },
  {
    question: "Kann ich auch ein Gerät berechnen, das nicht in der Liste steht?",
    answer:
      "Ja. Wähle „Eigenes Gerät“ und trage die Leistung sowie deine typische Nutzungsdauer selbst ein.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        {/* Hero */}
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                ⚡ Stromkosten einfach verstehen
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Was kostet dein Gerät wirklich im Jahr?
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Berechne in wenigen Sekunden die ungefähren Stromkosten
                deiner Haushaltsgeräte – ohne Anmeldung und ohne
                komplizierte Formeln.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#rechner"
                  className="rounded-xl bg-slate-900 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-700"
                >
                  Jetzt Stromkosten berechnen
                </a>

                <a
                  href="#so-funktionierts"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  So funktioniert’s
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span>✓ Kostenlos</span>
                <span>✓ Ohne Anmeldung</span>
                <span>✓ Direkt im Browser</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Beispiel
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Ein Gerät kann harmlos wirken – bis du aufs Jahr rechnest.
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <span className="text-slate-600">
                    Leistung
                  </span>
                  <strong>2.000 W</strong>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <span className="text-slate-600">
                    Nutzung
                  </span>
                  <strong>14× pro Woche</strong>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <span className="text-slate-600">
                    Strompreis
                  </span>
                  <strong>0,35 €/kWh</strong>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-slate-500">
                Genau dafür ist TinyTools da: aus technischen Angaben
                verständliche Alltagskosten machen.
              </p>
            </div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title}>
                <h2 className="font-bold text-slate-900">
                  {benefit.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Rechner */}
        <section
          id="rechner"
          className="scroll-mt-6 px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Stromkosten-Rechner
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Finde heraus, was dein Gerät kostet
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Wähle ein Gerät, passe die Werte an und sieh direkt,
                wie sich dein Stromverbrauch auf deine Kosten auswirkt.
              </p>
            </div>

            <EnergyCalculator />
          </div>
        </section>

        {/* So funktioniert es */}
        <section
          id="so-funktionierts"
          className="scroll-mt-6 bg-white px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                So funktioniert’s
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Von Watt zu Euro – ohne Kopfrechnen
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                TinyTools nimmt dir die Umrechnung ab und zeigt dir
                das Ergebnis in Größen, die im Alltag verständlich sind.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p className="text-sm font-bold text-blue-600">
                    {step.number}
                  </p>

                  <h3 className="mt-3 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gerätekategorien */}
        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Viele Geräte, ein Rechner
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Berechne die Stromkosten deines Alltags
                </h2>

                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  Vom Wasserkocher bis zum Computer: TinyTools hilft dir,
                  typische Stromverbraucher besser einzuschätzen.
                  Fehlt ein Gerät, kannst du deine eigenen Werte eingeben.
                </p>

                <a
                  href="#rechner"
                  className="mt-7 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                >
                  Gerät berechnen
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="group flex min-h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 hover:text-green-700 hover:shadow-md"
                  >
                    <span>
                      {category.name}
                      <span className="ml-2 inline-block text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600">
                        →
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schätzung vs genau */}
        <section className="bg-slate-900 px-5 py-16 text-white sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                Zwei Wege zum Ergebnis
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Schnell schätzen oder genauer rechnen
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6">
                <p className="text-lg font-bold">
                  ⚡ Schnell schätzen
                </p>

                <p className="mt-3 leading-7 text-slate-300">
                  Nutze unsere Orientierungswerte für Leistung oder
                  Verbrauch und passe nur deine persönliche Nutzung an.
                  Ideal für einen schnellen Überblick.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6">
                <p className="text-lg font-bold">
                  🎯 Genau berechnen
                </p>

                <p className="mt-3 leading-7 text-slate-300">
                  Wenn du den tatsächlichen Verbrauch pro Nutzung kennst,
                  kannst du diesen direkt eingeben. Besonders hilfreich
                  sind Messwerte eines Strommessgeräts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-6 bg-white px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Häufige Fragen
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Fragen zum Stromkosten-Rechner
              </h2>
            </div>

            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                    {faq.question}

                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Abschluss CTA */}
        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-blue-50 px-6 py-12 text-center ring-1 ring-blue-100 sm:px-10">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Kostenlos ausprobieren
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welches Gerät möchtest du zuerst überprüfen?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              Ein paar Angaben reichen aus. TinyTools übernimmt den Rest.
            </p>

            <a
              href="#rechner"
              className="mt-7 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-700"
            >
              Zum Stromkosten-Rechner
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}