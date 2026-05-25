"use client";

import { useEffect, useState } from "react";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
  status: string;
  createdAt: string;
}

interface InvestorInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  capital: string;
  location: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardClient() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<InvestorInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<"reservations" | "investors">("reservations");

  useEffect(() => {
    // 1. Ambil atau inisialisasi default reservasi
    const storedReservations = localStorage.getItem("brayan_reservations");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    } else {
      const defaultReservations: Reservation[] = [
        {
          id: "r1",
          name: "Rian Hidayat",
          phone: "081298765432",
          branch: "Tarumajaya",
          date: new Date().toISOString().split("T")[0],
          time: "19:00",
          guests: "4 Orang",
          notes: "Meja outdoor dekat panggung musik",
          status: "Dikonfirmasi",
          createdAt: new Date().toISOString(),
        },
        {
          id: "r2",
          name: "Siti Rahma",
          phone: "087812345678",
          branch: "PHB Medan Satria",
          date: new Date().toISOString().split("T")[0],
          time: "20:30",
          guests: "2 Orang",
          notes: "Meja pojok yang tenang",
          status: "Belum Dikonfirmasi",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("brayan_reservations", JSON.stringify(defaultReservations));
      setReservations(defaultReservations);
    }

    // 2. Ambil atau inisialisasi default investor
    const storedInquiries = localStorage.getItem("brayan_investor_inquiries");
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      const defaultInquiries: InvestorInquiry[] = [
        {
          id: "i1",
          name: "Gunawan Wijaya",
          email: "gunawan.w@gmail.com",
          phone: "085277778888",
          capital: "Rp100 Juta - Rp200 Juta",
          location: "Bekasi Barat",
          message: "Tertarik membuka cabang baru dengan skema Silent Partner.",
          status: "Sudah Dihubungi",
          createdAt: new Date().toISOString(),
        },
        {
          id: "i2",
          name: "Dewi Lestari",
          email: "dewi.l@outlook.com",
          phone: "081399990000",
          capital: "Rp200 Juta+",
          location: "Jatiasih",
          message: "Ingin mengajukan kemitraan Franchise Mandiri penuh. Mohon hubungi saya.",
          status: "Belum Dihubungi",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("brayan_investor_inquiries", JSON.stringify(defaultInquiries));
      setInquiries(defaultInquiries);
    }
  }, []);

  const handleUpdateReservationStatus = (id: string, newStatus: string) => {
    const updated = reservations.map((res) => (res.id === id ? { ...res, status: newStatus } : res));
    setReservations(updated);
    localStorage.setItem("brayan_reservations", JSON.stringify(updated));
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: string) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    localStorage.setItem("brayan_investor_inquiries", JSON.stringify(updated));
  };

  const handleDeleteReservation = (id: string) => {
    const filtered = reservations.filter((res) => res.id !== id);
    setReservations(filtered);
    localStorage.setItem("brayan_reservations", JSON.stringify(filtered));
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter((inq) => inq.id !== id);
    setInquiries(filtered);
    localStorage.setItem("brayan_investor_inquiries", JSON.stringify(filtered));
  };

  return (
    <div className="mt-8">
      {/* Statistik Atas */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        <article className="rounded-lg border border-brayan-cream/10 bg-brayan-bg p-5">
          <p className="text-xs uppercase text-brayan-mist/70">Produk Aktif</p>
          <p className="mt-3 text-4xl font-semibold text-brayan-cream">25</p>
        </article>
        <article className="rounded-lg border border-brayan-cream/10 bg-brayan-bg p-5">
          <p className="text-xs uppercase text-brayan-mist/70">Total Reservasi Meja</p>
          <p className="mt-3 text-4xl font-semibold text-brayan-cream">{reservations.length}</p>
        </article>
        <article className="rounded-lg border border-brayan-cream/10 bg-brayan-bg p-5">
          <p className="text-xs uppercase text-brayan-mist/70">Pengajuan Kemitraan</p>
          <p className="mt-3 text-4xl font-semibold text-brayan-cream">{inquiries.length}</p>
        </article>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-4 border-b border-brayan-cream/10 pb-4 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("reservations")}
          className={`text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "reservations"
              ? "border-brayan-copper text-brayan-copper font-semibold"
              : "border-transparent text-brayan-mist hover:text-brayan-cream"
          }`}
        >
          Daftar Reservasi Meja ({reservations.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("investors")}
          className={`text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "investors"
              ? "border-brayan-copper text-brayan-copper font-semibold"
              : "border-transparent text-brayan-mist hover:text-brayan-cream"
          }`}
        >
          Pengajuan Investor Kemitraan ({inquiries.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "reservations" ? (
        <section className="overflow-x-auto rounded-lg border border-brayan-cream/10 bg-brayan-bg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-brayan-edge text-brayan-mist/85 border-b border-brayan-cream/10 uppercase tracking-wider text-[10px]">
                <th className="p-4 font-semibold">Pelanggan</th>
                <th className="p-4 font-semibold">Cabang</th>
                <th className="p-4 font-semibold">Waktu Datang</th>
                <th className="p-4 font-semibold">Pax</th>
                <th className="p-4 font-semibold">Catatan</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-brayan-mist">Belum ada reservasi masuk.</td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} className="border-t border-brayan-cream/5 hover:bg-brayan-edge/30">
                    <td className="p-4">
                      <p className="font-semibold text-brayan-cream">{res.name}</p>
                      <p className="text-[10px] text-brayan-mist">{res.phone}</p>
                    </td>
                    <td className="p-4 text-brayan-cream">{res.branch}</td>
                    <td className="p-4">
                      <p className="text-brayan-cream">{res.date}</p>
                      <p className="text-[10px] text-brayan-mist">{res.time} WIB</p>
                    </td>
                    <td className="p-4 text-brayan-cream">{res.guests}</td>
                    <td className="p-4 text-brayan-mist/90 max-w-[12rem] truncate" title={res.notes}>{res.notes || "-"}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                        res.status === "Dikonfirmasi" 
                          ? "bg-brayan-sage/20 text-brayan-cream border border-brayan-sage/40" 
                          : "bg-brayan-copper/20 text-brayan-copper border border-brayan-copper/40"
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      {res.status === "Belum Dikonfirmasi" ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateReservationStatus(res.id, "Dikonfirmasi")}
                          className="rounded bg-brayan-sage/20 border border-brayan-sage/40 px-2 py-1 text-[9px] uppercase tracking-wider text-brayan-cream hover:bg-brayan-sage hover:text-brayan-bg transition-colors"
                        >
                          Konfirmasi
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateReservationStatus(res.id, "Belum Dikonfirmasi")}
                          className="rounded bg-brayan-copper/20 border border-brayan-copper/40 px-2 py-1 text-[9px] uppercase tracking-wider text-brayan-copper hover:bg-brayan-copper hover:text-brayan-bg transition-colors"
                        >
                          Batalkan
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteReservation(res.id)}
                        className="rounded border border-red-500/30 bg-red-500/10 px-2 py-1 text-[9px] uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="overflow-x-auto rounded-lg border border-brayan-cream/10 bg-brayan-bg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-brayan-edge text-brayan-mist/85 border-b border-brayan-cream/10 uppercase tracking-wider text-[10px]">
                <th className="p-4 font-semibold">Investor</th>
                <th className="p-4 font-semibold">Modal</th>
                <th className="p-4 font-semibold">Rencana Lokasi</th>
                <th className="p-4 font-semibold">Pesan</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brayan-mist">Belum ada pengajuan investor masuk.</td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="border-t border-brayan-cream/5 hover:bg-brayan-edge/30">
                    <td className="p-4">
                      <p className="font-semibold text-brayan-cream">{inq.name}</p>
                      <p className="text-[10px] text-brayan-mist">{inq.phone} / {inq.email}</p>
                    </td>
                    <td className="p-4 text-brayan-copper font-semibold">{inq.capital}</td>
                    <td className="p-4 text-brayan-cream">{inq.location}</td>
                    <td className="p-4 text-brayan-mist/90 max-w-[12rem] truncate" title={inq.message}>{inq.message || "-"}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                        inq.status === "Sudah Dihubungi" 
                          ? "bg-brayan-sage/20 text-brayan-cream border border-brayan-sage/40" 
                          : "bg-brayan-copper/20 text-brayan-copper border border-brayan-copper/40"
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      {inq.status === "Belum Dihubungi" ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateInquiryStatus(inq.id, "Sudah Dihubungi")}
                          className="rounded bg-brayan-sage/20 border border-brayan-sage/40 px-2 py-1 text-[9px] uppercase tracking-wider text-brayan-cream hover:bg-brayan-sage hover:text-brayan-bg transition-colors"
                        >
                          Tandai Dihubungi
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateInquiryStatus(inq.id, "Belum Dihubungi")}
                          className="rounded bg-brayan-copper/20 border border-brayan-copper/40 px-2 py-1 text-[9px] uppercase tracking-wider text-brayan-copper hover:bg-brayan-copper hover:text-brayan-bg transition-colors"
                        >
                          Batalkan
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="rounded border border-red-500/30 bg-red-500/10 px-2 py-1 text-[9px] uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
