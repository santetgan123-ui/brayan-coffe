"use client";

import { useState } from "react";

export default function InvestorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    capital: "Rp50 Juta - Rp100 Juta",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Simpan ke LocalStorage untuk Dashboard Admin
    const existingInquiries = JSON.parse(localStorage.getItem("brayan_investor_inquiries") || "[]");
    const newInquiry = {
      ...formData,
      id: Date.now().toString(),
      status: "Belum Dihubungi",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(
      "brayan_investor_inquiries",
      JSON.stringify([newInquiry, ...existingInquiries])
    );

    // 2. Format WhatsApp Alert
    const waText = encodeURIComponent(
      `Halo Management Brayan Ngopi! Saya berminat untuk bergabung sebagai Mitra/Investor.\n\n` +
      `- Nama Lengkap: ${formData.name}\n` +
      `- No. WhatsApp: ${formData.phone}\n` +
      `- Email: ${formData.email}\n` +
      `- Modal Investasi: ${formData.capital}\n` +
      `- Rencana Lokasi: ${formData.location || "-"}\n` +
      `- Pesan Tambahan: ${formData.message || "-"}\n\n` +
      `Mohon kirimkan proposal kemitraan resmi ke kontak saya. Terima kasih!`
    );

    // 3. Buka WhatsApp
    window.open(`https://wa.me/6285283810837?text=${waText}`, "_blank");

    setSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      capital: "Rp50 Juta - Rp100 Juta",
      location: "",
      message: "",
    });
  };

  return (
    <div className="rounded-xl border border-brayan-cream/12 bg-brayan-edge p-6 sm:p-10 relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(200,137,59,0.06),transparent_48%)] pointer-events-none" />
      
      <h2 className="text-2xl font-semibold text-brayan-cream" id="investor-form-title">Hubungi Tim Kemitraan Kami</h2>
      <p className="mt-2 text-xs text-brayan-mist">
        Silakan isi data diri Anda di bawah ini. Tim kami akan segera mengirimkan berkas Proposal Kemitraan & Proyeksi ROI resmi lewat Email/WhatsApp Anda.
      </p>

      {submitted && (
        <div className="mt-6 rounded-lg bg-brayan-copper/15 border border-brayan-copper/35 p-4 text-xs text-brayan-cream">
          <p className="font-semibold text-brayan-copper">Pengajuan Berhasil Dikirim!</p>
          <p className="mt-1 text-brayan-mist">Data Anda telah tersimpan di Dashboard Admin kami dan Anda telah diarahkan ke WhatsApp Kemitraan resmi. Tim kami akan segera menghubungi Anda kembali.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name-input" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name-input"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Andi Wijaya"
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream placeholder-brayan-mist/35 focus:border-brayan-copper focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone-input" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Nomor WhatsApp</label>
            <input
              type="tel"
              id="phone-input"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contoh: 0852xxxxxxxx"
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream placeholder-brayan-mist/35 focus:border-brayan-copper focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email-input" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Alamat Email</label>
          <input
            type="email"
            id="email-input"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Contoh: andi@gmail.com"
            className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream placeholder-brayan-mist/35 focus:border-brayan-copper focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="capital-select" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Kesiapan Modal Kerja</label>
            <select
              id="capital-select"
              name="capital"
              required
              value={formData.capital}
              onChange={handleChange}
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream focus:border-brayan-copper focus:outline-none"
            >
              <option value="Rp30 Juta - Rp50 Juta">Rp30 Juta - Rp50 Juta</option>
              <option value="Rp50 Juta - Rp100 Juta">Rp50 Juta - Rp100 Juta</option>
              <option value="Rp100 Juta - Rp200 Juta">Rp100 Juta - Rp200 Juta</option>
              <option value="Rp200 Juta+">Rp200 Juta Lebih (Skala Besar)</option>
            </select>
          </div>
          <div>
            <label htmlFor="location-input" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Rencana Lokasi Usaha</label>
            <input
              type="text"
              id="location-input"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Contoh: Bekasi Barat, Jatiasih, dll."
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream placeholder-brayan-mist/35 focus:border-brayan-copper focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message-textarea" className="block text-[10px] uppercase tracking-wider text-brayan-mist mb-2">Pesan & Pertanyaan (Opsional)</label>
          <textarea
            id="message-textarea"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Jelaskan ekspektasi kemitraan Anda atau tanyakan perihal franchise di sini."
            className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-xs text-brayan-cream placeholder-brayan-mist/35 focus:border-brayan-copper focus:outline-none"
          />
        </div>

        <button
          type="submit"
          id="submit-investor-form"
          className="w-full rounded-full border border-brayan-copper bg-brayan-copper px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-brayan-bg transition-colors hover:bg-transparent hover:text-brayan-copper mt-3"
        >
          Kirim Pengajuan Kemitraan
        </button>
      </form>
    </div>
  );
}
