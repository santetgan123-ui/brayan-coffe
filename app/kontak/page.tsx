import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Kontak & Lokasi Cabang",
  description:
    "Hubungi Brayan Ngopi Bekasi. Informasi alamat lengkap 2 cabang kami di PHB Medan Satria & Tarumajaya, nomor WhatsApp reservasi (+62 852-8381-0837), jam operasional, serta form booking meja langsung.",
};

export default function KontakPage() {
  return (
    <main className="px-6 py-20 sm:px-12 lg:px-24">
      <section className="mx-auto max-w-6xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Hubungi Kami</p>
        <h1 className="mt-5 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.9]">
          Reservasi, Lokasi Cabang, & Info Kontak.
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-brayan-mist/85">
          Kami memiliki 2 cabang aktif di Bekasi yang siap menyambut kehadiran Anda. Silakan pilih cabang terdekat Anda di bawah ini, atau isi formulir reservasi meja untuk mendapatkan tempat terbaik malam ini!
        </p>

        {/* Quick Info Grid */}
        <div className="grid gap-6 mt-12 sm:grid-cols-3 border-y border-brayan-cream/10 py-8">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brayan-copper">Jam Operasional</p>
            <p className="mt-2 text-sm text-brayan-cream">Buka Setiap Hari</p>
            <p className="mt-1 text-sm font-semibold text-brayan-cream">15.00 - 24.00 WIB</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brayan-copper">Nomor WhatsApp</p>
            <a href="https://wa.me/6285283810837" target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm font-semibold text-brayan-cream hover:text-brayan-copper">
              +62 852 8381 0837
            </a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brayan-copper">Media Sosial</p>
            <div className="mt-2 flex gap-4 text-sm font-semibold">
              <a href="https://instagram.com/brayanngopibekasi" target="_blank" rel="noopener noreferrer" className="text-brayan-cream hover:text-brayan-copper">
                @brayanngopibekasi
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl mt-16">
        <ContactClient />
      </section>
    </main>
  );
}
