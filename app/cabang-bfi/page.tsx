import Navbar from "../Navbar";
import BranchList from "./BranchList";
import type { BranchApiResponse } from "../cabang-adira/types";
import { API_BASE } from "@/lib/config";

async function getBranches() {
  const res = await fetch(`${API_BASE}/bfi-branch`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil data cabang: ${res.status}`);
  }

  const json: BranchApiResponse = await res.json();
  return json.data;
}

export default async function CabangBfiPage() {
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
          Cabang BFI Finance
        </h1>
        <p className="text-[13px] text-red-100 mt-1! leading-relaxed">
          Temukan cabang BFI Finance terdekat untuk mengajukan pinjaman
        </p>
      </div>

      <main className="flex-1 flex flex-col bg-[#f6f6f6]">
        <BranchList branches={branches} />
      </main>
    </div>
  );
}
