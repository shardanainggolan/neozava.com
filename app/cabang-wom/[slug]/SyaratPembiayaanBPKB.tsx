"use client";

import { useState } from "react";

const COLOR = "#9a0000";
const COLOR_BG = "#fdf0f0";
const WA_DEFAULT = "6281219251995";

type Row = { label: string; value: string };

type VehiclePlan = {
  label: string;
  heading: string;
  waProduct: string;
  fiturUtama: Row[];
  simulasiTable: { headers: string[]; row: string[] };
  contohSimulasi: Row[];
  totalDibayar: Row[];
};

const INTRO =
  "Pembiayaan jaminan BPKB yang bertujuan untuk modal kerja (produktif) dengan cara sales and lease back (Jual dan Sewa Balik).";

const PERSYARATAN = [
  "BPKB Asli",
  "Fotokopi KTP",
  "Fotokopi Kartu Keluarga",
  "Slip Gaji atau bukti penghasilan (bagi non karyawan) Asli",
  "Fotokopi STNK",
  "Fotokopi Rekening Listrik",
];

const MANFAAT =
  "Dengan memperoleh fasilitas pembiayaan, Anda dapat memperoleh pembiayaan yang diperlukan untuk keperluan usaha/aktivitas produktif, dengan melakukan pembayaran sewa pembiayaan.";

const RISIKO: { text: string; subitems?: string[] }[] = [
  {
    text: "Risiko eksekusi dan penjualan Objek Sewa Pembiayaan apabila Anda tidak melunasi kewajiban pembayaran.",
  },
  {
    text: "Risiko tambahan biaya yang muncul apabila terjadi pembiayaan macet (denda, dan biaya eksekusi agunan).",
  },
  {
    text: "Risiko eksekusi agunan jika:",
    subitems: [
      "Konsumen lalai dalam melakukan pembayaran angsuran sewa pembiayaan sesuai dengan ketentuan yang tercantum dalam Perjanjian Sewa Pembiayaan;",
      "Konsumen melakukan pengalihan dan/atau penggadaian tanpa sepengetahuan WOM Finance.",
    ],
  },
  {
    text: "Risiko reputasi berupa tercatatnya riwayat pembiayaan pada Sistem Layanan Informasi Keuangan (SLIK) ketika Anda menunggak pembiayaan.",
  },
];

const PRODUCT_DESC =
  "Pembiayaan dalam bentuk penjualan suatu barang oleh Konsumen kepada WOM Finance yang disertai dengan menyewa-pembiayaankan kembali barang tersebut kepada Konsumen yang sama.";

