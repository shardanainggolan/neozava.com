"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navGroups, navSingleLinks } from "./navData";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ── Desktop dropdown ── */
function NavDropdown({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-[14px] font-semibold text-[#646464] hover:text-[#9a0000] transition-colors py-2!"
      >
        {label}
        <ChevronDown open={open} />
      </button>

      <div
        className={`absolute left-0 top-full pt-2 transition-all duration-150 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-gray-100 py-2! min-w-[220px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4! py-2.5! text-[13.5px] font-medium text-[#646464] hover:text-[#9a0000] hover:bg-[#fdf0f0] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(navGroups[0].label);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_1px_0_#e5e5e5]">
        <div className="max-w-6xl mx-auto px-4! md:px-8! h-14 md:h-18 flex items-center justify-between gap-3 md:gap-8">

          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/images/Neozava.png"
              alt="Neozava"
              width={110}
              height={32}
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {navGroups.map((group) => (
              <NavDropdown key={group.label} label={group.label} links={group.links} />
            ))}
            {navSingleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-semibold text-[#646464] hover:text-[#9a0000] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Hamburger (mobile/tablet only) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-gray-100 active:bg-gray-100 transition-colors"
            >
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

        {/* ── Mobile drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-gray-100 bg-white px-3! py-3! flex flex-col gap-1">
            {navGroups.map((group) => {
              const isOpen = mobileGroup === group.label;
              return (
                <div key={group.label}>
                  <button
                    onClick={() => setMobileGroup(isOpen ? null : group.label)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-3! py-3! rounded-xl text-[14px] font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {group.label}
                    <ChevronDown open={isOpen} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
                    <div className="pl-3! pb-1!">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3! py-2.5! rounded-xl text-[13.5px] font-medium text-[#646464] hover:text-[#9a0000] hover:bg-[#fdf0f0] transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="h-px bg-gray-100 my-1!" />

            {navSingleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3! py-3! rounded-xl text-[14px] font-medium text-[#646464] hover:text-[#9a0000] hover:bg-[#fdf0f0] transition-colors"
              >
                {link.label}
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Backdrop (closes menu on tap outside) ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
