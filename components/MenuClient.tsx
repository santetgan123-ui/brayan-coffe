"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MenuItem {
  name: string;
  category: "coffee" | "milk-coffee" | "non-coffee" | "snacks";
  priceHot?: string;
  priceIced?: string;
  priceSingle?: string;
  description: string;
}

const menuData: MenuItem[] = [
  // COFFEE
  { name: "Espresso", category: "coffee", priceHot: "Rp8.000", description: "Ekstraksi kopi murni konsentrasi tinggi, kuat dan pekat." },
  { name: "Double Espresso", category: "coffee", priceHot: "Rp12.000", description: "Double shot espresso murni untuk suntikan kafein ekstra." },
  { name: "Americano / Black Coffee", category: "coffee", priceHot: "Rp10.000", priceIced: "Rp12.000", description: "Espresso shot dilarutkan air panas, bersih dan menyegarkan." },
  { name: "Cappuccino", category: "coffee", priceHot: "Rp15.000", priceIced: "Rp17.000", description: "Racikan klasik espresso, susu hangat lembut, dan tebalnya foam susu." },
  { name: "Coffee Latte", category: "coffee", priceHot: "Rp15.000", priceIced: "Rp15.000", description: "Paduan espresso berpadu susu segar yang creamy dengan lapisan mikro foam tipis." },
  { name: "Kopsuren (Aren)", category: "coffee", priceHot: "Rp13.000", priceIced: "Rp15.000", description: "Signature milk coffee khas Brayan Ngopi berpadu manisnya gula aren lokal asli." },
  { name: "Sanger", category: "coffee", priceHot: "Rp13.000", priceIced: "Rp15.000", description: "Kopi khas Aceh, kombinasi espresso kental dan manis gurih susu kental manis." },
  { name: "Manual Brew V60 / Kalita", category: "coffee", priceHot: "Rp17.000", priceIced: "Rp17.000", description: "Seduhan kopi manual menggunakan paper filter, mengeluarkan taste notes biji kopi single origin secara bersih." },
  { name: "Vietnam Drip", category: "coffee", priceHot: "Rp17.000", priceIced: "Rp20.000", description: "Kopi seduh tetes ala Vietnam berpadu lapisan manis susu kental di dasar cangkir." },
  { name: "Kopi Tubruk", category: "coffee", priceHot: "Rp10.000", description: "Seduhan kopi tubruk tradisional kasar yang pekat, bold, dan otentik." },

  // MILK COFFEE
  { name: "Caramel Latte", category: "milk-coffee", priceHot: "Rp16.000", priceIced: "Rp16.000", description: "Espresso, susu segar creamy, dengan sirup karamel manis harum." },
  { name: "Salted Caramel Latte", category: "milk-coffee", priceHot: "Rp18.000", priceIced: "Rp18.000", description: "Rasa manis gurih karamel asin menyatu sempurna dengan espresso yang mantap." },
  { name: "Butterscotch Latte", category: "milk-coffee", priceHot: "Rp16.000", priceIced: "Rp18.000", description: "Nikmatnya aroma mentega panggang karamel khas berpadu espresso latte." },
  { name: "Hazelnut Latte", category: "milk-coffee", priceHot: "Rp16.000", priceIced: "Rp18.000", description: "Espresso susu lembut dengan aroma manis gurih hazelnut panggang." },
  { name: "Banana Latte", category: "milk-coffee", priceHot: "Rp16.000", priceIced: "Rp18.000", description: "Kombinasi unik espreeso latte dengan aroma pisang manis segar nan unik." },
  { name: "Pandan Latte", category: "milk-coffee", priceHot: "Rp16.000", priceIced: "Rp18.000", description: "Cita rasa latte beraroma pandan tradisional wangi manis yang menenangkan." },

  // NON COFFEE
  { name: "Chocolate Latte", category: "non-coffee", priceHot: "Rp12.000", priceIced: "Rp15.000", description: "Cokelat premium pekat berpadu kelembutan susu segar." },
  { name: "Matcha Latte", category: "non-coffee", priceHot: "Rp12.000", priceIced: "Rp15.000", description: "Matcha teh hijau khas Jepang kualitas tinggi dengan susu segar creamy." },
  { name: "Red Velvet", category: "non-coffee", priceHot: "Rp12.000", priceIced: "Rp15.000", description: "Minuman red velvet manis lembut yang bertekstur cokelat tipis manis gurih." },
  { name: "Taro Latte", category: "non-coffee", priceHot: "Rp12.000", priceIced: "Rp15.000", description: "Taro ubi ungu manis legit yang harum lembut khas wangi susu." },

  // SNACKS
  { name: "Cireng Crispy", category: "snacks", priceSingle: "Rp10.000", description: "Cireng goreng gurih renyah di luar, lembut di dalam dengan bumbu cocolan khas." },
  { name: "Risoles", category: "snacks", priceSingle: "Rp10.000", description: "Risoles goreng renyah dengan isian lezat gurih." },
  { name: "Kentang Goreng (French Fries)", category: "snacks", priceSingle: "Rp12.000", description: "Kentang goreng potongan lurus renyah, dibumbui asin gurih." },
  { name: "Pisang Cokelat Keju", category: "snacks", priceSingle: "Rp12.000", description: "Pisang goreng legit bertabur parutan cokelat manis dan keju gurih melimpah." },
  { name: "Roti Bakar", category: "snacks", priceSingle: "Rp12.000", description: "Roti bakar tebal mentega dengan varian topping manis pilihan." },
  { name: "Otak-Otak Goreng", category: "snacks", priceSingle: "Rp10.000", description: "Otak-otak ikan goreng gurih kenyal dengan cocolan saus." },
  { name: "Sosis Bakar / Goreng", category: "snacks", priceSingle: "Rp10.000", description: "Sosis sapi berkualitas dipanggang/goreng dengan saus cocolan." },
  { name: "Dimsum Ayam", category: "snacks", priceSingle: "Rp12.000", description: "Dimsum kukus lembut hangat dengan isian daging ayam gurih melimpah." },
];

