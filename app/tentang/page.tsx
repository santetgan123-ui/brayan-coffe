import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kisah Brayan Ngopi Bekasi: dari kultur kebersamaan hangat hingga menyajikan kopi berkualitas tinggi di PHB Medan Satria & Tarumajaya.",
};

export default function TentangPage() {
  return (
    <main className="px-6 py-20 sm:px-12 lg:px-24">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Tentang kami</p>
        <h1 className="mt-5 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.9]">
          Brayan Ngopi lahir dari kultur kebersamaan dan cangkir kopi malam Bekasi.
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-brayan-mist">
          Kami percaya cangkir kopi terbaik adalah cangkir yang disajikan di tengah obrolan hangat. Brayan Ngopi hadir di Bekasi dengan membawa konsep kenyamanan ruang, racikan rasa otentik yang familiar, serta dedikasi penuh untuk mendukung petani lokal dan menyajikan kopi berkualitas bagi semua orang.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3" id="vision-mission-cards">
        <article className="rounded-[8px] border border-brayan-cream/12 bg-brayan-edge p-6">
          <p className="text-xs uppercase text-brayan-copper">Visi</p>
          <p className="mt-4 text-brayan-mist">
            Menjadi ruang singgah terfavorit di Bekasi yang menyatukan orang-orang melalui kehangatan kopi otentik.
          </p>
        </article>
        <article className="rounded-[8px] border border-brayan-cream/12 bg-brayan-edge p-6">
          <p className="text-xs uppercase text-brayan-copper">Misi</p>
          <p className="mt-4 text-brayan-mist">
            Menyajikan kualitas produk terbaik dengan harga yang bersahabat, ramah untuk semua kalangan, serta pelayanan yang tulus dari hati.
          </p>
        </article>
        <article className="rounded-[8px] border border-brayan-cream/12 bg-brayan-edge p-6">
          <p className="text-xs uppercase text-brayan-copper">Dua Cabang Bekasi</p>
          <p className="mt-4 text-brayan-mist">
            Hadir dekat dengan Anda di **PHB Medan Satria** dan **Tarumajaya** dengan kenyamanan fasilitas indoor dan outdoor.
          </p>
        </article>
      </section>
    </main>
  );
}
