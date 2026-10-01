"use client";

import { useState } from "react";

const COLOR = "#9a0000";
const COLOR_BG = "#fdf0f0";
const WA_DEFAULT = "6281219251995";

type Section = {
  title: string;
  intro: string;
  items: string[];
  table?: { headers: string[]; rows: string[][] };
};

type Row = { label: string; value: string };
type PinjamanGroup = { pinjaman: string; rows: { tenor: string; angsuran: string }[] };

type SkemaAngsuran = {
  title: string;
  simulation?: Row[];
  comparisonGroups?: PinjamanGroup[];
  disclaimer: string;
  infoTitle: string;
  info: Row[];
};

type VehicleSyarat = {
  label: string;
  heading: string;
  sections: Section[];
  skema: SkemaAngsuran;
  waProduct: string;
};

const SYARAT: VehicleSyarat[] = [
  {
    label: "Mobil",
    heading: "Syarat Pinjaman Jaminan BPKB Mobil di BFI Finance",
    waProduct: "gadai BPKB Mobil",
    sections: [
      {
        title: "Persyaratan Profil Diri (Peminjam)",
        intro:
          "Pemohon atau pihak yang akan mengajukan pinjaman harus memenuhi kriteria yang ditentukan oleh BFI Finance berikut:",
        items: [
          "Berkewarganegaraan Indonesia.",
          "Berusia minimal 21 tahun atau 18 tahun jika sudah menikah dan maksimal 70 tahun.",
          "Status perkawinan belum menikah, menikah, dan cerai.",
          "Tempat tinggal milik sendiri, orang tua, pasangan dalam satu KK, atau kontrak tahunan.",
          "Berprofesi sebagai karyawan (tetap/kontrak), PNS, dan wiraswasta.",
          "Profesi tidak melanggar hukum.",
        ],
      },
      {
        title: "Persyaratan Profil Kendaraan",
        intro:
          "Jika yang akan dijaminkan adalah BPKB mobil, maka kendaraan harus sesuai dengan kriteria berikut:",
        items: [
          "Mobil milik sendiri dengan BPKB asli.",
          "BPKB atas nama sendiri atau pasangan.",
          "BPKB atas nama orang lain harus mencantumkan bukti pembelian.",
          "BPKB atas nama perusahaan dengan melampirkan SPH (Surat Pelepasan Hak).",
          "Minimal mobil keluaran tahun 2006 untuk jenis mobil sedan, jeep, dan minibus.",
          "Minimal mobil keluaran tahun 2013 untuk jenis mobil pick-up dan truk.",
        ],
      },
      {
        title: "Persyaratan Dokumen",
        intro:
          "Jika persyaratan di atas sudah terpenuhi, Anda bisa mulai melengkapi dokumen yang diperlukan berikut:",
        items: [
          "KTP pemohon & pasangan (apabila sudah menikah).",
          "Kartu Keluarga (KK) terbaru.",
          "Bukti kepemilikan rumah, yakni rekening listrik atau Pajak Bumi dan Bangunan (PBB).",
          "Bukti penghasilan atau slip gaji.",
          "STNK atau pajak.",
          "BPKB asli dan faktur kendaraan.",
        ],
      },
    ],
    skema: {
      title: "Skema Angsuran BFI Dana Express Mobil - Pinjaman Jaminan BPKB Mobil",
      simulation: [
        { label: "Pinjaman", value: "Rp50.000.000" },
        { label: "Jangka waktu", value: "12 bulan atau 1 tahun" },
        { label: "Bunga", value: "Rp50.000.000 x 0,76% x 12 bulan = Rp4.560.000" },
        { label: "Total pinjaman", value: "Rp50.000.000 + Rp4.560.000 = Rp54.560.000" },
        { label: "Angsuran / bulan", value: "Rp54.560.000 / 12 Bulan = Rp4.546.000" },
      ],
      disclaimer:
        "Skema angsuran hanya bersifat simulasi dan bukan persetujuan pinjaman dana. Angka bisa berubah dan disesuaikan berdasarkan penilaian lebih lanjut sesuai dengan kebijakan BFI Finance.",
      infoTitle: "Hal yang Anda perlu ketahui jika pengajuan dengan jaminan BPKB Mobil di BFI Finance",
      info: [
        { label: "Bunga Flat per Bulan", value: "Bunga rendah mulai 0,76% s/d 1,1% flat per bulan" },
        { label: "Min & Maks Suku Bunga per Tahun", value: "Mulai dari 9,2% - maksimum 13,8% (sesuai kondisi aset & kelengkapan dokumen)" },
        { label: "Min & Maks Pinjaman", value: "Mulai dari Rp10 juta hingga 90% dari nilai kendaraan" },
        { label: "Domisili", value: "Seluruh Indonesia, kecuali Aceh" },
        { label: "Min & Maks Angsuran (Tenor)", value: "3 Bulan s.d 48 Bulan" },
      ],
    },
  },
  {
    label: "Motor",
    heading: "Syarat Pinjaman Jaminan BPKB Motor di BFI Finance",
    waProduct: "gadai BPKB Motor",
    sections: [
      {
        title: "Persyaratan Profil Diri (Peminjam)",
        intro:
          "Saat mengajukan pinjaman dana cepat dari BFI Finance, Anda perlu memenuhi persyaratan profil diri. Berikut adalah rinciannya:",
        items: [
          "Warga Negara Indonesia (WNI).",
          "Berusia minimal 21 tahun (jika belum menikah) dan minimal 18 tahun (jika sudah menikah).",
          "Status belum menikah, menikah, atau cerai.",
          "Status tempat tinggal rumah milik sendiri/pasangan, keluarga, orang tua, kontrak, dan rumah dinas/perusahaan.",
          "Berprofesi sebagai karyawan tetap atau kontrak, Pegawai Negeri Sipil (PNS), dan wiraswasta.",
          "Profesi atau jenis usaha tidak melanggar hukum.",
        ],
      },
      {
        title: "Persyaratan Profil Kendaraan",
        intro:
          "Selain profil diri, kendaraan yang BPKB-nya akan dijaminkan juga harus memenuhi persyaratan. Berikut adalah persyaratannya:",
        items: [
          "Motor milik sendiri dengan BPKB asli.",
          "BPKB bisa atas nama sendiri/pasangan dan orang lain dengan melampirkan bukti pembelian.",
          "Motor minimal keluaran tahun 2013 atau maksimal usia kendaraan 13 tahun dengan merek motor Jepang dan non-Jepang.",
          "Pajak kendaraan kedaluwarsa maksimal 4 tahun (dengan potongan pencairan untuk pajak kedaluwarsa di atas 2 tahun).",
          "Pelat hitam (bukan untuk transportasi umum atau dinas pemerintah).",
        ],
      },
      {
        title: "Persyaratan Dokumen",
        intro:
          "Setelah semua persyaratan di atas terpenuhi, Anda bisa menyiapkan dokumen-dokumen yang diperlukan untuk proses pengajuan pinjaman jaminan BPKB motor ini. Persyaratan dokumennya terdiri dari:",
        items: [
          "KTP calon debitur dan pasangan (jika sudah menikah).",
          "Kartu Keluarga (KK).",
          "Foto/dokumen bukti domisili atau bukti kepemilikan rumah.",
          "STNK dan BPKB motor.",
          "Faktur kendaraan.",
        ],
      },
    ],
    skema: {
      title: "Skema Angsuran BFI Dana Express Motor - Pinjaman Jaminan BPKB Motor",
      simulation: [
        { label: "Pinjaman", value: "Rp10.000.000" },
        { label: "Jangka waktu", value: "24 bulan atau 2 tahun" },
        { label: "Bunga", value: "Rp10.000.000 x 2,25% x 24 bulan = Rp5.400.000" },
        { label: "Total pinjaman", value: "Rp10.000.000 + Rp5.400.000 = Rp15.400.000" },
        { label: "Angsuran / bulan", value: "Rp15.400.000 / 24 Bulan = Rp642.000" },
      ],
      disclaimer:
        "Skema angsuran hanya bersifat simulasi dan bukan persetujuan pinjaman dana. Angka bisa berubah dan disesuaikan berdasarkan penilaian lebih lanjut sesuai dengan kebijakan BFI Finance.",
      infoTitle: "Hal yang Anda perlu ketahui jika pengajuan dengan jaminan BPKB Motor di BFI Finance",
      info: [
        { label: "Bunga Flat per Bulan", value: "Mulai dari 2,25%" },
        { label: "Min & Maks Suku Bunga per Tahun", value: "Mulai dari 27% - maksimum 29% (sesuai kondisi aset dan kelengkapan dokumen)" },
        { label: "Min & Maks Pinjaman", value: "Mulai dari Rp1 juta hingga 80% dari nilai kendaraan" },
        { label: "Proses Kerja", value: "1 Hari" },
        { label: "Domisili", value: "Seluruh Indonesia, kecuali Aceh" },
        { label: "Min & Maks Angsuran (Tenor)", value: "6 Bulan s.d 24 Bulan" },
      ],
    },
  },
  {
    label: "Mobil Listrik",
    heading: "Syarat Pinjaman Jaminan BPKB Mobil Listrik di BFI Finance",
    waProduct: "gadai BPKB Mobil Listrik",
    sections: [
      {
        title: "Persyaratan Profil Diri (Peminjam)",
        intro:
          "Saat mengajukan pinjaman dana cepat dari BFI Finance, Anda perlu memenuhi persyaratan profil diri. Berikut adalah rinciannya:",
        items: [
          "Warga Negara Indonesia (WNI).",
          "Berusia minimal 21 tahun (jika belum menikah) dan minimal 18 tahun (jika sudah menikah).",
          "Status belum menikah, menikah, atau cerai.",
          "Status tempat tinggal rumah milik sendiri, pasangan, orang tua, atau keluarga dalam 1 Kartu Keluarga (KK), atau dengan status sewa/kontrak tahunan.",
          "Berlaku untuk semua jenis pekerjaan, kecuali pekerjaan yang terdaftar dalam aturan larangan OJK dan pencucian uang.",
          "Mobil listrik yang diagunkan bukan merupakan satu-satunya mobil milik Anda — wajib melampirkan salah satu bukti bahwa Anda punya/pernah punya mobil lain, berupa riwayat pembiayaan jaminan BPKB mobil terdahulu yang tercatat di riwayat kredit resmi, atau foto STNK/BPKB mobil lain yang Anda miliki.",
        ],
      },
      {
        title: "Persyaratan Profil Kendaraan",
        intro:
          "Selain profil diri, kendaraan yang BPKB-nya akan dijaminkan juga harus memenuhi persyaratan. Berikut adalah persyaratannya:",
        items: [
          "Mobil milik sendiri dengan BPKB asli.",
          "BPKB boleh atas nama sendiri, pasangan, atau keluarga dalam 1 KK.",
          "Harus mobil pribadi (bukan bekas taksi, rental, armada dinas/plat merah, atau ambulans).",
          "Merek & tipe mobil wajib masuk dalam daftar merek mobil listrik yang disetujui BFI (seperti BYD, Hyundai, Wuling, Aion, Chery, Denza, Geely, Jaecoo, MG).",
          "Usia mobil maksimal 4 tahun, dengan batas jarak tempuh dan durasi cicilan sebagai berikut:",
        ],
        table: {
          headers: ["Umur Mobil", "Jarak Tempuh Maks.", "Cicilan Maks."],
          rows: [
            ["1 Tahun", "25.000 KM", "4 Tahun"],
            ["2 Tahun", "50.000 KM", "4 Tahun"],
            ["3 Tahun", "75.000 KM", "3 Tahun"],
            ["4 Tahun", "100.000 KM", "2 Tahun"],
          ],
        },
      },
      {
        title: "Persyaratan Dokumen",
        intro:
          "Setelah semua persyaratan di atas terpenuhi, Anda bisa menyiapkan dokumen-dokumen yang diperlukan untuk proses pengajuan pinjaman jaminan BPKB mobil listrik ini. Persyaratan dokumennya terdiri dari:",
        items: [
          "KTP calon debitur dan pasangan (jika sudah menikah).",
          "Kartu Keluarga (KK).",
          "Foto/dokumen bukti domisili atau bukti kepemilikan rumah.",
          "STNK dan BPKB mobil listrik.",
          "Faktur kendaraan.",
        ],
      },
    ],
    skema: {
      title: "Skema Angsuran Pinjaman Jaminan BPKB Mobil Listrik",
      comparisonGroups: [
        {
          pinjaman: "Rp10.000.000",
          rows: [
            { tenor: "12 Bulan", angsuran: "Rp905.000" },
            { tenor: "24 Bulan", angsuran: "Rp487.500" },
            { tenor: "36 Bulan", angsuran: "Rp349.500" },
            { tenor: "48 Bulan", angsuran: "Rp281.000" },
          ],
        },
        {
          pinjaman: "Rp50.000.000",
          rows: [
            { tenor: "12 Bulan", angsuran: "Rp4.525.000" },
            { tenor: "24 Bulan", angsuran: "Rp2.436.500" },
            { tenor: "36 Bulan", angsuran: "Rp1.746.000" },
            { tenor: "48 Bulan", angsuran: "Rp1.404.500" },
          ],
        },
        {
          pinjaman: "Rp100.000.000",
          rows: [
            { tenor: "12 Bulan", angsuran: "Rp9.049.500" },
            { tenor: "24 Bulan", angsuran: "Rp4.872.000" },
            { tenor: "36 Bulan", angsuran: "Rp3.491.500" },
            { tenor: "48 Bulan", angsuran: "Rp2.809.000" },
          ],
        },
      ],
      disclaimer:
        "Skema angsuran hanya bersifat simulasi, jika ingin perhitungan lebih akurat silakan lihat di kalkulator form.",
      infoTitle: "Hal yang Anda perlu ketahui jika pengajuan dengan jaminan BPKB Mobil Listrik di BFI Finance",
      info: [
        { label: "Bunga Flat per Bulan", value: "Bunga rendah mulai 0,78% s/d 9,36% flat per bulan" },
        { label: "Suku Bunga per Tahun", value: "Mulai 0,78% s/d 9,36% (sesuai kondisi aset & kelengkapan dokumen)" },
        { label: "Min & Maks Pinjaman", value: "Mulai dari Rp10 juta hingga 80% dari nilai kendaraan" },
        { label: "Domisili", value: "Berlaku untuk area Jabodetabek" },
      ],
    },
  },
  {
    label: "Sertifikat Rumah",
    heading: "Syarat Pinjaman Jaminan Sertifikat Rumah/Ruko/Rukan di BFI Finance",
    waProduct: "pinjaman jaminan Sertifikat Rumah/Ruko/Rukan",
    sections: [
      {
        title: "Persyaratan Profil Pengajuan atas Nama Pribadi (Peminjam)",
        intro: "Berikut persyaratan pengajuan pinjaman jaminan sertifikat atas nama pribadi:",
        items: [
          "Warga Negara Indonesia.",
          "Berusia 21–65 tahun, dengan status perkawinan belum menikah, menikah, atau cerai.",
          "Status tempat tinggal rumah sendiri, pasangan, keluarga, atau kontrak tahunan.",
          "Profesi pekerjaan: karyawan (minimal masa kerja tetap 2 tahun) atau wiraswasta (minimal berjalan 2 tahun).",
          "Tidak dapat diterima apabila jenis usaha/profesi melanggar hukum.",
        ],
      },
      {
        title: "Persyaratan Profil Rumah/Ruko/Rukan",
        intro: "Properti yang dijadikan jaminan harus memenuhi kriteria berikut:",
        items: [
          "Rumah ditempati/dihuni dan merupakan bangunan permanen.",
          "Rumah yang dapat dibiayai harus berlokasi di cluster, komplek, atau pemukiman.",
          "Rumah tidak sedang dalam perbaikan atau renovasi.",
          "Lebar jalan rumah bisa dilewati 1 mobil dan 1 motor.",
          "Rumah tidak dekat dengan fasilitas umum, sutet, atau kuburan.",
          "Rumah tidak dalam proses jual.",
          "Jaminan yang dapat dibiayai hanya sertifikat SHM/SHGB atas nama sendiri, pasangan, orang tua kandung (keduanya wajib masih hidup), atau mertua (keduanya wajib masih hidup).",
          "Lokasi di Jabodetabek, Sidoarjo, Surabaya, Malang, Medan, Denpasar, dan Balikpapan.",
        ],
      },
    ],
    skema: {
      title: "Skema Angsuran Pinjaman Jaminan Sertipikat Rumah/Ruko/Rukan",
      simulation: [
        { label: "Pinjaman", value: "Rp300.000.000" },
        { label: "Jangka waktu", value: "60 bulan atau 5 tahun" },
        { label: "Bunga", value: "Rp300.000.000 x 1,42% x 60 bulan = Rp255.600.000" },
        { label: "Total pinjaman", value: "Rp300.000.000 + Rp255.600.000 = Rp555.600.000" },
        { label: "Angsuran / bulan", value: "Rp555.600.000 / 60 Bulan = Rp9.260.000" },
      ],
      disclaimer:
        "Skema angsuran hanya bersifat simulasi dan bukan persetujuan pinjaman dana. Angka bisa berubah dan disesuaikan berdasarkan penilaian lebih lanjut sesuai dengan kebijakan BFI Finance.",
      infoTitle: "Hal yang Anda perlu ketahui jika pengajuan dengan jaminan Sertipikat Rumah/Ruko/Rukan di BFI Finance",
      info: [
        { label: "Bunga Flat per Bulan", value: "1,42% sampai dengan 1,83%" },
        { label: "Min & Maks Suku Bunga per Tahun", value: "Mulai dari 17% - 22% (sesuai kondisi aset dan kelengkapan dokumen)" },
        { label: "Min & Maks Pinjaman", value: "Rp300 juta hingga Rp5 miliar" },
        { label: "Domisili", value: "Jabodetabek, Sidoarjo, Surabaya, Malang, Medan, dan Denpasar" },
        { label: "Min & Maks Angsuran (Tenor)", value: "12 bulan s.d 84 bulan" },
      ],
    },
  },
];

