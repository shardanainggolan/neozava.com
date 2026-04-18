import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "../../Navbar";
import type { WpPost } from "../types";

const WP_BASE = "https://article.neozava.com/wp-json/wp/v2";

async function getPost(slug: string): Promise<WpPost | null> {
  const res = await fetch(`${WP_BASE}/posts?_embed&slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data: WpPost[] = await res.json();
  return data[0] ?? null;
}

async function getRelatedPosts(excludeId: number): Promise<WpPost[]> {
  const res = await fetch(
    `${WP_BASE}/posts?categories=252&_embed&per_page=3&exclude=${excludeId}`,
    // { next: { revalidate: 3600 } }
  );
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

/* ─── SEO ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Artikel tidak ditemukan | Neozava" };
  }

  const title = `${post.title.rendered} | Neozava`;
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const imageUrl = media?.source_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: media?.media_details.width,
              height: media?.media_details.height,
              alt: post.title.rendered,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://neozava.com/news/${slug}`,
    },
  };
}

/* ─── Page ─── */

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-5! py-16! text-center">
          <p className="text-4xl mb-3">📰</p>
          <h1 className="text-[16px] font-extrabold text-gray-900 mb-1!">
            Artikel tidak ditemukan
          </h1>
          <p className="text-[13px] text-[#646464] mb-6!">
            Artikel yang kamu cari tidak tersedia.
          </p>
          <Link
            href="/news"
            className="flex items-center gap-2! px-5! py-2.5! bg-[#9a0000] text-white text-[13px] font-bold rounded-full"
          >
            ← Kembali ke News
          </Link>
        </main>
      </div>
    );
  }

  const [media, related] = await Promise.all([
    Promise.resolve(post._embedded?.["wp:featuredmedia"]?.[0]),
    getRelatedPosts(post.id),
  ]);

  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      <main className="flex-1 flex flex-col bg-white">
        {/* ── Featured Image ── */}
        {media && (
          <div className="relative w-full aspect-[16/9] bg-gray-100">
            <Image
              src={media.source_url}
              alt={media.alt_text || post.title.rendered}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 480px"
              priority
            />
          </div>
        )}

        {/* ── Meta & Title ── */}
        <div className="px-5! pt-5! pb-2!">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#9a9a9a] mb-3! flex-wrap">
            <Link href="/" className="hover:text-[#9a0000] transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-[#9a0000] transition-colors">News</Link>
            <span>/</span>
            <span className="text-gray-700 truncate max-w-[180px]">{post.title.rendered}</span>
          </div>

          <p className="text-[11px] font-semibold text-[#9a0000] uppercase tracking-wider mb-2!">
            {formatDate(post.date)}
          </p>
          <h1 className="text-[20px] font-extrabold text-gray-900 leading-snug">
            {post.title.rendered}
          </h1>
        </div>

        <div className="h-px bg-gray-100 mx-5! my-4!" />

        {/* ── Content ── */}
        <div
          className="px-5! pb-8! prose-news"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <>
            <div className="bg-[#f6f6f6] px-4! pt-5! pb-6!">
              <h2 className="text-[14px] font-extrabold text-gray-900 mb-3!">
                Artikel Lainnya
              </h2>
              <div className="grid grid-cols-3 gap-2!">
                {related.map((r) => {
                  const rMedia = r._embedded?.["wp:featuredmedia"]?.[0];
                  return (
                    <Link
                      key={r.id}
                      href={`/news/${r.slug}`}
                      className="bg-white rounded-xl overflow-hidden flex flex-col active:scale-[0.98] transition-transform border border-gray-100"
                    >
                      <div className="relative w-full aspect-4/3 bg-gray-100">
                        {rMedia ? (
                          <Image
                            src={rMedia.source_url}
                            alt={rMedia.alt_text || r.title.rendered}
                            fill
                            className="object-cover"
                            sizes="33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-2!">
                        <p className="text-[10px] font-extrabold text-gray-900 leading-snug line-clamp-2">
                          {r.title.rendered}
                        </p>
                        <p className="text-[9px] text-[#9a0000] font-semibold mt-1!">
                          {formatDate(r.date)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── Back button ── */}
        <div className="px-5! pb-8!">
          <Link
            href="/news"
            className="w-full flex items-center justify-center gap-2! py-3! rounded-full border-2 border-[#9a0000] text-[#9a0000] text-[13px] font-bold active:scale-95 transition-transform"
          >
            <svg className="w-4! h-4!" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke News
          </Link>
        </div>
      </main>
    </div>
  );
}
