import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

/* ─── DATA ─────────────────────────────────────────── */

const products = [
  { label: "BPKB Motor",   href: "/gadai-bpkb-motor",     icon: "🏍️" },
  { label: "Take Over",    href: "/take-over-bpkb-mobil", icon: "🔄" },
  { label: "BPKB Mobil",  href: "/gadai-bpkb-mobil",     icon: "🚗" },
  { label: "Kredit Bekas", href: "/kredit-mobil-bekas",   icon: "🤝" },
  { label: "Top Up Adira", href: "/top-up-adira",         icon: "💳" },
];

const bonusProducts = ["BPKB Motor", "Take Over", "BPKB Mobil", "Kredit Bekas", "Top Up Adira"];

const bonusSteps = [
  "Chat Whatsapp admin dengan data konsumen {Nama, No Whatsapp, Alamat, Unit kendaraan[Merk-Model-Tahun]}",
  "Konsumen akan ditindaklanjuti (Follow up) oleh Neozava dan Marketing Leasing",
  "Cek duplikat data konsumen; dialihkan ke leasing lain (Adira, BFI, WOM) jika sudah diproses",
  "Jika pencairan dana selesai, bonus dibayar Neozava ke Agen",
  "Bonus berlaku untuk pengajuan sendiri dan orang lain; pemohon tidak akan diberi tahu",
  "Debitur Adira dengan cicilan berjalan bisa dapat bonus untuk Top up; tidak berlaku BFI/WOM aktif kecuali BPKB keluar",
];

const prosesSteps = [
  { title: "Konsultasi",   desc: "Chat Whatsapp untuk info simulasi cicilan Adira, BFI, WOM" },
  { title: "Pilih Leasing", desc: "Pilih salah satu leasing yang sesuai kebutuhan" },
  { title: "Proses",        desc: "Survei, SLIK/BI Checking, Analisa Dokumen oleh leasing" },
  { title: "Persetujuan",   desc: "Info penolakan/persetujuan; penyerahan BPKB ke kantor cabang atau surveyor ambil ke rumah" },
  { title: "Pencairan",     desc: "Dana langsung ditransfer ke rekening pemohon" },
  { title: "Kredit Bekas",  desc: "Pencairan ke penjual setelah BPKB diserahkan; DP dibayar pembeli ke penjual" },
  { title: "Take Over",     desc: "Leasing baru ambil BPKB dari leasing lama; sisa hutang diurus leasing baru" },
];

const syaratDiri = [
  "Warga Negara Indonesia",
  "Berusia 21–60 tahun; status: belum menikah, menikah, cerai",
  "Tempat tinggal: rumah sendiri, pasangan, keluarga, kontrak tahunan",
  "Profesi: Karyawan (Tetap/Kontrak), PNS, Wiraswasta",
  "Jenis usaha/profesi tidak boleh melanggar hukum",
];

const syaratKendaraan = [
  "Kendaraan milik sendiri dengan BPKB Asli",
  "BPKB atas nama sendiri, pasangan, atau orang lain (lampirkan bukti pembelian)",
  "BPKB atas nama perusahaan dengan SPH (Surat Pelepasan Hak)",
  "Usia kendaraan maks. 20 tahun (Sedan/Jeep/Minibus min. 2006); maks. 13 tahun (Pick-up/Truck min. 2012)",
  "STNK / Pajak aktif",
];

const syaratDokumen = [
  "KTP Pemohon & Pasangan (jika menikah)",
  "Kartu Keluarga",
  "Rekening Listrik / PBB",
  "Bukti Penghasilan",
  "STNK",
  "BPKB & Faktur Kendaraan",
];

const mobilTable = [
  ["Pinjaman",          "Rp50.000.000"],
  ["Jangka waktu",      "12 bulan / 1 tahun"],
  ["Bunga",             "Rp4.560.000"],
  ["Total pinjaman",    "Rp54.560.000"],
  ["Angsuran/bulan",    "Rp4.546.000"],
  ["Bunga flat/bulan",  "0,76% s/d 1,1%"],
  ["Suku bunga/tahun",  "9,2% – 13,8%"],
  ["Pinjaman min-maks", "Rp10 juta – 95% nilai kendaraan"],
  ["Domisili",          "Seluruh Indonesia"],
  ["Tenor",             "6–60 Bulan"],
];

