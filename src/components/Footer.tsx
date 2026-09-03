import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-bold text-slate-900">
              ⚡ TinyTools Energy
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Einfache Werkzeuge, die dir helfen,
              Stromverbrauch und Energiekosten besser zu verstehen.
            </p>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Derzeit ein privates, nicht kommerzielles Projekt.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              TinyTools
            </p>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">
              <Link
                href="/#rechner"
                className="transition hover:text-slate-900"
              >
                Stromkosten-Rechner
              </Link>

              <Link
                href="/geraete"
                className="transition hover:text-slate-900"
              >
                Geräteübersicht
              </Link>

              <Link
                href="/#faq"
                className="transition hover:text-slate-900"
              >
                Häufige Fragen
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Rechtliches
            </p>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">
              <Link
                href="/impressum"
                className="transition hover:text-slate-900"
              >
                Impressum
              </Link>

              <Link
                href="/datenschutz"
                className="transition hover:text-slate-900"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} TinyTools Energy
        </div>
      </div>
    </footer>
  );
}