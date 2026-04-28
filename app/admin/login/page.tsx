"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.code === 200) {
        document.cookie = `admin_token=${json.data.token}; path=/; max-age=86400`;
        router.push("/admin/adira");
      } else {
        setError("Email atau password salah");
      }
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4!">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8!">
        {/* Logo / icon */}
        <div className="text-center mb-8!">
          <div className="w-14! h-14! rounded-2xl bg-[#9a0000] flex items-center justify-center mx-auto mb-4!">
            <svg className="w-7! h-7! text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">Admin Neozava</h1>
          <p className="text-sm text-gray-500 mt-1!">Masuk untuk mengelola data cabang</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4!">
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1.5!">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full px-3! py-2.5! rounded-xl border border-gray-200 text-sm outline-none focus:border-[#9a0000] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1.5!">Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-3! py-2.5! rounded-xl border border-gray-200 text-sm outline-none focus:border-[#9a0000] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 font-medium bg-red-50 px-3! py-2! rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5! rounded-xl bg-[#9a0000] text-white font-bold text-sm disabled:opacity-60 transition-opacity mt-1!"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
