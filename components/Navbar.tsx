"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Menu", href: "/menu" },
  { label: "Kontak", href: "/kontak" },
  { label: "Investor", href: "/investor" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-[70] w-full border-b border-brayan-cream/10 bg-[rgba(11,6,2,0.72)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-brayan-cream sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase leading-none tracking-[0.22em]" id="navbar-logo">
            Brayan Ngopi
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  id={`nav-item-${item.label.toLowerCase()}`}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                    active ? "text-brayan-copper" : "text-brayan-mist hover:text-brayan-cream"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            id="mobile-menu-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-brayan-cream/25 bg-brayan-edge md:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-500 ${
                isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-500 ${
                isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            key="fullscreen-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.82, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] flex min-h-screen flex-col justify-between overflow-hidden bg-brayan-bg px-6 py-24 text-brayan-cream sm:px-12 lg:px-24"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-brayan-cream/10" />
            <div className="grid gap-5 pt-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12 + index * 0.06,
                    duration: 0.85,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    id={`mobile-nav-item-${item.label.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`menu-link w-fit text-[clamp(3.3rem,12vw,10.5rem)] font-semibold ${
                      pathname === item.href ? "text-brayan-copper" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-10 border-t border-brayan-cream/15 pt-8 text-sm uppercase sm:grid-cols-3">
              <div>
                <p className="mb-3 text-brayan-mist/60">Social</p>
                <div className="grid gap-2">
                  <a href="https://instagram.com/brayanngopibekasi" target="_blank" rel="noopener noreferrer" className="hover:text-brayan-copper" id="social-link-instagram">
                    Instagram
                  </a>
                  <a href="https://tiktok.com/@brayanngopibekasi" target="_blank" rel="noopener noreferrer" className="hover:text-brayan-copper" id="social-link-tiktok">
                    TikTok
                  </a>
                </div>
              </div>
              <div>
                <p className="mb-3 text-brayan-mist/60">Contact</p>
                <div className="grid gap-2">
                  <a href="mailto:halo@brayanngopibekasi.id" className="hover:text-brayan-copper" id="contact-link-email">
                    halo@brayanngopibekasi.id
                  </a>
                  <a href="https://wa.me/6285283810837" target="_blank" rel="noopener noreferrer" className="hover:text-brayan-copper" id="contact-link-wa">
                    +62 852 8381 0837
                  </a>
                </div>
              </div>
              <div className="max-w-sm text-brayan-mist/70">
                Tempat nongkrong malam Bekasi dengan racikan Kopsuren gula aren, sanger khas, dan cemilan lezat.
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
