"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MENU = [
  { label: "Adira Finance", href: "/admin/adira", color: "#9a0000" },
  { label: "BFI Finance",   href: "/admin/bfi",   color: "#1d4ed8" },
  { label: "WOM Finance",   href: "/admin/wom",   color: "#15803d" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  function logout() {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  }

  if (isLoginPage) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gray-50 overflow-auto" style={{ maxWidth: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      style={{ maxWidth: "none", width: "100vw" }}
    >
      {/* Sidebar */}
      <aside className="w-56! shrink-0 bg-[#1a1a2e] text-white flex flex-col">
        <div className="px-5! py-5! border-b border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5!">
            Admin Panel
          </p>
          <p className="text-[17px] font-extrabold text-white">Neozava</p>
        </div>

        <nav className="flex-1 px-3! py-4! flex flex-col gap-1!">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3! mb-2!">
            Manajemen Cabang
          </p>
          {MENU.map((m) => {
            const active = pathname.startsWith(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3! px-3! py-2.5! rounded-xl text-[13px] font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className="w-2.5! h-2.5! rounded-full shrink-0 transition-all"
                  style={{
                    background: active ? m.color : "transparent",
                    border: `2px solid ${m.color}`,
                  }}
                />
                {m.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3! py-4! border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3! px-3! py-2.5! rounded-xl text-[13px] font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg
              className="w-4! h-4! shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
    </div>
  );
}