const categories = [
  { id: "all", label: "Semua Menu" },
  { id: "coffee", label: "Kopi Hitam & Klasik" },
  { id: "milk-coffee", label: "Susu Latte Manis" },
  { id: "non-coffee", label: "Non-Kopi" },
  { id: "snacks", label: "Cemilan Teman Ngopi" },
];

export default function MenuClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("Tarumajaya");

  const filteredMenu = activeTab === "all" 
    ? menuData 
    : menuData.filter((item) => item.category === activeTab);

  const getWhatsAppLink = (itemName: string, type: "Hot" | "Iced" | "Porsi") => {
    const text = encodeURIComponent(
      `Halo Kak! Saya ingin mereservasi tempat di Cabang Brayan Ngopi *${selectedBranch}* dan memesan menu *${itemName}* (${type}). Tolong info ketersediaan mejanya ya kak!`
    );
    return `https://wa.me/6285283810837?text=${text}`;
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Branch Selector */}
      <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-brayan-cream/10 bg-brayan-edge p-5 sm:flex-row">
        <div>
          <p className="text-xs uppercase tracking-wider text-brayan-copper">Cabang Tujuan Reservasi</p>
          <p className="mt-1 text-sm text-brayan-mist">Pilih cabang terdekat untuk tujuan reservasi pesanan Anda</p>
        </div>
        <div className="flex gap-3">
          {["Tarumajaya", "PHB Medan Satria"].map((branch) => (
            <button
              key={branch}
              type="button"
              onClick={() => setSelectedBranch(branch)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedBranch === branch
                  ? "bg-brayan-copper text-brayan-bg font-semibold"
                  : "border border-brayan-cream/20 text-brayan-mist hover:border-brayan-copper hover:text-brayan-copper"
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap gap-2 border-b border-brayan-cream/10 pb-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            className={`rounded-full px-4 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === cat.id
                ? "bg-brayan-cream text-brayan-bg font-semibold"
                : "text-brayan-mist hover:text-brayan-cream"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.article
              layout
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col justify-between rounded-xl border border-brayan-cream/10 bg-brayan-edge/40 p-6 transition-all duration-300 hover:border-brayan-cream/20 hover:bg-brayan-edge/70"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-brayan-cream">{item.name}</h3>
                  <div className="text-right">
                    {item.priceSingle ? (
                      <span className="text-sm font-semibold text-brayan-copper">{item.priceSingle}</span>
                    ) : (
                      <div className="flex flex-col gap-1 text-xs">
                        {item.priceHot && (
                          <span className="text-brayan-cream/90">
                            Hot: <span className="font-semibold text-brayan-copper">{item.priceHot}</span>
                          </span>
                        )}
                        {item.priceIced && (
                          <span className="text-brayan-cream/90">
                            Iced: <span className="font-semibold text-brayan-copper">{item.priceIced}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brayan-mist/80">{item.description}</p>
              </div>

              {/* Order buttons */}
              <div className="mt-6 flex flex-wrap gap-2 border-t border-brayan-cream/5 pt-4">
                {item.priceSingle ? (
                  <a
                    href={getWhatsAppLink(item.name, "Porsi")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-brayan-copper/15 border border-brayan-copper/30 py-2 text-[10px] uppercase tracking-wider text-brayan-copper transition-all hover:bg-brayan-copper hover:text-brayan-bg font-semibold"
                  >
                    Pesan Ke WhatsApp ({selectedBranch})
                  </a>
                ) : (
                  <>
                    {item.priceHot && (
                      <a
                        href={getWhatsAppLink(item.name, "Hot")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center rounded-lg bg-brayan-copper/15 border border-brayan-copper/30 py-2 text-[10px] uppercase tracking-wider text-brayan-copper transition-all hover:bg-brayan-copper hover:text-brayan-bg font-semibold"
                      >
                        Pesan Hot
                      </a>
                    )}
                    {item.priceIced && (
                      <a
                        href={getWhatsAppLink(item.name, "Iced")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center rounded-lg bg-brayan-copper/15 border border-brayan-copper/30 py-2 text-[10px] uppercase tracking-wider text-brayan-copper transition-all hover:bg-brayan-copper hover:text-brayan-bg font-semibold"
                      >
                        Pesan Iced
                      </a>
                    )}
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Booking Prompt */}
      <section className="mt-20 rounded-xl border border-brayan-cream/10 bg-[linear-gradient(135deg,#120802_0%,#261205_100%)] p-8 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brayan-copper">Kumpul Rame-Rame?</p>
        <h2 className="mt-4 text-3xl font-semibold text-brayan-cream sm:text-4xl">Booking Meja & Acara Komunitas</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brayan-mist">
          Ingin mengadakan arisan, kumpul komunitas, rapat, atau private cupping session di salah satu cabang kami di Bekasi? Kami siap menyediakan tempat terbaik lengkap dengan paket kopi & snacks hemat.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/6285283810837?text=Halo%20Brayan%20Ngopi!%20Saya%20tertarik%20untuk%20booking%20tempat%20untuk%20acara%20saya..."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brayan-cream px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-brayan-bg transition-colors hover:bg-brayan-copper hover:text-brayan-bg"
          >
            Hubungi WhatsApp Admin
          </a>
        </div>
      </section>
    </div>
  );
}
