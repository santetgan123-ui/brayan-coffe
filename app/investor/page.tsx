import type { Metadata } from "next";
import InvestorForm from "@/components/InvestorForm";

export const metadata: Metadata = {
  title: "Kemitraan & Investasi",
  description:
    "Bergabunglah sebagai mitra/investor Brayan Ngopi Bekasi. Dapatkan peluang bisnis warkop kopi premium dengan ROI cepat, model operasional teruji, dan pangsa pasar anak muda Bekasi yang sangat potensial.",
};

const valueProps = [
  {
    title: "Brand Populer & Setia",
    description: "Brayan Ngopi telah memiliki basis pelanggan setia yang kuat di Bekasi, terbukti dengan ramainya cabang Tarumajaya & PHB setiap sore hingga malam hari.",
    icon: "☕",
  },
  {
    title: "SOP & Manajemen Teruji",
    description: "Kami menyediakan Standar Operasional Prosedur (SOP) yang ketat, pelatihan barista, sistem keuangan digital terpadu, dan manajemen rantai pasokan biji kopi berkelanjutan.",
    icon: "📈",
  },
  {
    title: "Return on Investment (ROI) Cepat",
    description: "Dengan margin keuntungan kotor hingga 65% dan biaya operasional yang efisien, proyeksi pengembalian modal rata-rata tercapai dalam 12 - 18 bulan saja.",
    icon: "💰",
  },
  {
    title: "Bahan Baku Terjamin & Traceable",
    description: "Kami mensuplai langsung biji kopi lokal berkualitas tinggi khas Kopsuren dan Sanger dengan harga beli grosir khusus untuk seluruh cabang kemitraan.",
    icon: "🌱",
  },
];

const tiers = [
  {
    name: "Franchise Mandiri (Full Outlet)",
    capital: "Mulai Rp150 Juta",
    perks: [
      "Lisensi Brand selama 3 tahun",
      "Peralatan mesin kopi & grinder premium komplit",
      "Sistem POS Kasir & Inventori 1 tahun",
      "Pelatihan barista & staf intensif",
      "Bantuan survei kelayakan lokasi",
      "Panduan promosi grand opening outlet",
    ],
    ctaText: "Pilih Franchise Mandiri",
  },
  {
    name: "Joint Venture (Silent Partner)",
    capital: "Mulai Rp30 Juta",
    perks: [
      "Kepemilikan saham cabang kolektif",
      "Bagi hasil keuntungan bulanan bersih (Profit Sharing)",
      "Laporan operasional outlet berkala transparan",
      "Manajemen outlet dikelola penuh tim pusat",
      "Tanpa ribet mengurus operasional harian",
      "Hak opsi perpanjangan kepemilikan saham",
    ],
    ctaText: "Pilih Silent Partner",
  },
];

export default function InvestorPage() {
  return (
    <main className="px-6 py-20 sm:px-12 lg:px-24">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl mb-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Kemitraan & Investasi</p>
        <h1 className="mt-5 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.9] text-brayan-cream">
          Tumbuh Bersama Kultur Kopi Bekasi.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brayan-mist/85">
          Brayan Ngopi telah membuktikan keberhasilan konsep kedai kopi premium bernuansa hangat dan terjangkau di Bekasi. Kami mengundang Anda menjadi bagian dari ekspansi strategis kami berikutnya dan menikmati profit bisnis kuliner yang menguntungkan secara berkelanjutan.
        </p>
      </section>

      {/* Why Invest Grid */}
      <section className="mx-auto max-w-6xl mb-24">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-wider text-brayan-copper">Mengapa Brayan Ngopi?</p>
          <h2 className="mt-3 text-3xl font-semibold text-brayan-cream">Keunggulan Kemitraan Kami</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {valueProps.map((prop) => (
            <article key={prop.title} className="rounded-xl border border-brayan-cream/10 bg-brayan-edge/30 p-6 flex flex-col justify-between">
              <div>
                <span className="text-3xl" role="img" aria-label={prop.title}>{prop.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-brayan-cream">{prop.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-brayan-mist/80">{prop.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Partnership Model Tiers */}
      <section className="mx-auto max-w-6xl mb-24">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-wider text-brayan-copper">Skema Investasi</p>
          <h2 className="mt-3 text-3xl font-semibold text-brayan-cream">Pilihan Model Kerja Sama</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {tiers.map((tier) => (
            <article key={tier.name} className="rounded-xl border border-brayan-cream/12 bg-brayan-edge p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-brayan-cream">{tier.name}</h3>
                <p className="mt-3 text-2xl font-bold text-brayan-copper">{tier.capital}</p>
                <div className="h-px bg-brayan-cream/10 my-6" />
                <ul className="grid gap-3 text-xs text-brayan-mist">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="text-brayan-copper">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href="#investor-form-section"
                  className="block text-center rounded-full border border-brayan-cream/20 bg-brayan-bg/40 px-5 py-3 text-xs uppercase tracking-wider text-brayan-cream hover:bg-brayan-copper hover:text-brayan-bg hover:border-brayan-copper transition-all font-semibold"
                >
                  {tier.ctaText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section id="investor-form-section" className="mx-auto max-w-3xl">
        <InvestorForm />
      </section>
    </main>
  );
}
