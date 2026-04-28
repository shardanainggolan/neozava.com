import Link from "next/link";
import Navbar from "../../Navbar";
import type { Branch, BranchApiResponse } from "../../cabang-adira/types";
import { API_BASE } from "@/lib/config";

const COLOR = "#9a0000";
const COLOR_BG = "#fdf0f0";
const WA_DEFAULT = "6281219251995";

/* ─── fetch ─────────────────────────────────────────── */

async function getBranch(slug: string): Promise<Branch | null> {
  const res = await fetch(
    `${API_BASE}/wom-branch/slug/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json: BranchApiResponse = await res.json();
  return (json.data as unknown as Branch) ?? null;
}

/* ─── helpers ───────────────────────────────────────── */

function toTitle(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function sanitiseGmaps(raw: string): string {
  return raw.replace(/\\"/g, "").replace(/"/g, "").trim();
}

function phones(b: Branch) {
  return [b.telp1, b.telp2, b.telp3].filter(Boolean);
}

function faxes(b: Branch) {
  return [b.fax1, b.fax2, b.fax3].filter(Boolean);
}

/* ─── sub-components ────────────────────────────────── */

function InfoCard({
  icon, title, lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4! text-center flex flex-col items-center gap-2!">
      <div
        className="w-12! h-12! rounded-2xl flex items-center justify-center"
        style={{ background: COLOR_BG, color: COLOR }}
      >
        {icon}
      </div>
      <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-900">
        {title}
      </h2>
      <div className="flex flex-col gap-0.5">
        {lines.length > 0 ? lines.map((l, i) => (
          <p key={i} className="text-[12px] text-[#646464] leading-snug">{l}</p>
        )) : (
          <p className="text-[12px] text-gray-300">—</p>
        )}
      </div>
    </div>
  );
}

function WaButton({
  wa, text, label,
}: {
  wa: string;
  text: string;
  label: string;
}) {
  const url = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2! py-3! rounded-full text-white text-[13px] font-bold active:scale-95 transition-transform"
      style={{ background: COLOR }}
    >
      <svg className="w-4! h-4! shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
      {label}
    </a>
  );
}

/* ─── page ──────────────────────────────────────────── */

export default async function CabangWomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = await getBranch(slug);

  if (!branch) {
    return (
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-5! py-16! text-center">
          <p className="text-4xl mb-3">🏢</p>
          <h1 className="text-[16px] font-extrabold text-gray-900 mb-1!">Cabang tidak ditemukan</h1>
          <p className="text-[13px] text-[#646464] mb-6!">Data cabang ini tidak tersedia.</p>
          <Link
            href="/cabang-wom"
            className="flex items-center gap-2! px-5! py-2.5! text-white text-[13px] font-bold rounded-full"
            style={{ background: COLOR }}
          >
            ← Kembali ke Daftar Cabang
          </Link>
        </main>
      </div>
    );
  }

  const telList = phones(branch);
  const faxList = faxes(branch);
  const mapSrc  = sanitiseGmaps(branch.gmapsLink);
  const province = toTitle(branch.region.province.province);
  const district  = toTitle(branch.region.district.district);
  const subDistrict = toTitle(branch.region.subDistrict.subDistrict);
  const pageTitle = `${branch.name} 081219251995 | Gadai BPKB`;

  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      {/* ── Red header ── */}
      <div className="bg-[#9a0000] px-5! pt-5! pb-5!">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[11px] text-red-200 mb-3! flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/cabang-wom" className="hover:text-white transition-colors">Cabang</Link>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-40">{branch.name}</span>
        </div>
        {/* Title */}
        <h1 className="text-[17px] font-extrabold text-white leading-snug">
          {pageTitle}
        </h1>
        <p className="text-[12px] text-red-200 mt-1! leading-relaxed">
          {branch.description}
        </p>
      </div>

      <main className="flex-1 flex flex-col bg-[#f6f6f6]">

        {/* ── Maps ── */}
        {mapSrc && mapSrc.includes("google.com/maps") && (
          <div className="bg-white">
            <iframe
              src={mapSrc}
              width="100%"
              height="240"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={branch.name}
            />
          </div>
        )}

        {/* ── Info cards: Alamat / Telepon / Fax ── */}
        <div className="px-5! py-5! flex gap-3!">
          <InfoCard
            icon={
              <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            }
            title="Alamat"
            lines={[
              branch.address,
              `${subDistrict}, ${district}, ${province}`,
            ]}
          />
          <InfoCard
            icon={
              <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            }
            title="Telepon"
            lines={telList}
          />
          <InfoCard
            icon={
              <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            }
            title="Fax"
            lines={faxList}
          />
        </div>

        <div className="h-2! bg-[#f0f0f0]" />

        {/* ── Ajukan Produk header ── */}
        <div className="bg-white px-5! py-6! text-center">
          <h2 className="text-[17px] font-extrabold text-gray-900 mb-1! leading-snug">
            Ajukan Produk di {branch.name}
          </h2>
          <p className="text-[13px] text-[#646464]">
            Ajukan Produk yang Anda inginkan sekarang juga
          </p>
        </div>

        <div className="h-2! bg-[#f0f0f0]" />

        {/* ── Banner image ── */}
        <div className="bg-white">
          <img
            src="/images/detail-cabang-adira.jpeg"
            alt="Detail Cabang WOM Finance"
            className="w-full h-auto block"
          />
        </div>

        <div className="h-2! bg-[#f0f0f0]" />

        {/* ── Product cards ── */}
        <div className="bg-white px-5! py-6! flex flex-col gap-4!">
          {/* Gadai BPKB */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4! flex flex-col items-center text-center gap-3!">
            <span className="text-4xl">🚗</span>
            <div>
              <h2 className="text-[15px] font-extrabold text-gray-900 mb-1!">Pinjaman Dana Gadai BPKB</h2>
              <p className="text-[12px] text-[#646464] leading-relaxed">
                Ajukan pinjaman mulai dari 3 juta rupiah dengan BPKB Motor atau pinjaman dana
                mulai dari 20 juta rupiah dengan BPKB Mobil.
              </p>
            </div>
            <WaButton
              wa={WA_DEFAULT}
              text="Halo saya ingin mengajukan gadai BPKB di WOM Finance"
              label="Ajukan Sekarang"
            />
          </div>

          {/* Take Over BPKB */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4! flex flex-col items-center text-center gap-3!">
            <span className="text-4xl">🔄</span>
            <div>
              <h2 className="text-[15px] font-extrabold text-gray-900 mb-1!">Take Over BPKB</h2>
              <p className="text-[12px] text-[#646464] leading-relaxed">
                Pindahkan pinjaman BPKB Anda ke WOM Finance dengan bunga lebih ringan
                dan proses yang mudah dan cepat.
              </p>
            </div>
            <WaButton
              wa={WA_DEFAULT}
              text="Halo saya ingin mengajukan Take Over BPKB di WOM Finance"
              label="Ajukan Sekarang"
            />
          </div>
        </div>

        <div className="h-2! bg-[#f0f0f0]" />

        {/* ── Back button ── */}
        <div className="bg-white px-5! py-5!">
          <Link
            href="/cabang-wom"
            className="w-full flex items-center justify-center gap-2! py-3! rounded-full border-2 text-[13px] font-bold active:scale-95 transition-transform"
            style={{ borderColor: COLOR, color: COLOR }}
          >
            <svg className="w-4! h-4!" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Kembali ke Daftar Cabang
          </Link>
        </div>

      </main>
    </div>
  );
}
