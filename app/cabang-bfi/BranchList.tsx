"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Branch } from "../cabang-adira/types";

const COLOR = "#9a0000";
const COLOR_BG = "#fdf0f0";

/* ── phone formatter ── */
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (!d) return raw;
  if (d.startsWith("021") || d.startsWith("022")) {
    return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  }
  return d.slice(0, 3) + "-" + d.slice(3);
}

function phones(b: Branch): string[] {
  return [b.telp1, b.telp2, b.telp3].filter(Boolean);
}

/* ── province label ── */
function toTitle(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── BranchCard ── */
function BranchCard({ branch }: { branch: Branch }) {
  const telList = phones(branch);
  const province = toTitle(branch.region.province.province);
  const district = toTitle(branch.region.district.district);

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Stretched link — covers the whole card, sits behind interactive elements */}
      <Link
        href={`/cabang-bfi/${branch.slug}`}
        aria-label={branch.name}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 px-4! py-4!">
        {/* Province chip */}
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-wider px-2! py-0.5! rounded-full mb-2!"
          style={{ color: COLOR, background: COLOR_BG }}
        >
          {province}
        </span>

        {/* Name + chevron */}
        <div className="flex items-start justify-between gap-2! mb-1!">
          <h3 className="text-[14px] font-extrabold text-gray-900 leading-snug">
            {branch.name}
          </h3>
          <svg className="w-4! h-4! shrink-0 mt-0.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* District */}
        <p className="text-[11px] text-[#646464] mb-3!">
          {district} · {branch.region.subDistrict.subDistrict}
        </p>

        {/* Address */}
        <div className="flex gap-2! items-start mb-3!">
          <svg className="w-4! h-4! shrink-0 mt-0.5" style={{ color: COLOR }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-[12px] text-[#646464] leading-snug">
            {branch.address}, {branch.region.subDistrict.subDistrict}, Kode Pos {branch.postalCode}
          </p>
        </div>

        {/* Phone */}
        {telList.length > 0 && (
          <div className="flex gap-2! items-start mb-4!">
            <svg className="w-4! h-4! shrink-0 mt-0.5" style={{ color: COLOR }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div className="flex flex-col gap-0.5">
              {telList.map((t, i) => (
                <a
                  key={i}
                  href={`tel:${t}`}
                  className="text-[12px] font-medium"
                  style={{ color: COLOR }}
                >
                  {formatPhone(t)}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Detail button */}
        <Link
          href={`/cabang-bfi/${branch.slug}`}
          className="w-full flex items-center justify-center gap-2! py-2.5! rounded-xl text-white text-[12px] font-bold active:scale-95 transition-transform"
          style={{ background: COLOR }}
        >
          <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Lihat Detail Cabang
        </Link>
      </div>
    </div>
  );
}

/* ── Main BranchList ── */
export default function BranchList({ branches }: { branches: Branch[] }) {
  const [search, setSearch] = useState("");
  const [activeProvince, setActiveProvince] = useState<string>("semua");

  /* unique provinces */
  const provinces = useMemo(() => {
    const set = new Set(branches.map((b) => b.region.province.province));
    return Array.from(set).sort();
  }, [branches]);

  /* filtered */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return branches.filter((b) => {
      const matchProvince =
        activeProvince === "semua" || b.region.province.province === activeProvince;
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.region.district.district.toLowerCase().includes(q) ||
        b.region.subDistrict.subDistrict.toLowerCase().includes(q);
      return matchProvince && matchSearch;
    });
  }, [branches, search, activeProvince]);

  return (
    <>
      {/* ── Search ── */}
      <div className="px-5! pt-5! pb-3! bg-white border-b border-gray-100">
        <div className="relative">
          <svg className="absolute left-3! top-1/2 -translate-y-1/2 w-4! h-4! text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Cari nama cabang, kota, atau alamat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9! pr-4! py-2.5! rounded-xl bg-gray-50 border border-gray-200 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition-colors"
            style={{ "--tw-ring-color": COLOR } as React.CSSProperties}
            onFocus={(e) => (e.currentTarget.style.borderColor = COLOR)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "")}
          />
        </div>
      </div>

      {/* ── Province filter ── */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-2! px-5! py-3! min-w-max">
          {["semua", ...provinces].map((p) => (
            <button
              key={p}
              onClick={() => setActiveProvince(p)}
              className={`shrink-0 px-3! py-1.5! rounded-full text-[11px] font-bold transition-colors ${
                activeProvince === p
                  ? "text-white"
                  : "bg-gray-100 text-[#646464] hover:bg-gray-200"
              }`}
              style={activeProvince === p ? { background: COLOR } : undefined}
            >
              {p === "semua" ? "Semua" : toTitle(p)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result count ── */}
      <div className="px-5! py-3! bg-[#f6f6f6]">
        <p className="text-[11px] text-[#646464]">
          Menampilkan <span className="font-bold text-gray-900">{filtered.length}</span> cabang
          {activeProvince !== "semua" && (
            <> di <span className="font-bold text-gray-900">{toTitle(activeProvince)}</span></>
          )}
        </p>
      </div>

      {/* ── List ── */}
      <div className="px-5! py-4! flex flex-col gap-4!">
        {filtered.length === 0 ? (
          <div className="py-16! text-center">
            <p className="text-4xl mb-3">🏢</p>
            <p className="text-[14px] font-bold text-gray-900 mb-1">Cabang tidak ditemukan</p>
            <p className="text-[12px] text-[#646464]">Coba kata kunci atau filter yang berbeda</p>
          </div>
        ) : (
          filtered.map((b) => (
            <BranchCard key={b.branchId} branch={b} />
          ))
        )}
      </div>
    </>
  );
}
