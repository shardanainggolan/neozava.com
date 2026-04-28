"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";

/* ─── Company config ──────────────────────────────────── */
const COMPANIES = {
  adira: { label: "Adira Finance", prefix: "branch",     uploadPath: "branches",     color: "#9a0000" },
  bfi:   { label: "BFI Finance",   prefix: "bfi-branch", uploadPath: "bfi-branches", color: "#1d4ed8" },
  wom:   { label: "WOM Finance",   prefix: "wom-branch", uploadPath: "wom-branches", color: "#15803d" },
} as const;

type CompanyKey = keyof typeof COMPANIES;

/* ─── Types ───────────────────────────────────────────── */
type Province    = { provinceId: string; province: string };
type District    = { districtId: string; provinceId: string; district: string };
type SubDistrict = { subDistrictId: string; districtId: string; subDistrict: string };

type Branch = {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  address: string;
  provinceId: string;
  districtId: string;
  subDistrictId: string;
  postalCode: string;
  telp1: string; telp2: string; telp3: string;
  fax1: string;  fax2: string;  fax3: string;
  latitude: string;
  longitude: string;
  gmapsLink: string;
  region?: {
    province?: { province: string };
    district?: { district: string };
    subDistrict?: { subDistrict: string };
  };
};

type BranchForm = {
  name: string;
  description: string;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  gmapsLink: string;
  provinceId: string;
  districtId: string;
  subDistrictId: string;
  telp1: string; telp2: string; telp3: string;
  fax1: string;  fax2: string;  fax3: string;
  imageFilename: string;
};

const EMPTY_FORM: BranchForm = {
  name: "", description: "", address: "", postalCode: "",
  latitude: "", longitude: "", gmapsLink: "",
  provinceId: "", districtId: "", subDistrictId: "",
  telp1: "", telp2: "", telp3: "",
  fax1: "", fax2: "", fax3: "",
  imageFilename: "",
};

/* ─── Helpers ─────────────────────────────────────────── */
function getToken(): string {
  if (typeof document === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((r) => r.startsWith("admin_token="))
      ?.split("=")[1] ?? ""
  );
}

function authHeader(): Record<string, string> {
  return { Authorization: `Bearer ${getToken()}` };
}

const IMG_ORIGIN = API_BASE.replace(/\/api$/, "");

