// Plain data shared by Navbar.tsx (client component) and page.tsx (server
// component). Kept in its own module without "use client" — re-exporting
// a plain array from a client-component file breaks across the RSC
// boundary when a server component imports it (Next.js wraps client-file
// exports as client references, so page.tsx would see a proxy object
// instead of a real array — that's what caused the "navGroups.map is not
// a function" prerender error).
export const navGroups = [
  {
    label: "Produk",
    links: [
      { label: "Gadai BPKB Mobil", href: "/news/gadai-bpkb-mobil" },
      { label: "Gadai BPKB Motor", href: "/news/gadai-bpkb-motor-2" },
      { label: "Take Over", href: "/news/take-over-bpkb" },
      { label: "Kredit Bekas", href: "/news/kredit-motor-mobil-bekas" },
      { label: "Tabel Bonus", href: "/news/tabel-bonus" },
    ],
  },
  {
    label: "Cabang",
    links: [
      { label: "Cabang Adira", href: "/cabang-adira" },
      { label: "Cabang BFI", href: "/cabang-bfi" },
      { label: "Cabang WOM", href: "/cabang-wom" },
    ],
  },
];

export const navSingleLinks = [
  { label: "News", href: "/news" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];