function waText(product: string, branchName: string): string {
  return `Halo admin Neozava, saya ingin tanya simulasi ${product}, cabang terdekat saya adalah ${branchName}.`;
}

export default function SyaratPinjamanBPKB({
  branchName,
  showMobilListrik = true,
  showSertifikatRumah = true,
  cardClassName = "",
}: {
  branchName: string;
  showMobilListrik?: boolean;
  showSertifikatRumah?: boolean;
  cardClassName?: string;
}) {
  const [tab, setTab] = useState(0);
  const hidden = new Set<string>([
    ...(showMobilListrik ? [] : ["Mobil Listrik"]),
    ...(showSertifikatRumah ? [] : ["Sertifikat Rumah"]),
  ]);
  const syarat = SYARAT.filter((s) => !hidden.has(s.label));
  const active = syarat[tab];

  return (
    <div className={`bg-white px-5! py-6! md:p-8! ${cardClassName}`}>
      <div className="text-center mb-4! md:mb-6!">
        <p className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-wider mb-1!" style={{ color: COLOR }}>
          Informasi Penting yang Anda Harus Tahu
        </p>
        <h2 className="text-[16px] md:text-[21px] font-extrabold text-gray-900 leading-snug">
          {active.heading}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2! mb-5! md:mb-7! overflow-x-auto">
        {syarat.map((s, i) => {
          const isActive = i === tab;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setTab(i)}
              className="shrink-0 whitespace-nowrap px-4! md:px-5! py-2! md:py-2.5! rounded-full text-[12px] md:text-[13px] font-bold transition-colors"
              style={
                isActive
                  ? { background: COLOR, color: "#fff" }
                  : { background: COLOR_BG, color: COLOR }
              }
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-5! md:grid md:grid-cols-2 md:gap-x-6! md:gap-y-7!">
        {active.sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[13px] md:text-[14px] font-extrabold text-gray-900 mb-1.5!">
              {section.title}
            </h3>
            <p className="text-[12px] md:text-[13px] text-[#646464] leading-relaxed mb-2.5!">
              {section.intro}
            </p>
            <ul className="flex flex-col gap-1.5! bg-gray-50 rounded-xl border border-gray-100 p-3! md:p-4!">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2!">
                  <span
                    className="shrink-0 mt-1.5! w-1.5! h-1.5! rounded-full"
                    style={{ background: COLOR }}
                  />
                  <span className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {section.table && (
              <div className="mt-2.5! overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-[11px] md:text-[12px] text-left border-collapse">
                  <thead>
                    <tr style={{ background: COLOR_BG }}>
                      {section.table.headers.map((h) => (
                        <th key={h} className="px-2.5! py-2! font-extrabold whitespace-nowrap" style={{ color: COLOR }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className="border-t border-gray-100">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-2.5! py-2! text-gray-700 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skema Angsuran */}
      <div className="mt-6! pt-5! md:mt-8! md:pt-7! border-t border-gray-100">
        <h3 className="text-[14px] md:text-[17px] font-extrabold text-gray-900 mb-2.5! md:mb-4! leading-snug">
          {active.skema.title}
        </h3>

        {active.skema.simulation && (
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3! md:p-5! flex flex-col mb-2.5! md:mb-4! md:max-w-md">
            {active.skema.simulation.map((row, i) => (
              <div
                key={row.label}
                className={i > 0 ? "pt-2.5! mt-2.5! border-t border-gray-200" : ""}
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-0.5!">
                  {row.label}
                </p>
                <p
                  className="text-[13px] md:text-[14px] font-extrabold leading-snug"
                  style={row.label === "Angsuran / bulan" ? { color: COLOR } : { color: "#111827" }}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {active.skema.comparisonGroups && (
          <div className="flex flex-col gap-3! md:grid md:grid-cols-3 md:gap-4! mb-2.5! md:mb-4!">
            {active.skema.comparisonGroups.map((group) => (
              <div key={group.pinjaman} className="rounded-xl border border-gray-100 overflow-hidden">
                <div
                  className="px-3! py-2! text-[12px] font-extrabold text-white"
                  style={{ background: COLOR }}
                >
                  Pinjaman {group.pinjaman}
                </div>
                <table className="w-full text-[12px] text-left border-collapse">
                  <tbody>
                    {group.rows.map((r, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                        <td className="px-3! py-1.5! text-gray-600">{r.tenor}</td>
                        <td className="px-3! py-1.5! text-right font-bold text-gray-900">{r.angsuran}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        <p className="text-[10px] md:text-[11px] text-gray-500 italic leading-relaxed mb-4!">
          * {active.skema.disclaimer}
        </p>

        <h3 className="text-[13px] md:text-[15px] font-extrabold text-gray-900 mb-2! md:mb-3!">
          {active.skema.infoTitle}
        </h3>
        <div
          className="rounded-2xl border p-4! md:p-6! flex flex-col md:grid md:grid-cols-2 md:gap-x-6!"
          style={{ background: COLOR_BG, borderColor: "#f6d9d9" }}
        >
          {active.skema.info.map((row, i) => (
            <div
              key={row.label}
              className={`md:py-2.5! ${i > 0 ? "pt-3! mt-3! border-t md:border-t-0 md:pt-2.5! md:mt-0!" : ""}`}
              style={i > 0 ? { borderColor: "#f6d9d9" } : undefined}
            >
              <p className="text-[11px] font-extrabold uppercase tracking-wide mb-0.5!" style={{ color: COLOR }}>
                {row.label}
              </p>
              <p className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4! md:mt-6! md:max-w-xs">
          <WaButton
            wa={WA_DEFAULT}
            text={waText(active.waProduct, branchName)}
            label={`Ajukan ${active.label} Sekarang`}
          />
        </div>
      </div>
    </div>
  );
}

function WaButton({ wa, text, label }: { wa: string; text: string; label: string }) {
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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      {label}
    </a>
  );
}
