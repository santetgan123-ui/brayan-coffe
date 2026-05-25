import CountUp from "@/components/CountUp";
import LenisProvider from "@/components/LenisProvider";
import MagneticButton from "@/components/MagneticButton";
import SequenceScroll from "@/components/SequenceScroll";
import TextReveal from "@/components/TextReveal";
import TestimonialSlider from "@/components/TestimonialSlider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda | Brayan Ngopi Bekasi",
  description:
    "Selamat datang di Brayan Ngopi Bekasi. Kedai kopi indie premium dengan signature menu Kopsuren, Sanger, dan manual brew nusantara. Buka pukul 15.00 - 24.00 WIB.",
};

const bentoCards = [
  {
    title: "Kopsuren Gula Aren Khas",
    label: "Signature Milk Coffee",
    image: "/sequence/ezgif-frame-036.jpg",
    className: "lg:col-span-7 lg:row-span-2",
  },
  {
    title: "Manual Brew Kopi Nusantara",
    label: "Filter & Single Origin",
    image: "/sequence/ezgif-frame-096.jpg",
    className: "lg:col-span-5",
  },
  {
    title: "Cireng & Pisang Cokelat Keju",
    label: "Teman Ngopi Gurih",
    image: "/sequence/ezgif-frame-148.jpg",
    className: "lg:col-span-5",
  },
];

const stats = [
  { value: 2, suffix: "", label: "Cabang Aktif di Bekasi (PHB & Tarumajaya)" },
  { value: 25, suffix: "+", label: "Pilihan menu kopi, susu, & cemilan lezat" },
  { value: 100, suffix: "%", label: "Kopimu Kopi Kita - Rasa Otentik & Lezat" },
  { value: 4.9, suffix: "/5", label: "Rating ulasan Google Maps", decimals: 1 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--brayan-bg)] text-brayan-cream">
      <LenisProvider />
      <SequenceScroll />

      <div className="relative z-10 -mt-[8vh] bg-[var(--brayan-bg)] md:-mt-[10vh]">
        <section
          id="about"
          className="relative min-h-[112vh] px-6 pb-28 pt-[14vh] sm:px-12 md:pt-[18vh] lg:px-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="sticky top-28 hidden text-xs uppercase text-brayan-mist/60 lg:block">
              Bekasi / roast / kopimu kopi kita
            </div>
            <TextReveal
              className="text-[clamp(2.5rem,6.6vw,7.8rem)] font-semibold leading-[0.98]"
              text="Brayan Ngopi membangun pengalaman nongkrong di Bekasi yang hangat, intim, tenang, dengan cita rasa kopi otentik pilihan kita semua."
            />
          </div>
        </section>

        <section id="craft" className="px-6 py-20 sm:px-12 lg:px-24">
          <div className="mb-10 flex flex-col justify-between gap-6 border-t border-brayan-cream/12 pt-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-brayan-copper">Ruang Rasa</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.92]">
                Hitam, susu, cemilan manis & gurih.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-brayan-mist">
              Setiap detail menu dan suasana kedai kami rancang agar kebersamaan Anda terasa hangat: dari obrolan santai hingga momen bersantai di malam hari.
            </p>
          </div>

          <div className="grid auto-rows-[24rem] gap-4 lg:grid-cols-12">
            {bentoCards.map((card) => (
              <article
                key={card.title}
                className={`group relative overflow-hidden rounded-[8px] border border-brayan-cream/10 bg-brayan-edge ${card.className}`}
              >
                <img
                  src={card.image}
                  alt=""
                  className="h-full w-full object-cover opacity-[0.78] transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,6,2,0.05),rgba(11,6,2,0.74))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="mb-3 text-xs font-semibold uppercase text-brayan-copper">
                    {card.label}
                  </p>
                  <h3 className="max-w-md text-3xl font-semibold leading-none sm:text-5xl">
                    {card.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="numbers" className="px-6 py-24 sm:px-12 lg:px-24">
          <div className="grid gap-px overflow-hidden rounded-[8px] border border-brayan-cream/10 bg-brayan-cream/10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--brayan-bg)] p-7 sm:p-9">
                <p className="text-[clamp(3.4rem,6vw,6.5rem)] font-semibold leading-none text-brayan-cream">
                  <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="mt-5 max-w-48 text-sm uppercase leading-6 text-brayan-mist/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <TestimonialSlider />

        <section
          id="reserve"
          className="cta-motion-field relative isolate flex min-h-screen items-center overflow-hidden px-6 py-28 sm:px-12 lg:px-24"
        >
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="text-xs font-semibold uppercase text-brayan-copper">
              Datang Sore/Malam Ini
            </p>
            <h2 className="mt-6 text-[clamp(3.4rem,10vw,10rem)] font-bold leading-[0.84]">
              Kopimu Kopi Kita.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-brayan-mist">
              Cari rasa kopi pilihanmu, pesan menu cemilan favorit, dan santai bersama kerabat terdekat. Kami buka setiap hari pukul 15.00 - 24.00 WIB untuk menemani waktu rehat Anda.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/kontak">Reservasi Meja</MagneticButton>
              <MagneticButton href="/menu">Lihat Menu Lengkap</MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