const VEHICLES: VehiclePlan[] = [
  {
    label: "Motor",
    heading: "WOM MotorKu — Pembiayaan Jaminan BPKB Motor",
    waProduct: "pembiayaan jaminan BPKB Motor (MotorKu) di WOM Finance",
    fiturUtama: [
      { label: "Pokok Pembiayaan", value: "Rp 2.000.000,- sampai dengan BMPP (Batas Maksimum Pemberian Pembiayaan)" },
      { label: "Angsuran", value: "Rp 692.000,- (tenor 36 bulan) sampai dengan Rp 1.476.000,- (tenor 11 bulan)" },
      { label: "Imbalan", value: "22,96% sampai dengan 26,51% flat per tahun" },
      { label: "Kendaraan yang akan dijadikan jaminan", value: "HONDA BEAT ESP CBS Tahun 2024 (contoh)" },
      { label: "Jangka waktu pembiayaan/tenor", value: "11 bulan sampai dengan 36 bulan" },
      { label: "Asuransi dan Jenis Pertanggungan", value: "Total Loss Only" },
    ],
    simulasiTable: {
      headers: ["6 Bulan", "12 Bulan", "18 Bulan", "24 Bulan", "36 Bulan"],
      row: ["Rp 0,-", "Rp 1.375.000,-", "Rp 1.025.000,-", "Rp 852.000,-", "Rp 692.000,-"],
    },
    contohSimulasi: [
      { label: "Merk/Type Kendaraan (Objek Sewa Pembiayaan)", value: "Honda / HONDA BEAT ESP CBS" },
      { label: "Nominal Pembiayaan", value: "Rp 12.000.000,-" },
      { label: "Harga Pembelian Objek Pembiayaan", value: "Rp 16.500.000,-" },
      { label: "Imbalan", value: "24,94% flat per tahun" },
      { label: "Jangka Waktu Sewa Pembiayaan", value: "18 bulan" },
      { label: "Angsuran Sewa Pembiayaan per bulan", value: "Rp 1.025.000,-" },
    ],
    totalDibayar: [
      { label: "Total DP", value: "Rp 0,-" },
      { label: "Biaya Administrasi, Asuransi, dan Provisi", value: "Diamortisasi" },
      { label: "Total biaya", value: "Biaya Administrasi, Biaya Asuransi, dan Biaya Provisi diamortisasi (diperhitungkan) ke dalam pokok pembiayaan" },
      { label: "Angsuran ke-1", value: "Rp 1.025.000,-" },
      { label: "Total dibayar ke-1", value: "Rp 1.025.000,-" },
    ],
  },
  {
    label: "Mobil",
    heading: "WOM MobilKu — Pembiayaan Jaminan BPKB Mobil",
    waProduct: "pembiayaan jaminan BPKB Mobil (MobilKu) di WOM Finance",
    fiturUtama: [
      { label: "Pokok Pembiayaan", value: "Minimal Rp 20.000.000,- sampai Batas Maksimum Pemberian Pembiayaan (BMPP)" },
      { label: "Angsuran", value: "Disesuaikan dengan pokok pembiayaan, tipe kendaraan, dan usia kendaraan" },
      { label: "Imbalan", value: "6,47% sampai dengan 23,36% flat per tahun" },
      { label: "Kendaraan yang akan dijadikan jaminan", value: "Mobil Toyota Avanza (contoh)" },
      { label: "Jangka waktu pembiayaan/tenor", value: "6 bulan sampai dengan 60 bulan" },
      { label: "Asuransi dan Jenis Pertanggungan", value: "Total Loss Only sampai dengan All Risk" },
    ],
    simulasiTable: {
      headers: ["6 Bulan", "12 Bulan", "18 Bulan", "24 Bulan", "36 Bulan", "48 Bulan", "60 Bulan"],
      row: [
        "Rp 18.810.000,-",
        "Rp 10.325.000,-",
        "Rp 7.310.000,-",
        "Rp 5.815.000,-",
        "Rp 4.345.000,-",
        "Rp 3.715.000,-",
        "Rp 3.370.000,-",
      ],
    },
    contohSimulasi: [
      { label: "Merk/Type Kendaraan (Objek Sewa Pembiayaan)", value: "Toyota / Avanza Grand New 1.3 G M/T 2015" },
      { label: "Nominal Pembiayaan", value: "Rp 109.186.000,-" },
      { label: "Harga Pembelian Objek Sewa Pembiayaan", value: "Rp 100.000.000,-" },
      { label: "Imbalan", value: "13,47% flat per tahun" },
      { label: "Jangka Waktu Sewa Pembiayaan", value: "12 bulan" },
      { label: "Angsuran Sewa Pembiayaan per bulan", value: "Rp 10.325.000,-" },
    ],
    totalDibayar: [
      { label: "Total DP", value: "Rp 0,-" },
      { label: "Biaya Administrasi, Asuransi, Provisi", value: "Diamortisasi" },
      { label: "Total biaya", value: "Biaya Administrasi, Biaya Asuransi, dan Biaya Provisi diamortisasi (diperhitungkan) ke dalam pokok pembiayaan" },
      { label: "Angsuran ke-1", value: "Rp 10.325.000,-" },
      { label: "Total dibayar ke-1", value: "Rp 10.325.000,-" },
    ],
  },
];

function waText(product: string, branchName: string): string {
  return `Halo admin Neozava, saya ingin tanya simulasi ${product}, cabang terdekat saya adalah ${branchName}.`;
}

