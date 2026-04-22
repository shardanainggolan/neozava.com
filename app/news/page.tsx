import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "../Navbar";
import type { WpPost } from "./types";

export const metadata: Metadata = {
  title: "News & Artikel | Neozava",
  description:
    "Baca artikel terbaru seputar gadai BPKB, kredit motor mobil, take over, dan tips keuangan dari Neozava.",
  openGraph: {
    title: "News & Artikel | Neozava",
    description:
      "Baca artikel terbaru seputar gadai BPKB, kredit motor mobil, take over, dan tips keuangan dari Neozava.",
    type: "website",
  },
};

const WP_BASE = "https://article.neozava.com/wp-json/wp/v2";

async function getPosts(): Promise<WpPost[]> {
  const res = await fetch(`${WP_BASE}/posts?categories=252&_embed&per_page=20`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await getPosts();
  // console.log(posts)

  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      {/* ── Header ── */}
      <div className="bg-[#9a0000] px-5! pt-6! pb-5!">
        <p className="text-[11px] font-bold uppercase tracking-widest text-red-200 mb-1!">
          Informasi Terkini
        </p>
        <h1 className="text-[22px] font-extrabold text-white leading-snug">
          News & Artikel
        </h1>
        <p className="text-[13px] text-red-100 mt-1! leading-relaxed">
          Tips keuangan, info produk, dan berita terbaru dari Neozava
        </p>
      </div>

      <main className="flex-1 flex flex-col bg-[#f6f6f6]">
        {posts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-5! py-16! text-center">
            <p className="text-4xl mb-3">📰</p>
            <h2 className="text-[16px] font-extrabold text-gray-900 mb-1!">
              Belum ada artikel
            </h2>
            <p className="text-[13px] text-[#646464]">
              Artikel akan segera hadir. Silakan cek kembali nanti.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3! px-4! py-5!">
            {posts.map((post) => {
              const media = post._embedded?.["wp:featuredmedia"]?.[0];
              const excerpt = stripHtml(post.excerpt.rendered).slice(0, 120);

              return (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col active:scale-[0.99] transition-transform"
                >
                  {media && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={media.source_url}
                        alt={media.alt_text || post.title.rendered}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 100vw, 480px"
                      />
                    </div>
                  )}
                  <div className="p-4!">
                    <p className="text-[10px] font-semibold text-[#9a0000] uppercase tracking-wider mb-1!">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="text-[14px] font-extrabold text-gray-900 leading-snug mb-1.5!">
                      {post.title.rendered}
                    </h2>
                    {excerpt && (
                      <p className="text-[12px] text-[#646464] leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                    )}
                    <div className="mt-3! flex items-center gap-1 text-[#9a0000] text-[12px] font-bold">
                      Baca selengkapnya
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
