"use client";

import Link from "next/link";
import { useState } from "react";

function TinyToolsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
      >
        <defs>
          <linearGradient
            id="tinytools-leaf"
            x1="12"
            y1="52"
            x2="52"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#15803d" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        <path
          d="M54 8
             C42 10 29 13 20 20
             C11 27 8 37 12 47
             C20 52 31 50 39 44
             C48 37 53 24 54 8Z"
          fill="url(#tinytools-leaf)"
        />

        <path
          d="M13 48
             C21 38 30 29 45 17
             C33 24 23 32 15 42
             C13 44 12 46 13 48Z"
          fill="white"
        />

        <path
          d="M14 45
             C11 50 9 54 7 58"
          fill="none"
          stroke="#15803d"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-[1.35rem]">
        TinyTools
      </span>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          {/* Marke links */}
          <div className="flex shrink-0 items-center">
            {/* Nur Logo + TinyTools sind klickbar */}
            <Link
              href="/"
              onClick={closeMenu}
              className="transition-opacity hover:opacity-80"
              aria-label="TinyTools Startseite"
            >
              <TinyToolsLogo />
            </Link>

            {/* Energy ist bewusst kein Link und hat keinen Hintergrund */}
            <span className="ml-2 mt-[10px] hidden text-[9px] font-extrabold uppercase leading-none tracking-[0.14em] text-green-700 sm:inline-flex">
              Energy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-[15px] font-semibold text-slate-700 md:flex">
            <a
              href="/#rechner"
              className="transition hover:text-green-700"
            >
              Rechner
            </a>

            <a
              href="/geraete"
              className="transition hover:text-green-700"
            >
              Geräte
            </a>

            <a
              href="/#so-funktionierts"
              className="transition hover:text-green-700"
            >
              So funktioniert&apos;s
            </a>

            <a
              href="/#faq"
              className="transition hover:text-green-700"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#rechner"
              onClick={closeMenu}
              className="hidden rounded-xl bg-green-700 px-4 py-2.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md sm:inline-flex"
            >
              Berechnen
            </a>

            {/* Mobile Menü */}
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 md:hidden"
              aria-label={
                menuOpen
                  ? "Navigation schließen"
                  : "Navigation öffnen"
              }
              aria-expanded={menuOpen}
            >
              <span className="text-xl leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="border-t border-slate-200 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <a
                href="/#rechner"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                Rechner
              </a>

              <a
                href="/geraete"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                Geräte
              </a>

              <a
                href="/#so-funktionierts"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                So funktioniert&apos;s
              </a>

              <a
                href="/#faq"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                FAQ
              </a>

              <a
                href="/#rechner"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-green-700 px-3 py-3 text-center text-base font-semibold text-white transition hover:bg-green-800"
              >
                Berechnen
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}