/* ─── Field helpers ───────────────────────────────────── */
function Field({
  label,
  required,
  children,
  span2,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "col-span-2" : ""}>
      <label className="block text-[12px] font-bold text-gray-700 mb-1.5!">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3! py-2! rounded-xl border border-gray-200 text-[13px] outline-none focus:border-gray-400 transition-colors";

/* ─── Searchable select ───────────────────────────────── */
type SelectOption = { value: string; label: string };

function SearchableSelect({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "-- Pilih --",
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );
  const selected = options.find((o) => o.value === value);

  function pick(opt: SelectOption) {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => { if (!disabled) { setOpen((v) => !v); setQuery(""); } }}
        className={`w-full px-3! py-2! rounded-xl border text-[13px] text-left flex items-center justify-between gap-2! transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${open ? "border-gray-400" : "border-gray-200"}`}
      >
        <span className={selected ? "text-gray-900 truncate" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className={`w-4! h-4! shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-[200] left-0 right-0 top-full mt-1! bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="px-2! py-2! border-b border-gray-100">
            <input
              type="text"
              autoFocus
              placeholder="Cari..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2! py-1.5! rounded-lg bg-gray-50 border border-gray-200 text-[13px] outline-none focus:border-gray-400"
            />
          </div>
          <div className="max-h-52! overflow-y-auto">
            {value && (
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); setQuery(""); }}
                className="w-full text-left px-3! py-2! text-[12px] text-gray-400 hover:bg-gray-50 border-b border-gray-50 transition-colors"
              >
                — Hapus pilihan
              </button>
            )}
            {filtered.length === 0 ? (
              <p className="px-3! py-4! text-[12px] text-gray-400 text-center">Tidak ditemukan</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pick(opt)}
                  className={`w-full text-left px-3! py-2! text-[13px] transition-colors ${
                    opt.value === value
                      ? "bg-[#fdf0f0] text-[#9a0000] font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────── */
export default function CompanyPage() {
  const params = useParams();
  const router = useRouter();

  const companyParam = params.company as string;
  const company = companyParam in COMPANIES ? (companyParam as CompanyKey) : null;

  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [form, setForm] = useState<BranchForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<Branch | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Region chain select
  const [provinces,    setProvinces]    = useState<Province[]>([]);
  const [districts,    setDistricts]    = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);

  const fetchBranches = useCallback(async () => {
    if (!company) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${COMPANIES[company].prefix}`);
      const json = await res.json();
      setBranches(Array.isArray(json.data) ? [...json.data].sort((a, b) => b.branchId - a.branchId) : []);
    } catch {
      setBranches([]);
    } finally {
      setLoading(false);
    }
  }, [company]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  // Load all provinces once on mount
  useEffect(() => {
    fetch(`${API_BASE}/region/province`)
      .then((r) => r.json())
      .then((json) => setProvinces(Array.isArray(json.data) ? json.data : []));
  }, []);

  if (!company) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 font-semibold">Company tidak valid.</p>
      </div>
    );
  }

  const cfg = COMPANIES[company];

  function setField(key: keyof BranchForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function openCreate() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setFormError("");
    setEditBranch(null);
    setDistricts([]);
    setSubDistricts([]);
    setModal("create");
  }

  async function openEdit(b: Branch) {
    setDistricts([]);
    setSubDistricts([]);
    setForm({
      name: b.name,
      description: b.description,
      address: b.address,
      postalCode: b.postalCode,
      latitude: b.latitude,
      longitude: b.longitude,
      gmapsLink: b.gmapsLink,
      provinceId: b.provinceId ?? "",
      districtId: b.districtId ?? "",
      subDistrictId: b.subDistrictId ?? "",
      telp1: b.telp1 ?? "", telp2: b.telp2 ?? "", telp3: b.telp3 ?? "",
      fax1: b.fax1 ?? "",   fax2: b.fax2 ?? "",   fax3: b.fax3 ?? "",
      imageFilename: b.image ?? "",
    });
    setEditBranch(b);
    setFormError("");
    setModal("edit");

    // Pre-load districts and sub-districts for existing IDs
    if (b.provinceId) {
      const r = await fetch(`${API_BASE}/region/district?provinceId=${b.provinceId}`);
      const j = await r.json();
      setDistricts(Array.isArray(j.data) ? j.data : []);
    }
    if (b.districtId) {
      const r = await fetch(`${API_BASE}/region/sub-district?districtId=${b.districtId}`);
      const j = await r.json();
      setSubDistricts(Array.isArray(j.data) ? j.data : []);
    }
  }

  async function handleProvinceChange(provinceId: string) {
    setField("provinceId", provinceId);
    setField("districtId", "");
    setField("subDistrictId", "");
    setDistricts([]);
    setSubDistricts([]);
    if (!provinceId) return;
    const r = await fetch(`${API_BASE}/region/district?provinceId=${provinceId}`);
    const j = await r.json();
    setDistricts(Array.isArray(j.data) ? j.data : []);
  }

  async function handleDistrictChange(districtId: string) {
    setField("districtId", districtId);
    setField("subDistrictId", "");
    setSubDistricts([]);
    if (!districtId) return;
    const r = await fetch(`${API_BASE}/region/sub-district?districtId=${districtId}`);
    const j = await r.json();
    setSubDistricts(Array.isArray(j.data) ? j.data : []);
  }

  function handleUnauth() {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      let res: Response;

      if (modal === "create") {
        if (!imageFile) {
          setFormError("Gambar wajib dipilih");
          setSaving(false);
          return;
        }
        const fd = new FormData();
        fd.append("image", imageFile);
        fd.append("name", form.name);
        fd.append("description", form.description);
        fd.append("address", form.address);
        fd.append("postalCode", form.postalCode);
        fd.append("latitude", form.latitude);
        fd.append("longitude", form.longitude);
        fd.append("gmapsLink", form.gmapsLink);
        fd.append("provinceId", form.provinceId);
        fd.append("districtId", form.districtId);
        fd.append("subDistrictId", form.subDistrictId);
        fd.append("telp1", form.telp1); fd.append("telp2", form.telp2); fd.append("telp3", form.telp3);
        fd.append("fax1", form.fax1);   fd.append("fax2", form.fax2);   fd.append("fax3", form.fax3);

        res = await fetch(`${API_BASE}/${cfg.prefix}`, {
          method: "POST",
          headers: authHeader(),
          body: fd,
        });
      } else {
        res = await fetch(`${API_BASE}/${cfg.prefix}/${editBranch!.branchId}`, {
          method: "PATCH",
          headers: { ...authHeader(), "Content-Type": "application/json" },
          body: JSON.stringify({
            image: form.imageFilename,
            name: form.name,
            description: form.description,
            address: form.address,
            postalCode: form.postalCode,
            latitude: form.latitude,
            longitude: form.longitude,
            gmapsLink: form.gmapsLink,
            provinceId: form.provinceId,
            districtId: form.districtId,
            subDistrictId: form.subDistrictId,
            telp1: form.telp1, telp2: form.telp2, telp3: form.telp3,
            fax1: form.fax1,   fax2: form.fax2,   fax3: form.fax3,
          }),
        });
      }

      const json = await res.json();
      if (json.code === 401) { handleUnauth(); return; }
      if (json.code !== 200) {
        setFormError(json.message ?? `Gagal: ${json.status}`);
        return;
      }

      setModal(null);
      await fetchBranches();
    } catch {
      setFormError("Gagal terhubung ke server");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/${cfg.prefix}/${deleteTarget.branchId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const json = await res.json();
      if (json.code === 401) { handleUnauth(); return; }
      setDeleteTarget(null);
      await fetchBranches();
    } catch {
      // ignore network errors silently
    } finally {
      setDeleting(false);
    }
  }

  const filtered = branches.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6! py-4! flex items-center justify-between shrink-0">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Manajemen Cabang
          </p>
          <h1 className="text-[20px] font-extrabold text-gray-900">{cfg.label}</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2! px-4! py-2.5! rounded-xl text-white text-[13px] font-bold transition-opacity hover:opacity-90"
          style={{ background: cfg.color }}
        >
          <svg className="w-4! h-4! shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Cabang
        </button>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-100 px-6! py-3! shrink-0">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4! h-4! text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Cari nama atau alamat cabang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9! pr-4! py-2! rounded-xl border border-gray-200 text-[13px] outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6! py-5!">
        {loading ? (
          <div className="flex items-center justify-center h-48!">
            <p className="text-gray-400 text-sm">Memuat data cabang...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48! gap-2!">
            <p className="text-gray-400 text-sm">Tidak ada cabang ditemukan</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4! py-3! text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Nama Cabang
                  </th>
                  <th className="text-left px-4! py-3! text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="text-left px-4! py-3! text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Provinsi
                  </th>
                  <th className="text-left px-4! py-3! text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Telepon
                  </th>
                  <th className="px-4! py-3! w-32!" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b) => (
                  <tr key={b.branchId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4! py-3!">
                      <div className="flex items-center gap-3!">
                        {b.image ? (
                          <img
                            src={`${IMG_ORIGIN}/uploads/${cfg.uploadPath}/${b.image}`}
                            alt={b.name}
                            className="w-10! h-10! rounded-lg object-cover bg-gray-100 shrink-0"
                          />
                        ) : (
                          <div className="w-10! h-10! rounded-lg bg-gray-100 shrink-0 flex items-center justify-center">
                            <svg className="w-5! h-5! text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 leading-snug">{b.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{b.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4! py-3! text-gray-600 max-w-[220px]">
                      <p className="truncate">{b.address}</p>
                      <p className="text-[11px] text-gray-400">Kode Pos: {b.postalCode}</p>
                    </td>
                    <td className="px-4! py-3! text-gray-600">
                      {b.region?.province?.province ?? b.provinceId ?? "—"}
                    </td>
                    <td className="px-4! py-3! text-gray-600">
                      {b.telp1 || "—"}
                    </td>
                    <td className="px-4! py-3!">
                      <div className="flex items-center gap-2! justify-end">
                        <button
                          onClick={() => openEdit(b)}
                          className="px-3! py-1.5! rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[12px] font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(b)}
                          className="px-3! py-1.5! rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-[12px] font-semibold transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-[11px] text-gray-400 mt-3!">
          {filtered.length} dari {branches.length} cabang
        </p>
      </div>

      {/* ── Create / Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/50 overflow-auto py-10! px-4!">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6! py-4! border-b border-gray-100">
              <h2 className="text-[16px] font-extrabold text-gray-900">
                {modal === "create" ? "Tambah Cabang" : "Edit Cabang"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="w-8! h-8! rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4! h-4! text-gray-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6! py-5! flex flex-col gap-5!">
              {/* Image */}
              {modal === "create" ? (
                <Field label="Gambar" required>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                    className="w-full text-[13px] text-gray-700 file:mr-3! file:py-1.5! file:px-3! file:rounded-lg file:border-0 file:text-[12px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                </Field>
              ) : (
                <Field label="Gambar (tidak dapat diubah)">
                  <div className="flex items-center gap-3! bg-gray-50 rounded-xl px-3! py-2!">
                    {form.imageFilename && (
                      <img
                        src={`${IMG_ORIGIN}/uploads/${cfg.uploadPath}/${form.imageFilename}`}
                        alt="preview"
                        className="w-12! h-12! rounded-lg object-cover bg-gray-200 shrink-0"
                      />
                    )}
                    <p className="text-[12px] text-gray-500 font-mono truncate">
                      {form.imageFilename || "Tidak ada gambar"}
                    </p>
                  </div>
                </Field>
              )}

              {/* Core fields */}
              <div className="grid grid-cols-2 gap-4!">
                <Field label="Nama Cabang" required span2>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Deskripsi" required span2>
                  <textarea
                    required rows={2} value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </Field>
                <Field label="Alamat" required span2>
                  <textarea
                    required rows={2} value={form.address}
                    onChange={(e) => setField("address", e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </Field>
                <Field label="Kode Pos" required>
                  <input
                    type="text" required value={form.postalCode}
                    onChange={(e) => setField("postalCode", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Google Maps Link" required>
                  <input
                    type="text" required value={form.gmapsLink}
                    onChange={(e) => setField("gmapsLink", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Latitude" required>
                  <input
                    type="text" required value={form.latitude}
                    placeholder="-6.921390"
                    onChange={(e) => setField("latitude", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Longitude" required>
                  <input
                    type="text" required value={form.longitude}
                    placeholder="107.607277"
                    onChange={(e) => setField("longitude", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Wilayah — chained select */}
              <div>
                <p className="text-[12px] font-bold text-gray-700 mb-2!">
                  Wilayah <span className="text-gray-400 font-normal">(opsional)</span>
                </p>
                <div className="grid grid-cols-3 gap-3!">
                  {/* Provinsi */}
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1!">Provinsi</label>
                    <SearchableSelect
                      options={provinces.map((p) => ({ value: p.provinceId, label: p.province }))}
                      value={form.provinceId}
                      onChange={handleProvinceChange}
                      placeholder="-- Pilih Provinsi --"
                    />
                  </div>

                  {/* Kabupaten / Kota */}
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1!">Kabupaten / Kota</label>
                    <SearchableSelect
                      options={districts.map((d) => ({ value: d.districtId, label: d.district }))}
                      value={form.districtId}
                      onChange={handleDistrictChange}
                      disabled={!form.provinceId}
                      placeholder="-- Pilih Kab/Kota --"
                    />
                  </div>

                  {/* Kecamatan */}
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1!">Kecamatan</label>
                    <SearchableSelect
                      options={subDistricts.map((s) => ({ value: s.subDistrictId, label: s.subDistrict }))}
                      value={form.subDistrictId}
                      onChange={(v) => setField("subDistrictId", v)}
                      disabled={!form.districtId}
                      placeholder="-- Pilih Kecamatan --"
                    />
                  </div>
                </div>
              </div>

              {/* Telepon */}
              <div>
                <p className="text-[12px] font-bold text-gray-700 mb-2!">Telepon <span className="text-gray-400 font-normal">(opsional)</span></p>
                <div className="grid grid-cols-3 gap-3!">
                  {(["telp1", "telp2", "telp3"] as const).map((k, i) => (
                    <div key={k}>
                      <label className="block text-[11px] text-gray-400 mb-1!">Telepon {i + 1}</label>
                      <input
                        type="text" value={form[k]}
                        onChange={(e) => setField(k, e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fax */}
              <div>
                <p className="text-[12px] font-bold text-gray-700 mb-2!">Fax <span className="text-gray-400 font-normal">(opsional)</span></p>
                <div className="grid grid-cols-3 gap-3!">
                  {(["fax1", "fax2", "fax3"] as const).map((k, i) => (
                    <div key={k}>
                      <label className="block text-[11px] text-gray-400 mb-1!">Fax {i + 1}</label>
                      <input
                        type="text" value={form[k]}
                        onChange={(e) => setField(k, e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {formError && (
                <p className="text-[12px] text-red-600 font-medium bg-red-50 px-3! py-2! rounded-xl">
                  {formError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3! pt-1! border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 py-2.5! rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5! rounded-xl text-white text-[13px] font-bold disabled:opacity-60 transition-opacity hover:opacity-90"
                  style={{ background: cfg.color }}
                >
                  {saving ? "Menyimpan..." : modal === "create" ? "Simpan" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4!">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6! shadow-2xl">
            <div className="flex items-start gap-4! mb-4!">
              <div className="w-11! h-11! rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg className="w-5! h-5! text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold text-gray-900">Hapus Cabang?</h3>
                <p className="text-[12px] text-gray-500 mt-0.5!">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>
            <p className="text-[13px] text-gray-700 mb-5! pl-[60px]">
              Anda akan menghapus{" "}
              <span className="font-bold">&ldquo;{deleteTarget.name}&rdquo;</span>
            </p>
            <div className="flex gap-3!">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5! rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5! rounded-xl bg-red-600 text-white text-[13px] font-bold disabled:opacity-60 transition-opacity"
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
