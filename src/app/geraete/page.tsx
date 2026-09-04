import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { devices } from "@/data/devices";

export const metadata: Metadata = {
  title: "Stromverbrauch von Haushaltsgeräten",
  description:
    "Entdecke typische Haushaltsgeräte und berechne ihre Stromkosten. Von Küche und Waschen bis Büro und Unterhaltung.",
  alternates: {
    canonical: "/geraete",
  },
};

const categoryOrder = [
  "Küche",
  "Waschen",
  "Haushalt",
  "Bad",
  "Unterhaltung",
  "Büro",
];

const categoryAnchors: Record<string, string> = {
  Küche: "kueche",
  Waschen: "waschen",
  Haushalt: "haushalt",
  Bad: "bad",
  Unterhaltung: "unterhaltung",
  Büro: "buero",
};

function getCategoryAnchor(category: string) {
  return (
    categoryAnchors[category] ??
    category
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/\s+/g, "-")
  );
}

function CategoryIcon({ category }: { category: string }) {
  const props = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "Küche":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <path d="M5 9h14l-1 10H6L5 9Z" />
          <path d="M8 9V7h8v2" />
          <path d="M10 5h4" />
          <path d="M19 11h2v5h-2" />
        </svg>
      );

    case "Waschen":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 6h1" />
          <path d="M12 6h4" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      );

    case "Haushalt":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "Bad":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
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
        </svg>
      );

    case "Unterhaltung":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );

    case "Büro":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <rect x="5" y="4" width="14" height="11" rx="1.5" />
          <path d="M3 19h18" />
          <path d="m5 15-2 4" />
          <path d="m19 15 2 4" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          {...props}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
  }
}

export default function GeraetePage() {
  const categories = categoryOrder
    .map((category) => ({
      category,
      devices: devices.filter((device) => device.category === category),
    }))
    .filter((group) => group.devices.length > 0);

  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-950">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.10),transparent_35%),radial-gradient(circle_at_5%_5%,rgba(34,197,94,0.06),transparent_25%)]" />

          <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
              <span>🌿</span>
              Einfach. Klar. Direkt verständlich.
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Stromkosten deiner
              <br />
              <span className="text-green-700">
                Haushaltsgeräte
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Wähle ein Gerät aus und finde heraus, wie viel Strom es
              verbraucht und welche Kosten bei deiner Nutzung entstehen
              können.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map(({ category }) => (
                <a
                  key={category}
                  href={`#${getCategoryAnchor(category)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                >
                  <span className="text-green-700">
                    <CategoryIcon category={category} />
                  </span>

                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Geräte */}
        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-16">
              {categories.map(({ category, devices: categoryDevices }) => (
                <section
                  key={category}
                  id={getCategoryAnchor(category)}
                  className="scroll-mt-28"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                      <CategoryIcon category={category} />
                    </span>

                    <div>
                      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                        {category}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {categoryDevices.length}{" "}
                        {categoryDevices.length === 1 ? "Gerät" : "Geräte"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryDevices.map((device) => (
                      <Link
                        key={device.slug}
                        href={`/geraete/${device.slug}`}
                        className="group flex min-h-[150px] flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                            ⚡
                          </div>

                          <span className="text-xl text-green-600 transition group-hover:translate-x-1">
                            →
                          </span>
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-slate-950 transition group-hover:text-green-700">
                          {device.name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Stromverbrauch und Kosten berechnen
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-50 p-8 text-center shadow-[0_20px_60px_-35px_rgba(21,128,61,0.35)] sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              🌿
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">
              Dein Gerät ist nicht dabei?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Kein Problem. Im Stromkosten-Rechner kannst du auch ein
              eigenes Gerät anlegen und deine Werte selbst eingeben.
            </p>

            <Link
              href="/#rechner"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
            >
              Zum Stromkosten-Rechner
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}