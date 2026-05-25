import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Menu", href: "/menu" },
  { label: "Kontak", href: "/kontak" },
  { label: "Investor", href: "/investor" },
  { label: "Admin", href: "/admin" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-brayan-cream/12 bg-brayan-bg px-6 py-12 sm:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm uppercase text-brayan-mist/70 md:flex-row md:items-center md:justify-between">
        <p className="tracking-[0.2em] text-brayan-cream" id="footer-logo">Brayan Ngopi</p>
        <div className="flex flex-wrap gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brayan-copper" id={`footer-link-${link.label.toLowerCase()}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <p id="footer-address">PHB & Tarumajaya - Bekasi</p>
      </div>
    </footer>
  );
}
