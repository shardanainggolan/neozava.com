import Link from "next/link";
import Navbar from "../../Navbar";
import MapFacade from "../../MapFacade";
import type { Branch, BranchApiResponse } from "../../cabang-adira/types";
import { API_BASE } from "@/lib/config";
import SyaratPinjamanBPKB from "./SyaratPinjamanBPKB";

const COLOR = "#9a0000";
const COLOR_BG = "#fdf0f0";
const WA_DEFAULT = "6281219251995";

/* ─── fetch ─────────────────────────────────────────── */

async function getBranch(slug: string): Promise<Branch | null> {
  const res = await fetch(
    `${API_BASE}/bfi-branch/slug/${slug}`,
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
  // The API sometimes stores the whole pasted <iframe> snippet (src plus
  // width/height/style/... attributes) in this field instead of just the
  // URL. Unescape stray `\"`, then cut at the first real quote so only
  // the URL survives.
  return raw.replace(/\\"/g, '"').split('"')[0].trim();
}

function phones(b: Branch) {
  return [b.telp1, b.telp2, b.telp3].filter(Boolean);
}

function waText(product: string, branchName: string): string {
  return `Halo admin Neozava, saya ingin tanya simulasi ${product}, cabang terdekat saya adalah ${branchName}.`;
}

const MOBIL_LISTRIK_AREAS = ["JAKARTA", "BOGOR", "TANGERANG", "BEKASI", "DEPOK"];

const SERTIFIKAT_RUMAH_AREAS = [
  "JAKARTA", "BOGOR", "TANGERANG", "BEKASI", "DEPOK",
  "SIDOARJO", "SURABAYA", "MALANG", "MEDAN", "DENPASAR", "BALIKPAPAN",
];

function isMobilListrikArea(b: Branch): boolean {
  const district = b.region.district.district.toUpperCase();
  return MOBIL_LISTRIK_AREAS.some((area) => district.includes(area));
}

function isSertifikatRumahArea(b: Branch): boolean {
  const district = b.region.district.district.toUpperCase();
  return SERTIFIKAT_RUMAH_AREAS.some((area) => district.includes(area));
}

const PROSES_STEPS = [
  {
    icon: "💬",
    text: (
      <>
        Chat WhatsApp admin, akan di-info <strong className="text-gray-900">maksimal pencairan, cicilan per bulan,</strong> dan tenor.
      </>
    ),
  },
  {
    icon: "📋",
    text: (
      <>
        Jika setuju dengan penawaran, lanjut proses <strong className="text-gray-900">cek dokumen persyaratan</strong> dan kemampuan bayar.
      </>
    ),
  },
  {
    icon: "🚚",
    text: (
      <>
        Jika pengajuan disetujui, penyerahan BPKB ke kantor cabang terdekat atau bisa <strong className="text-gray-900">dijemput surveyor</strong>.
      </>
    ),
  },
  {
    icon: "🏦",
    text: (
      <>
        Pencairan langsung ke <strong className="text-gray-900">nomor rekening pemohon</strong> oleh leasing.
      </>
    ),
  },
];

const KEUNGGULAN = [
  {
    icon: (
      <svg className="w-6! h-6!" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
      </svg>
    ),
    title: "Pencairan Tinggi",
    desc: "Plafon pinjaman besar, menyesuaikan nilai kendaraan Anda.",
  },
  {
    icon: (
      <svg className="w-6! h-6!" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Proses Cepat",
    desc: "Dana cair dalam 1–2 hari kerja setelah survei kendaraan.",
  },
  {
    icon: (
      <svg className="w-6! h-6!" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Aman & Legal",
    desc: "BPKB tersimpan aman di lembaga pembiayaan resmi, berizin OJK.",
  },
];

const BADGE_SVG = (
  <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const LOCK_SVG = (
  <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const CHECK_SVG = (
  <svg className="w-3.5! h-3.5! shrink-0 mt-0.5!" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const PIN_SVG = (
  <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const PHONE_SVG = (
  <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const WA_ICON = (
  <svg className="w-4! h-4! shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

/* ─── sub-components ────────────────────────────────── */

function InfoCard({
  icon, title, lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-3.5!">
      <div
        className="w-11! h-11! shrink-0 rounded-2xl flex items-center justify-center"
        style={{ background: COLOR_BG, color: COLOR }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 pt-0.5!">
        <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-900">
          {title}
        </h2>
        {lines.length > 0 ? lines.map((l, i) => (
          <p key={i} className="text-[12px] text-[#646464] leading-snug">{l}</p>
        )) : (
          <p className="text-[12px] text-gray-500">—</p>
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
      className="w-full flex items-center justify-center gap-2! py-3! md:py-3.5! rounded-full text-white text-[13px] md:text-[14px] font-bold active:scale-95 transition-transform"
      style={{ background: COLOR }}
    >
      {WA_ICON}
      {label}
    </a>
  );
}

/* ─── page ──────────────────────────────────────────── */

export default async function CabangBfiDetailPage({
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
            href="/cabang-bfi"
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
  const mapSrc  = sanitiseGmaps(branch.gmapsLink);
  const province = toTitle(branch.region.province.province);
  const district  = toTitle(branch.region.district.district);
  const subDistrict = toTitle(branch.region.subDistrict.subDistrict);
  const showMobilListrik = isMobilListrikArea(branch);
  const showSertifikatRumah = isSertifikatRumahArea(branch);
  const heroWaUrl = `https://wa.me/${WA_DEFAULT}?text=${encodeURIComponent(waText("estimasi pinjaman gadai BPKB di BFI Finance", branch.name))}`;

  const SERVICES = [
    {
      emoji: "🏍️",
      title: "Gadai BPKB Motor",
      requirements: ["KTP & KK", "STNK dan BPKB motor asli", "Bukti penghasilan"],
      product: "gadai BPKB Motor di BFI Finance",
    },
    {
      emoji: "🚗",
      title: "Gadai BPKB Mobil",
      requirements: ["KTP & KK", "STNK dan BPKB mobil asli", "Bukti penghasilan"],
      product: "gadai BPKB Mobil di BFI Finance",
    },
    ...(showMobilListrik ? [{
      emoji: "🔋",
      title: "Gadai BPKB Mobil Listrik",
      requirements: ["KTP & KK", "STNK dan BPKB mobil listrik asli", "Bukti penghasilan"],
      product: "gadai BPKB Mobil Listrik di BFI Finance",
    }] : []),
    ...(showSertifikatRumah ? [{
      emoji: "🏠",
      title: "Jaminan Sertifikat Rumah",
      requirements: ["KTP & KK", "Sertifikat SHM/SHGB asli", "Bukti penghasilan"],
      product: "pinjaman jaminan Sertifikat Rumah/Ruko/Rukan di BFI Finance",
    }] : []),
  ];

  const CARD = "md:rounded-3xl md:border md:border-gray-100 md:shadow-[0_2px_24px_rgba(0,0,0,0.04)]";

  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      {/* ── 1. Hero ── */}
      <div className="bg-gradient-to-b from-[#fdf3f3] to-white px-5! pt-6! pb-8! md:pt-16! md:pb-16!">
        <div className="md:max-w-6xl md:mx-auto md:px-8!">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] md:text-[12px] text-gray-400 mb-4! md:mb-6! flex-wrap">
            <Link href="/" className="hover:text-[#9a0000] transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/cabang-bfi" className="hover:text-[#9a0000] transition-colors">Cabang</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium truncate max-w-[160px] md:max-w-none">{branch.name}</span>
          </div>

          <div className="md:grid md:grid-cols-[1fr_360px] md:gap-10! md:items-center">
            <div>
              <h1 className="text-[24px] md:text-[42px] font-extrabold text-gray-900 leading-tight md:leading-[1.15] mb-3! md:mb-4!">
                Gadai BPKB Motor &amp; Mobil Resmi — {branch.name}
              </h1>
              <p className="text-[14px] md:text-[18px] text-[#646464] leading-relaxed mb-5! md:mb-7!">
                Proses cepat, pencairan tinggi hingga 90%, aman, dan resmi berizin serta diawasi oleh OJK.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2.5! md:gap-3! mb-6! md:mb-8!">
                <div className="flex items-center gap-2! bg-white border border-gray-200 rounded-full px-4! py-2! shadow-sm text-[#9a0000]">
                  {BADGE_SVG}
                  <span className="text-[12px] md:text-[13px] font-extrabold">Berizin &amp; Diawasi oleh OJK</span>
                </div>
                <div className="flex items-center gap-2! text-[12px] md:text-[13px] text-[#646464]">
                  {LOCK_SVG}
                  Data Anda aman &amp; dijamin kerahasiaannya
                </div>
              </div>

              {/* Hero CTA */}
              <a
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5! bg-[#9a0000] text-white text-[14px] md:text-[16px] font-bold px-6! py-3.5! md:px-8! md:py-4! rounded-full hover:bg-[#7a0000] active:scale-95 transition-all shadow-[0_10px_30px_rgba(154,0,0,0.25)]"
              >
                {WA_ICON}
                Cek Estimasi Pinjaman via WhatsApp
              </a>
            </div>

            {/* Quick contact card — fills the hero's right column on desktop */}
            <div className="hidden md:block">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(154,0,0,0.08)] p-7!">
                <div className="flex items-center gap-2! mb-4!">
                  {PIN_SVG}
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9a0000]">Cabang Terdekat</span>
                </div>
                <h2 className="text-[16px] font-extrabold text-gray-900 mb-2! leading-snug">{branch.name}</h2>
                <p className="text-[12px] text-[#646464] leading-relaxed mb-5!">{branch.address}</p>

                {telList.length > 0 && (
                  <div className="border-t border-gray-100 pt-4! mb-5! flex flex-col gap-2.5!">
                    {telList.map((t) => (
                      <a
                        key={t}
                        href={`tel:${t}`}
                        className="flex items-center gap-2! text-[13px] font-extrabold text-gray-900 hover:text-[#9a0000] transition-colors"
                      >
                        {PHONE_SVG}
                        {t}
                      </a>
                    ))}
                  </div>
                )}

                <a
                  href={heroWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2! py-3! rounded-full bg-[#9a0000] text-white text-[13px] font-bold hover:bg-[#7a0000] active:scale-95 transition-colors"
                >
                  {WA_ICON}
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col bg-white">

        {/* ── 2. Keunggulan ── */}
        <div className="px-5! py-8! md:py-14!">
          <div className="md:max-w-6xl md:mx-auto md:px-8!">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4! md:gap-6!">
              {KEUNGGULAN.map((k) => (
                <div
                  key={k.title}
                  className="bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100 p-5! md:p-7! flex flex-col items-center text-center md:items-start md:text-left gap-3!"
                >
                  <div className="w-12! h-12! shrink-0 rounded-2xl bg-[#fdf0f0] flex items-center justify-center text-[#9a0000]">
                    {k.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] md:text-[16px] font-extrabold text-gray-900 mb-1!">{k.title}</h3>
                    <p className="text-[12px] md:text-[13px] text-[#646464] leading-relaxed">{k.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Layanan Kami (structured product cards) ── */}
        <div className="bg-[#f7f7f7] px-5! py-8! md:py-14!">
          <div className="md:max-w-6xl md:mx-auto md:px-8!">
            <div className="text-center mb-6! md:mb-10!">
              <h2 className="text-[20px] md:text-[28px] font-extrabold text-gray-900 mb-2!">
                Layanan Kami di {branch.name}
              </h2>
              <p className="text-[13px] md:text-[14px] text-[#646464]">
                Pilih layanan yang sesuai dengan kebutuhan Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4! md:gap-5!">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-5! md:p-6! flex flex-col gap-3!"
                >
                  <span className="text-3xl md:text-4xl">{s.emoji}</span>
                  <h3 className="text-[15px] md:text-[16px] font-extrabold text-gray-900 leading-snug">{s.title}</h3>
                  <ul className="flex flex-col gap-1.5! flex-1">
                    {s.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-1.5! text-[12px] text-gray-700 leading-snug">
                        <span className="text-[#9a0000]">{CHECK_SVG}</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <WaButton
                    wa={WA_DEFAULT}
                    text={waText(s.product, branch.name)}
                    label="Ajukan Layanan Ini"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4. Cabang & Lokasi ── */}
        <div className="px-5! py-8! md:py-14!">
          <div className="md:max-w-6xl md:mx-auto md:px-8!">
            <div className="text-center mb-6! md:mb-10!">
              <h2 className="text-[20px] md:text-[28px] font-extrabold text-gray-900 mb-2!">
                Kunjungi Kantor Cabang Kami
              </h2>
              <p className="text-[13px] md:text-[14px] text-[#646464]">
                {branch.name}
              </p>
            </div>

            <div className={`bg-white md:grid md:grid-cols-[1fr_1.2fr] overflow-hidden ${CARD}`}>
              {/* Info */}
              <div className="p-5! md:p-8! flex flex-col gap-5! md:gap-6! border-b md:border-b-0 md:border-r border-gray-100">
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  }
                  title="Jam Operasional"
                  lines={["Senin – Sabtu: 08.00 – 17.00 WIB", "Minggu & hari libur nasional: tutup"]}
                />
                <InfoCard
                  icon={
                    <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                  }
                  title="Area Cakupan"
                  lines={[`Melayani ${subDistrict}, ${district} dan sekitarnya`]}
                />

                <div className="pt-1!">
                  <WaButton
                    wa={WA_DEFAULT}
                    text={waText("pencairan, cicilan, dan tenor di BFI Finance", branch.name)}
                    label="Tanya Simulasi Pencairan"
                  />
                </div>
              </div>

              {/* Maps */}
              <MapFacade
                mapSrc={mapSrc}
                lat={branch.latitude}
                lng={branch.longitude}
                label={branch.name}
                height={280}
                fill
              />
            </div>
          </div>
        </div>

        {/* ── Detail proses & persyaratan ── */}
        <div className="bg-[#f7f7f7] px-5! py-8! md:py-14!">
          <div className="md:max-w-6xl md:mx-auto md:px-8! md:flex md:flex-col md:gap-6!">
            <div className={`bg-white px-5! py-6! md:p-8! ${CARD}`}>
              <div className="text-center mb-5! md:mb-7!">
                <h2 className="text-[17px] md:text-[21px] font-extrabold text-gray-900 mb-1! leading-snug">
                  Langkah-Langkah Gadai BPKB, Kredit Bekas &amp; Take Over BPKB
                </h2>
              </div>

              <div className="flex flex-col gap-3! md:grid md:grid-cols-2 md:gap-4!">
                {PROSES_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start gap-3!">
                    <div
                      className="shrink-0 w-7! h-7! rounded-full text-white flex items-center justify-center font-extrabold text-[12px]"
                      style={{ background: COLOR }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-3! flex items-center gap-3!">
                      <span className="text-xl shrink-0">{step.icon}</span>
                      <p className="text-[12px] md:text-[13px] text-[#646464] leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:max-w-xs md:mt-6! mt-6!">
                <WaButton
                  wa={WA_DEFAULT}
                  text={waText("pencairan, cicilan, dan tenor di BFI Finance", branch.name)}
                  label="Tanya Simulasi Pencairan"
                />
              </div>
            </div>

            {/* Syarat Pinjaman Jaminan BPKB */}
            <SyaratPinjamanBPKB
              branchName={branch.name}
              showMobilListrik={showMobilListrik}
              showSertifikatRumah={showSertifikatRumah}
              cardClassName={CARD}
            />
          </div>
        </div>

        {/* ── Back button ── */}
        <div className="px-5! py-6! md:py-10! flex justify-center">
          <Link
            href="/cabang-bfi"
            className="w-full md:w-auto flex items-center justify-center gap-2! py-3! px-5! md:px-8! rounded-full border-2 border-[#9a0000] text-[#9a0000] text-[13px] font-bold active:scale-95 transition-colors md:hover:bg-[#9a0000] md:hover:text-white"
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