const motorTable = [
  ["Pinjaman",          "Rp10.000.000"],
  ["Jangka waktu",      "24 bulan / 2 tahun"],
  ["Bunga",             "Rp5.400.000"],
  ["Total pinjaman",    "Rp15.400.000"],
  ["Angsuran/bulan",    "Rp642.000"],
  ["Bunga flat/bulan",  "2,25%"],
  ["Suku bunga/tahun",  "27% – 29%"],
  ["Pinjaman min-maks", "Rp1 juta – 90% nilai kendaraan"],
  ["Proses kerja",      "1 Hari"],
  ["Domisili",          "Seluruh Indonesia"],
  ["Tenor",             "6–36 Bulan"],
];

/* ─── HELPERS ───────────────────────────────────────── */

const WA_SVG = (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

/* ─── SECTION WRAPPER ───────────────────────────────── */
// bg     : Tailwind bg class, default white
// pad    : true = px-5 py-7, false = no padding (full-bleed)

function Section({
  children, bg = "bg-white", pad = true,
}: {
  children: React.ReactNode;
  bg?: string;
  pad?: boolean;
}) {
  return (
    <section className={`${bg} ${pad ? "px-5 py-7" : ""}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#9a0000] mb-1">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] font-extrabold text-gray-900 leading-snug mb-5">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="h-2 bg-[#f0f0f0]" />;
}

/* ─── PAGE ──────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex flex-col flex-1">

      <Navbar />

      <main className="flex-1 flex flex-col px-3!">

        {/* ══ HERO — full bleed ══ */}
        <section className="bg-white">
          <Image
            src="/images/IMG_3640.webp"
            alt="Pinjam Uang dan e-commerce otomotif"
            width={430}
            height={280}
            className="w-full h-auto block"
            priority
          />
        </section>

        <Divider />

        {/* ══ LAYANAN ══ */}
        <Section bg="bg-white">
          <SectionLabel>Layanan Kami</SectionLabel>
          <SectionHeading>Solusi Keuangan Kendaraan</SectionHeading>
          <div className="grid grid-cols-3 gap-3">
            {products.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="flex flex-col items-center gap-2 py-4 px-2 bg-gray-50 rounded-2xl border border-gray-100 active:scale-95 transition-transform"
              >
                <span className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  {p.icon}
                </span>
                <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">
                  {p.label}
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══ BONUS IMAGES — full bleed ══ */}
        <Section bg="bg-[#f6f6f6]">
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/IMG_3662.webp"
                alt="bonus adira bfi wom finance"
                width={430}
                height={290}
                className="w-full h-auto block"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/IMG_3685.webp"
                alt="bonus adira bfi wom finance"
                width={430}
                height={290}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══ BONUS PROGRAM ══ */}
        <Section bg="bg-white">
          <SectionLabel>Program Agen</SectionLabel>
          <SectionHeading>Produk yang Mendapatkan Bonus</SectionHeading>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {bonusProducts.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fdf0f0] text-[#7a0000] text-[12px] font-semibold rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9a0000]" />
                {item}
              </span>
            ))}
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2.5">
            {bonusSteps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#9a0000] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[#646464] text-[13px] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══ PROSES GADAI BPKB ══ */}
        <Section bg="bg-white">
          <SectionLabel>Cara Kerja</SectionLabel>
          <SectionHeading>Proses Gadai BPKB</SectionHeading>

          <div className="flex flex-col gap-3">
            {prosesSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                {/* Number badge */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-[#9a0000] text-white text-[12px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {i < prosesSteps.length - 1 && (
                    <div className="w-0.5 h-4 bg-[#f5c0c0] mt-1" />
                  )}
                </div>
                {/* Card */}
                <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-4 mb-2">
                  <p className="text-[12px] font-bold text-gray-900 mb-1">{step.title}</p>
                  <p className="text-[12px] text-[#646464] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══ PERSYARATAN ══ */}
        <Section bg="bg-white">
          <SectionLabel>Kelengkapan</SectionLabel>
          <SectionHeading>Persyaratan Pengajuan</SectionHeading>

          <div className="flex flex-col gap-4">
            {/* Profil Diri */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#fdf0f0]">
                <span className="text-xl">👤</span>
                <h3 className="text-[13px] font-extrabold text-gray-900">Profil Diri (Peminjam)</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {syaratDiri.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-4 py-3 bg-white">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#9a0000] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-[#646464] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profil Kendaraan */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-50">
                <span className="text-xl">🚘</span>
                <h3 className="text-[13px] font-extrabold text-gray-900">Profil Kendaraan</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {syaratKendaraan.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-4 py-3 bg-white">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-[#646464] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dokumen */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-orange-50">
                <span className="text-xl">📄</span>
                <h3 className="text-[13px] font-extrabold text-gray-900">Dokumen</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {syaratDokumen.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-4 py-3 bg-white">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-[#646464] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══ SIMULASI ANGSURAN ══ */}
        <Section bg="bg-white">
          <SectionLabel>Simulasi</SectionLabel>
          <SectionHeading>Contoh Skema Angsuran</SectionHeading>

          <div className="flex flex-col gap-5">
            {/* BPKB Mobil */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-[#9a0000]">
                <span className="text-xl">🚗</span>
                <h3 className="text-white font-extrabold text-[15px]">BPKB Mobil</h3>
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {mobilTable.map(([label, value], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-[#646464] font-medium w-[48%] border-b border-gray-50">{label}</td>
                      <td className="px-4 py-3 text-gray-900 font-bold border-b border-gray-50">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-[11px] text-amber-700 italic">
                  Skema angsuran hanya bersifat simulasi dan bukan persetujuan pinjaman dana.
                </p>
              </div>
            </div>

            {/* BPKB Motor */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-[#7a0000]">
                <span className="text-xl">🏍️</span>
                <h3 className="text-white font-extrabold text-[15px]">BPKB Motor</h3>
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {motorTable.map(([label, value], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-[#646464] font-medium w-[48%] border-b border-gray-50">{label}</td>
                      <td className="px-4 py-3 text-gray-900 font-bold border-b border-gray-50">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-[11px] text-amber-700 italic">
                  Skema angsuran hanya bersifat simulasi dan bukan persetujuan pinjaman dana.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══ CTA — full bleed green ══ */}
        <section className="bg-[#9a0000] px-5 py-8">
          <h2 className="text-[18px] font-extrabold text-white mb-1.5 leading-snug">
            Siap Mengajukan Pinjaman?
          </h2>
          <p className="text-red-100 text-[13px] mb-6 leading-relaxed">
            Konsultasi gratis via WhatsApp — proses cepat, pencairan langsung ke rekening.
          </p>
          <a
            href="https://wa.me/6281219241995"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-white text-[#9a0000] font-extrabold text-[14px] py-3.5 rounded-full active:scale-95 transition-transform"
          >
            {WA_SVG}
            Chat WhatsApp — 0812-1924-1995
          </a>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer className="bg-white border-t border-gray-100 px-5 pt-7 pb-8">
        <Link href="/">
          <Image
            src="/images/Neozava.png"
            alt="Neozava"
            width={110}
            height={32}
            className="h-8 w-auto object-contain mb-4"
          />
        </Link>

        <p className="text-[13px] text-[#646464] leading-relaxed mb-5">
          Pinjam Uang dan e-commerce otomotif.<br />
          Sunburst CBD Lot. 1.2, Jl. Kapt. Soebijanto Djojohadikusumo,<br />
          BSD City — Tangerang Selatan 15322
        </p>

        <a
          href="https://wa.me/6281219241995"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#9a0000] font-bold text-[13px] mb-5"
        >
          {WA_SVG}
          WA 0812-1924-1995
        </a>

        <div className="flex gap-5 mb-6">
          {[
            { label: "Facebook",  href: "https://www.facebook.com/neozava" },
            { label: "Instagram", href: "https://www.instagram.com/neozava" },
            { label: "Youtube",   href: "https://youtube.com/@csneozava6249?si=VIhmAiFUnKdmMNsr" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#646464] hover:text-[#9a0000] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 flex flex-col gap-1.5">
          <p className="text-[11px] text-gray-400 italic leading-relaxed">
            Adira, BFI, dan WOM Finance berizin dan diawasi oleh Otoritas Jasa Keuangan
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-400">
            {/* <a href="/atom.xml" className="hover:text-[#9a0000] transition-colors">Langganan: Komentar (Atom)</a> */}
            <Link href="/" className="hover:text-[#9a0000] transition-colors">Beranda</Link>
            <span>© Neozava 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
