"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// const navLinks = [
//   { label: "Gadai BPKB Mobil",    href: "/gadai-bpkb-mobil" },
//   { label: "Gadai BPKB Motor",    href: "/gadai-bpkb-motor" },
//   { label: "Take Over",           href: "/take-over" },
//   { label: "Kredit Bekas",        href: "/kredit-bekas" },
//   { label: "Syarat & Ketentuan",  href: "/syarat-ketentuan" },
//   { label: "Tabel Bonus",         href: "/tabel-bonus" },
//   { label: "Cabang Adira",              href: "/cabang-adira" },
//   { label: "News",                href: "/news" },
// ];

const navLinks = [
  { label: "Gadai BPKB Mobil",   href: "/news/gadai-bpkb-mobil" },
  { label: "Gadai BPKB Motor",   href: "/news/gadai-bpkb-motor-2" },
  { label: "Take Over",          href: "/news/take-over-bpkb" },
  { label: "Kredit Bekas",       href: "/news/kredit-motor-mobil-bekas" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Tabel Bonus",        href: "/news/tabel-bonus" },
  { label: "Cabang Adira",       href: "/cabang-adira" },
  { label: "Cabang BFI",        href: "/cabang-bfi" },
  { label: "Cabang WOM",        href: "/cabang-wom" },
  { label: "News",               href: "/news" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_#e5e5e5]">
        <div className="px-4! h-14 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/images/Neozava.png"
              alt="Neozava"
              width={110}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* WA button */}
            <a
              href="https://wa.me/6281219251995?text=Hello%20admin%20neozava.com%20mau%20tanya%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#9a0000] text-white text-[12px] font-bold px-3! py-2! rounded-full"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Hubungi
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-gray-100 active:bg-gray-100 transition-colors"
            >
              {/* animated 3-bar → X */}
              <span
                className={`block w-5 h-[2px] bg-gray-700 rounded-full origin-center transition-transform duration-200 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-gray-700 rounded-full transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-gray-700 rounded-full origin-center transition-transform duration-200 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Dropdown menu ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-gray-100 bg-white px-3! py-2!">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3! py-3! rounded-xl text-[14px] font-medium text-[#646464] hover:text-[#9a0000] hover:bg-[#fdf0f0] active:bg-[#fdf0f0] transition-colors"
                  >
                    <span>{link.label}</span>
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {i < navLinks.length - 1 && (
                    <div className="mx-3 h-px bg-gray-100" />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Backdrop (closes menu on tap outside) ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
