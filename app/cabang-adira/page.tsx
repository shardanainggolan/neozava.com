import Navbar from "../Navbar";
import BranchList from "./BranchList";
import type { BranchApiResponse } from "./types";

async function getBranches() {
  const res = await fetch("https://backend.neozava.com/api/branch", {
    next: { revalidate: 3600 }, // revalidate setiap 1 jam
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil data cabang: ${res.status}`);
  }

  const json: BranchApiResponse = await res.json();
  return json.data;
}

export default async function CabangPage() {
  const branches = await getBranches();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-[#9a0000] px-5! pt-6! pb-5!">
        <p className="text-[11px] font-bold uppercase tracking-widest text-red-200 mb-1!">
          Jaringan Kami
        </p>
        <h1 className="text-[22px] font-extrabold text-white leading-snug">
          Cabang Adira Finance
        </h1>
        <p className="text-[13px] text-red-100 mt-1! leading-relaxed">
          Temukan cabang Adira Finance terdekat untuk mengajukan pinjaman
        </p>
      </div>

      <main className="flex-1 flex flex-col bg-[#f6f6f6]">
        <BranchList branches={branches} />
      </main>
    </div>
  );
}
