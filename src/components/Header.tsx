import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900"
        >
          ⚡ TinyTools Energy
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link
            href="/#rechner"
            className="transition hover:text-slate-900"
          >
            Rechner
          </Link>

          <Link
            href="/geraete"
            className="transition hover:text-slate-900"
          >
            Geräte
          </Link>

          <Link
            href="/#so-funktionierts"
            className="transition hover:text-slate-900"
          >
            So funktioniert’s
          </Link>

          <Link
            href="/#faq"
            className="transition hover:text-slate-900"
          >
            FAQ
          </Link>
        </nav>

        <Link
          href="/#rechner"
          className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 sm:px-4"
        >
          Berechnen
        </Link>
      </div>
    </header>
  );
}