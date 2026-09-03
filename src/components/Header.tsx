import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/brand/tinytools-icon-192.png"
            alt="TinyTools Energy"
            width={44}
            height={44}
            priority
            className="rounded-xl"
          />

          <div className="hidden leading-tight sm:block">
            <p className="font-extrabold tracking-tight text-slate-900">
              TINY
              <span className="text-green-600">
                TOOLS
              </span>
            </p>

            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
              ENERGY
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-700 md:flex">
          <Link
            href="/#rechner"
            className="transition hover:text-green-600"
          >
            Rechner
          </Link>

          <Link
            href="/geraete"
            className="transition hover:text-green-600"
          >
            Geräte
          </Link>

          <Link
            href="/#so-funktionierts"
            className="transition hover:text-green-600"
          >
            So funktioniert&apos;s
          </Link>

          <Link
            href="/#faq"
            className="transition hover:text-green-600"
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