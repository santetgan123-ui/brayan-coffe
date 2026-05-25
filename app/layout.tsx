import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://brayanngopibekasi.id"),
  title: {
    default: "Brayan Ngopi Bekasi | Kopimu Kopi Kita",
    template: "%s | Brayan Ngopi Bekasi",
  },
  description:
    "Brayan Ngopi Bekasi: Tempat nongkrong indie premium dengan suasana hangat, menu kopi otentik khas Gula Aren (Kopsuren), Sanger, Manual Brew, dan cemilan lezat. Hadir di PHB Medan Satria & Tarumajaya.",
  keywords: [
    "brayan ngopi",
    "brayan ngopi bekasi",
    "brayan coffee bekasi",
    "brayan phb",
    "brayan tarumajaya",
    "tempat ngopi bekasi",
    "warkop premium bekasi",
    "kopi susu bekasi",
    "indie coffee house bekasi",
    "kuliner bekasi",
  ],
  openGraph: {
    title: "Brayan Ngopi Bekasi | Kopimu Kopi Kita",
    description:
      "Tempat ngopi indie premium di Bekasi dengan suasana nyaman dan menu berkualitas. Kunjungi cabang PHB Medan Satria & Tarumajaya.",
    url: "https://brayanngopibekasi.id",
    siteName: "Brayan Ngopi Bekasi",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brayan Ngopi Bekasi",
    description: "Indie coffee house Bekasi dengan tagline Kopimu Kopi Kita.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CoffeeShop",
  "name": "Brayan Ngopi Bekasi",
  "image": "https://brayanngopibekasi.id/sequence/ezgif-frame-036.jpg",
  "@id": "https://brayanngopibekasi.id",
  "url": "https://brayanngopibekasi.id",
  "telephone": "+6285283810837",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Tarumajaya, Setiamulya, Kec. Tarumajaya",
    "addressLocality": "Bekasi",
    "addressRegion": "Jawa Barat",
    "postalCode": "17215",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.134118,
    "longitude": 106.993077
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "15:00",
    "closes": "24:00"
  },
  "sameAs": [
    "https://www.instagram.com/brayanngopibekasi",
    "https://www.tiktok.com/@brayanngopibekasi"
  ],
  "department": [
    {
      "@type": "CoffeeShop",
      "name": "Brayan Ngopi PHB Medan Satria",
      "image": "https://brayanngopibekasi.id/sequence/ezgif-frame-096.jpg",
      "telephone": "+6285283810837",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perumahan Harapan Baru (PHB), Medan Satria",
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "postalCode": "17132",
        "addressCountry": "ID"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "15:00",
        "closes": "24:00"
      }
    },
    {
      "@type": "CoffeeShop",
      "name": "Brayan Ngopi Tarumajaya",
      "image": "https://brayanngopibekasi.id/sequence/ezgif-frame-148.jpg",
      "telephone": "+6285283810837",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Tarumajaya, Setiamulya, Kec. Tarumajaya",
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "postalCode": "17215",
        "addressCountry": "ID"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "15:00",
        "closes": "24:00"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="grain min-h-screen overflow-x-hidden bg-[var(--brayan-bg)] text-brayan-cream">
          <Navbar />
          <div className="pt-20">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

