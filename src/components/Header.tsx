"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            onClick={closeMenu}
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

          <div className="flex items-center gap-2">
            <Link
              href="/#rechner"
              className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 sm:px-4"
              onClick={closeMenu}
            >
              Berechnen
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
              aria-label={
                menuOpen
                  ? "Navigation schließen"
                  : "Navigation öffnen"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <span className="text-2xl leading-none">
                  ×
                </span>
              ) : (
                <span className="text-xl leading-none">
                  ☰
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 py-3 md:hidden">
            <div className="flex flex-col">
              <Link
                href="/#rechner"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-green-600"
              >
                Rechner
              </Link>

              <Link
                href="/geraete"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-green-600"
              >
                Geräte
              </Link>

              <Link
                href="/#so-funktionierts"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-green-600"
              >
                So funktioniert&apos;s
              </Link>

              <Link
                href="/#faq"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-green-600"
              >
                FAQ
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}