function RowList({ rows }: { rows: Row[] }) {
  return (
    <div
      className="rounded-2xl border p-4! md:p-6! flex flex-col"
      style={{ background: COLOR_BG, borderColor: "#f6d9d9" }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={i > 0 ? "pt-3! mt-3! border-t" : ""}
          style={i > 0 ? { borderColor: "#f6d9d9" } : undefined}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wide mb-0.5!" style={{ color: COLOR }}>
            {row.label}
          </p>
          <p className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">{row.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function SyaratPembiayaanBPKB({
  branchName,
  cardClassName = "",
}: {
  branchName: string;
  cardClassName?: string;
}) {
  const [tab, setTab] = useState(0);
  const active = VEHICLES[tab];

  return (
    <div className={`bg-white px-5! py-6! md:p-8! ${cardClassName}`}>
      <div className="text-center mb-4! md:mb-6!">
        <p className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-wider mb-1!" style={{ color: COLOR }}>
          Informasi Penting yang Anda Harus Tahu
        </p>
        <h2 className="text-[16px] md:text-[21px] font-extrabold text-gray-900 leading-snug">
          Pembiayaan Jaminan BPKB (Sales and Lease Back) di WOM Finance
        </h2>
      </div>

      <p className="text-[12px] md:text-[13px] text-[#646464] leading-relaxed mb-5! md:mb-6!">
        {INTRO}
      </p>

      {/* Persyaratan */}
      <div className="mb-5! md:mb-7!">
        <h3 className="text-[13px] md:text-[14px] font-extrabold text-gray-900 mb-2!">Persyaratan</h3>
        <ul className="flex flex-col gap-1.5! md:grid md:grid-cols-2 md:gap-x-6! md:gap-y-1.5! bg-gray-50 rounded-xl border border-gray-100 p-3! md:p-4!">
          {PERSYARATAN.map((item, i) => (
            <li key={i} className="flex items-start gap-2!">
              <span
                className="shrink-0 w-5! h-5! rounded-full bg-white border flex items-center justify-center text-[10px] font-extrabold"
                style={{ borderColor: "#f6d9d9", color: COLOR }}
              >
                {i + 1}
              </span>
              <span className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Manfaat & Risiko */}
      <div className="mb-6! md:mb-8!">
        <h3 className="text-[13px] md:text-[14px] font-extrabold text-gray-900 mb-2!">Manfaat &amp; Risiko</h3>

        <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1!" style={{ color: COLOR }}>
          Manfaat
        </p>
        <p className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed mb-3! md:mb-4!">{MANFAAT}</p>

        <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5!" style={{ color: COLOR }}>
          Risiko
        </p>
        <ol className="flex flex-col gap-2! list-decimal list-inside">
          {RISIKO.map((item, i) => (
            <li key={i} className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">
              {item.text}
              {item.subitems && (
                <ol className="mt-1.5! flex flex-col gap-1.5! pl-5!" style={{ listStyleType: "lower-alpha" }}>
                  {item.subitems.map((sub, si) => (
                    <li key={si} className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">
                      {sub}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-[12px] md:text-[13px] text-[#646464] leading-relaxed mb-6! md:mb-8! pt-5! md:pt-6! border-t border-gray-100">
        {PRODUCT_DESC}
      </p>

      {/* Tabs */}
      <div className="flex gap-2! mb-5! md:mb-7! overflow-x-auto">
        {VEHICLES.map((v, i) => {
          const isActive = i === tab;
          return (
            <button
              key={v.label}
              type="button"
              onClick={() => setTab(i)}
              className="shrink-0 whitespace-nowrap px-5! py-2! md:py-2.5! rounded-full text-[12px] md:text-[13px] font-bold transition-colors"
              style={
                isActive
                  ? { background: COLOR, color: "#fff" }
                  : { background: COLOR_BG, color: COLOR }
              }
            >
              {v.label}
            </button>
          );
        })}
      </div>

      <h3 className="text-[14px] md:text-[17px] font-extrabold text-gray-900 mb-3! md:mb-4! leading-snug">
        {active.heading}
      </h3>

      {/* Fitur Utama Pembiayaan */}
      <div className="mb-5! md:mb-7!">
        <h4 className="text-[13px] font-extrabold text-gray-900 mb-2!">Fitur Utama Pembiayaan</h4>
        <RowList rows={active.fiturUtama} />
      </div>

      {/* Simulasi - tabel angsuran */}
      <div className="mb-5! md:mb-7!">
        <h4 className="text-[13px] font-extrabold text-gray-900 mb-2!">Simulasi — Contoh Tabel Angsuran</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-[11px] md:text-[12px] text-left border-collapse">
            <thead>
              <tr style={{ background: COLOR_BG }}>
                <th className="px-2.5! py-2! font-extrabold whitespace-nowrap" style={{ color: COLOR }}>
                  Tenor
                </th>
                {active.simulasiTable.headers.map((h) => (
                  <th key={h} className="px-2.5! py-2! font-extrabold whitespace-nowrap" style={{ color: COLOR }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-2.5! py-2! font-extrabold text-gray-900 whitespace-nowrap">Angsuran</td>
                {active.simulasiTable.row.map((cell, i) => (
                  <td key={i} className="px-2.5! py-2! text-gray-700 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contoh simulasi angsuran */}
      <div className="mb-5! md:mb-7!">
        <h4 className="text-[13px] font-extrabold text-gray-900 mb-2!">Contoh Simulasi Angsuran</h4>
        <RowList rows={active.contohSimulasi} />
      </div>

      {/* Contoh simulasi total dibayar ke-1 */}
      <div className="mb-6! md:mb-8!">
        <h4 className="text-[13px] font-extrabold text-gray-900 mb-2!">Contoh Simulasi Total Dibayar ke-1</h4>
        <RowList rows={active.totalDibayar} />
      </div>

      <div className="md:max-w-xs">
        <WaButton
          wa={WA_DEFAULT}
          text={waText(active.waProduct, branchName)}
          label={`Ajukan ${active.label} Sekarang`}
        />
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
