import type { Metadata } from "next";
import MenuClient from "@/components/MenuClient";

export const metadata: Metadata = {
  title: "Menu Kopi & Cemilan",
  description:
    "Jelajahi menu otentik Brayan Ngopi Bekasi. Tersedia pilihan kopi klasik (Espresso, Americano, Cappuccino), Kopsuren signature gula aren, sanger aceh, non-kopi premium, serta aneka cemilan gurih wangi.",
};

export default function MenuPage() {
  return (
    <main className="px-6 py-20 sm:px-12 lg:px-24">
      <section className="mx-auto max-w-6xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Menu Kami</p>
        <h1 className="mt-5 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.9]">
          Pilihan rasa otentik untuk menemani harimu.
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-brayan-mist/85">
          Semua racikan dibuat dengan sepenuh hati dari biji kopi berkualitas tinggi dan susu segar pilihan.
          Klik menu favoritmu di bawah ini untuk mereservasi meja/pesanan langsung ke cabang terdekat.
        </p>
      </section>

      <MenuClient />
    </main>
  );
}
