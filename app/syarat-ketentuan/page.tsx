import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../Navbar";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan - Neozava",
  description:
    "Dapatkan informasi lengkap tentang syarat dan ketentuan penggunaan layanan Neozava",
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8!">
      <div className="flex gap-3! items-start mb-3!">
        <span className="shrink-0 w-7! h-7! rounded-full bg-[#9a0000] text-white text-[11px] font-extrabold flex items-center justify-center mt-0.5">
          {number}
        </span>
        <h2 className="text-[15px] font-extrabold text-gray-900 uppercase tracking-wide leading-snug pt-1!">
          {title}
        </h2>
      </div>
      <div className="pl-10!">{children}</div>
    </div>
  );
}

function SubItem({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5! mb-4! last:mb-0!">
      <span className="shrink-0 text-[12px] font-bold text-[#9a0000] mt-0.5">{id}</span>
      <p className="text-[13px] text-[#646464] leading-relaxed">{children}</p>
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-[#646464] leading-relaxed mb-4!">{children}</p>;
}

export default function SyaratKetentuanPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-[#9a0000] px-5! pt-6! pb-5!">
        <div className="flex items-center gap-1.5! mb-2!">
          <Link href="/" className="text-[11px] text-red-300 hover:text-white transition-colors">
            Beranda
          </Link>
          <svg className="w-3! h-3! text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[11px] text-red-200">Syarat & Ketentuan</span>
        </div>
        <h1 className="text-[22px] font-extrabold text-white leading-snug">
          Syarat dan Ketentuan
        </h1>
        <p className="text-[13px] text-red-100 mt-1! leading-relaxed">
          Baca dan pahami ketentuan penggunaan layanan kami
        </p>
      </div>

      <main className="flex-1 bg-[#f6f6f6]">
        {/* Intro */}
        <div className="bg-white px-5! py-5! border-b border-gray-100">
          <Para>
            Selamat datang di{" "}
            <Link href="/" className="text-[#9a0000] font-semibold underline underline-offset-2">
              Neozava
            </Link>
            .
          </Para>
          <p className="text-[13px] text-[#646464] leading-relaxed">
            Disarankan sebelum mengakses Situs ini lebih jauh, Anda terlebih dahulu membaca dan memahami
            syarat dan ketentuan yang berlaku. Dengan mengakses atau menggunakan Situs, berarti Anda telah
            memahami dan menyetujui serta terikat dan tunduk dengan segala syarat dan ketentuan yang berlaku
            di Situs ini.
          </p>
        </div>

        {/* Sections */}
        <div className="px-5! py-6!">

          <Section number="1" title="Definisi">
            <Para>
              Setiap kata atau istilah berikut yang digunakan di dalam Kebijakan Privasi ini memiliki arti
              seperti berikut di bawah, kecuali jika kata atau istilah yang bersangkutan dalam pemakaiannya
              dengan tegas menentukan lain.
            </Para>
            <SubItem id="1.1">&ldquo;<strong className="text-gray-800">Kami</strong>&rdquo;, selaku pemilik dan pengelola Situs Neozava dan/atau mobile application yang bernama Adira Finance.</SubItem>
            <SubItem id="1.2">&ldquo;<strong className="text-gray-800">Anda</strong>&rdquo;, berarti tiap orang yang mengakses dan menggunakan layanan dan jasa yang disediakan oleh Kami.</SubItem>
            <SubItem id="1.3">&ldquo;<strong className="text-gray-800">Layanan</strong>&rdquo;, berarti tiap dan keseluruhan jasa serta informasi yang ada pada Situs Neozava, dan tidak terbatas pada informasi yang disediakan, layanan aplikasi dan fitur, dukungan data, serta aplikasi mobile yang Kami sediakan.</SubItem>
            <SubItem id="1.4">&ldquo;<strong className="text-gray-800">Pengguna</strong>&rdquo;, berarti tiap orang yang mengakses dan menggunakan layanan dan jasa yang disediakan oleh Kami, termasuk diantaranya Pengguna Belum Terdaftar dan Pengguna Terdaftar.</SubItem>
            <SubItem id="1.5">&ldquo;<strong className="text-gray-800">Pengguna Belum Terdaftar</strong>&rdquo;, berarti tiap orang yang mengakses Situs Kami dan belum melakukan registrasi.</SubItem>
            <SubItem id="1.6">&ldquo;<strong className="text-gray-800">Pengguna Terdaftar</strong>&rdquo;, berarti tiap orang yang mengakses dan menggunakan layanan dan jasa yang disediakan oleh Kami, serta telah melakukan registrasi dan memiliki akun pada Situs Kami.</SubItem>
            <SubItem id="1.7">&ldquo;<strong className="text-gray-800">Pihak Ketiga</strong>&rdquo;, berarti pihak lainnya, termasuk namun tidak terbatas pihak bank, multifinance, peer to peer lending, broker dan penyedia layanan asuransi, agen penjual efek reksa dana, transfer dana, telekomunikasi yang menyediakan layanannya dalam Situs.</SubItem>
            <SubItem id="1.8">&ldquo;<strong className="text-gray-800">Informasi Pribadi</strong>&rdquo;, berarti tiap dan seluruh data pribadi yang diberikan oleh Pengguna di Situs Kami, termasuk namun tidak terbatas pada nama lengkap, tempat dan tanggal lahir, jenis kelamin, alamat, nomor identitas, informasi debitur, kartu keluarga, akta kelahiran, surat nikah, akta, bukti kepemilikan, KTP, NPWP, surat izin usaha, surat penjaminan, data penghasilan, lokasi pengguna, kontak pengguna, data transaksi, data lainnya yang terekam dalam Situs Kami yang merujuk kepada Anda serta dokumen dan data pendukung lainnya.</SubItem>
            <SubItem id="1.9">&ldquo;<strong className="text-gray-800">Konten</strong>&rdquo;, berarti teks, data, informasi, angka, gambar, grafik, foto, audio, video, nama pengguna, informasi, aplikasi, tautan, komentar, peringkat, desain, atau materi lainnya yang ditampilkan pada Situs.</SubItem>
            <SubItem id="1.10">&ldquo;<strong className="text-gray-800">Situs</strong>&rdquo;, berarti Neozava.</SubItem>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="2" title="Layanan dan/atau Jasa">
            <Para>
              Kami memberikan informasi mengenai produk-produk finansial yang disediakan oleh Pihak Ketiga.
              Layanan ini memungkinkan Anda untuk dapat melihat, menelaah, membaca, serta membandingkan informasi tersebut.
            </Para>
            <SubItem id="2.1">Informasi yang terdapat dalam Situs Kami ditampilkan sesuai keadaan kenyataan untuk tujuan informasi umum. Kami berusaha untuk selalu menyediakan dan menampilkan informasi yang terbaru dan akurat, namun Kami tidak menjamin bahwa segala informasi sesuai dengan ketepatan waktu atau relevansi dengan kebutuhan Anda.</SubItem>
            <SubItem id="2.2">Diharapkan Anda tidak menganggap atau berasumsi bahwa Situs ini dapat dijadikan sebagai saran keuangan dan/atau finansial, atau rekomendasi atas produk serta layanan yang ditampilkan. Anda sepenuhnya bertanggung jawab atas keputusan terkait pemilihan produk dan layanan.</SubItem>
            <SubItem id="2.3">Layanan yang Kami berikan tidak bersifat memaksa atau mengikat, serta tidak mengharuskan Anda untuk mengikuti informasi yang tersedia. Tidak ada situasi atau keadaan apapun yang dapat membuat Kami dikenakan tanggung jawab atas kemungkinan kerugian yang Anda alami karena pengambilan keputusan yang dilakukan oleh Anda sendiri.</SubItem>
            <SubItem id="2.4">Kami memiliki hak untuk kapan saja menampilkan, mengubah, menghapus, menghilangkan, atau menambahkan segala konten yang ditampilkan dalam Situs ini.</SubItem>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="3" title="Penggunaan Layanan dan Jasa">
            <Para>
              Dengan Anda melanjutkan penggunaan atau pengaksesan Situs ini, berarti Anda telah menyatakan
              serta menjamin kepada Kami bahwa:
            </Para>
            <SubItem id="3.1">Anda hanya diperkenankan untuk mengakses dan/atau menggunakan Situs ini untuk keperluan pribadi dan non-komersil. Akses dan penggunaan Situs di luar dari keperluan pribadi atau non-komersil dilarang keras, dan melanggar Syarat dan Ketentuan ini.</SubItem>
            <div className="flex gap-2.5! mb-4!">
              <span className="shrink-0 text-[12px] font-bold text-[#9a0000] mt-0.5">3.2</span>
              <div>
                <p className="text-[13px] text-[#646464] leading-relaxed mb-3!">Anda tidak diperkenankan menggunakan Situs dalam hal sebagai berikut:</p>
                <ul className="flex flex-col gap-2.5!">
                  {[
                    "Untuk menyakiti, menyiksa, mempermalukan, memfitnah, mencemarkan nama baik, mengancam, mengintimidasi atau mengganggu orang atau bisnis lain, atau apapun yang melanggar privasi atau yang Kami anggap cabul, menghina, penuh kebencian, tidak senonoh, atau merusak.",
                    "Dalam cara yang melawan hukum, tindakan penipuan atau tindakan komersil.",
                    "Melanggar atau menyalahi hak orang lain, termasuk tanpa kecuali: hak paten, merek dagang, hak cipta, rahasia dagang, publisitas, dan hak milik lainnya.",
                    "Untuk membuat, memeriksa, memperbarui, mengubah atau memperbaiki database, rekaman atau direktori Anda ataupun orang lain.",
                    "Mengubah atau mengatur ulang bagian apapun dalam Situs ini yang akan mengganggu atau menaruh beban berlebihan pada sistem komunikasi dan teknis kami.",
                    "Menggunakan kode komputer otomatis, proses, program, robot, net crawler, spider, pemrosesan data, trawling atau kode komputer, proses, program atau sistem screen scraping alternatif.",
                    "Melanggar Syarat dan Ketentuan, atau petunjuk lainnya yang ada pada Situs.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2! items-start">
                      <span className="shrink-0 w-1.5! h-1.5! rounded-full bg-[#9a0000] mt-2!" />
                      <p className="text-[13px] text-[#646464] leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <SubItem id="3.3">Kami tidak bertanggung jawab atas kehilangan akibat kegagalan mengakses Situs, dan metode penggunaan Situs yang diluar kendali Kami.</SubItem>
            <SubItem id="3.4">Kami tidak bertanggung jawab atau dapat dipersalahkan atas kehilangan atau kerusakan yang diluar perkiraan saat Anda mengakses atau menggunakan Situs ini. Ini termasuk kehilangan penghematan yang diharapkan, kehilangan bisnis atau kesempatan bisnis, kehilangan pemasukan atau keuntungan, atau kehilangan atau kerusakan apapun yang Anda harus alami akibat penggunaan Situs ini.</SubItem>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="4" title="Hak Intelektual Properti">
            <Para>
              Semua Hak Kekayaan Intelektual yang ada di dalam Situs ini adalah milik Kami. Tiap atau
              keseluruhan informasi dan materi dan konten, termasuk namun tidak terbatas pada tulisan,
              perangkat lunak, teks, data, grafik, gambar, audio, video, logo, ikon atau kode-kode html
              dan kode-kode lain yang ada di Situs ini dilarang dipublikasikan, dimodifikasi, disalin,
              digandakan atau diubah dengan cara apapun di luar area Situs ini tanpa izin dari Kami.
              Pelanggaran terhadap hak-hak Situs ini dapat ditindak sesuai dengan peraturan yang berlaku.
            </Para>
            <Para>
              Anda dapat menggunakan informasi atau isi dalam Situs hanya untuk penggunaan pribadi non-komersil.
              Kecuali ditentukan sebaliknya dan/atau diperbolehkan secara tegas oleh undang-undang hak cipta,
              maka Pengguna dilarang untuk menyalin, membagikan ulang, mentransmisi ulang, meretas, mempublikasi
              atau melakukan tindakan eksploitasi komersial dari pengunduhan yang dilakukan tanpa seizin Kami
              sebagai pemilik Hak Intelektual Properti tersebut.
            </Para>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="5" title="Komentar">
            <Para>
              Jika Anda ingin memberikan komentar, masukan, ataupun sanggahan mengenai tiap atau keseluruhan
              konten dan informasi dalam Situs, Kami juga menyediakan sarana chat/messaging, kontak email,
              blog, ataupun media sosial milik Kami. Anda diperbolehkan untuk memberi komentar, dan setuju
              bahwa jika diperlukan, akan Kami pergunakan untuk kepentingan informasi dan ditampilkan pada
              Situs Kami. Komentar, masukan, atau sanggahan yang Anda berikan tidak boleh bertentangan dengan
              Syarat dan Ketentuan ini, terutama seperti tercantum dalam poin 3.2.
            </Para>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="6" title="Pengajuan">
            <SubItem id="6.1">Anda bisa mengajukan diri untuk mendapatkan berbagai produk dan layanan seperti yang ditampilkan di Situs ini. Produk dan layanan tersebut disediakan oleh Pihak Ketiga. Anda sepenuhnya bertanggung jawab atas pilihan produk atau layanan, dan Kami tidak bertanggung jawab atau dapat dipersalahkan atas kehilangan atau kerusakan yang mungkin Anda derita akibat produk atau layanan yang Anda dapatkan saat menggunakan Situs ini.</SubItem>
            <SubItem id="6.2">Diingatkan kembali bahwa data dan deskripsi produk dan jasa pada Situs ini mungkin tidak mewakili seluruh deskripsi dari semua pilihan dan persyaratan produk dan layanan tersebut. Anda perlu berhati-hati dan cermat untuk melihat semua pilihan dan syarat dan kondisi dari setiap produk atau jasa sebelum melakukan pengajuan.</SubItem>
            <SubItem id="6.3">Jika Anda mengajukan permohonan dan mendapatkan produk atau layanan, Anda akan masuk ke dalam kontak dengan Pihak Ketiga sebagai penyedia produk atau layanan, yang memiliki syarat dan ketentuan sendiri. Anda bertanggung jawab untuk memastikan bahwa Anda setuju dengan syarat dan kondisi sebelum memasuki kontrak untuk mendapatkan produk atau layanan dimaksud.</SubItem>
            <SubItem id="6.4">Anda memberikan izin pada Kami untuk memproses data-data Anda kepada Pihak Ketiga, serta memberi kuasa kepada Pihak Ketiga untuk memeriksa semua informasi yang diberikan dengan cara bagaimanapun, menghubungi Anda termasuk namun tidak terbatas pada komunikasi melalui channel telepon, email, whatsapp, sms dan channel lainnya untuk pemasaran dari produk maupun layanan yang disediakan oleh Pihak Ketiga pada Situs, termasuk namun tidak terbatas untuk keperluan Sistem Layanan Informasi Keuangan (SLIK) OJK, biro kredit dan/atau sejenisnya.</SubItem>
            <SubItem id="6.5">Anda memberikan izin pada Kami untuk memproses data Anda untuk meningkatkan layanan Kami dalam bentuk apapun, termasuk tapi tidak terbatas untuk keperluan pemasaran dan peningkatan layanan Kami.</SubItem>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="7" title="Tautan Lainnya">
            <Para>
              Situs Kami mungkin menyediakan beberapa tautan tertentu yang merujuk atau mengarahkan Anda ke
              laman dari situs Pihak Ketiga. Anda mengetahui, memahami, serta menyetujui bahwa Kami tidak
              bertanggung jawab atas konten dan/atau materi lainnya yang terdapat dalam tautan milik Pihak
              Ketiga tersebut. Anda bertanggung jawab atas resiko ketika mengakses dan menggunakan tautan
              milik Pihak Ketiga tersebut. Disarankan Anda juga dapat membaca serta memahami isi dari Syarat
              dan Ketentuan yang berlaku di tautan milik Pihak Ketiga tersebut.
            </Para>
          </Section>

          <div className="h-px bg-gray-100 mb-8!" />

          <Section number="8" title="Umum">
            <SubItem id="8.1">Penggunaan dan akses ke Situs ini diatur oleh Syarat dan Ketentuan serta Kebijakan Privasi Kami. Dengan mengakses atau menggunakan Situs ini, informasi, atau aplikasi lainnya dalam bentuk aplikasi mobile yang disediakan dalam Situs, berarti Anda telah memahami, menyetujui serta terikat dan tunduk dengan segala syarat dan ketentuan yang berlaku di Situs ini.</SubItem>
            <SubItem id="8.2">Kami berhak untuk menutup atau mengubah atau memperbaharui Syarat dan Ketentuan ini setiap saat tanpa pemberitahuan, dan berhak untuk membuat keputusan akhir jika tidak ada ketidakcocokan. Kami tidak bertanggung jawab atas kerugian dalam bentuk apa pun yang timbul akibat perubahan pada Syarat dan Ketentuan.</SubItem>
            <SubItem id="8.3">
              Jika Anda masih memerlukan jawaban atas pertanyaan yang tidak terdapat dalam Syarat dan Ketentuan ini, Anda dapat menghubungi Kami melalui WhatsApp di{" "}
              <a href="https://wa.me/6281219251995" className="text-[#9a0000] font-semibold">
                +62 812-1925-1995
              </a>
              .
            </SubItem>
          </Section>

        </div>

        {/* Footer CTA */}
        <div className="mx-5! mb-6! bg-white rounded-2xl border border-gray-100 px-5! py-5! text-center">
          <p className="text-[12px] text-[#646464] mb-3!">
            Ada pertanyaan mengenai syarat dan ketentuan?
          </p>
          <a
            href="https://wa.me/6281219251995"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2! bg-[#9a0000] text-white text-[13px] font-bold px-5! py-2.5! rounded-full"
          >
            <svg className="w-4! h-4! shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Hubungi Kami
          </a>
        </div>
      </main>
    </div>
  );
}
