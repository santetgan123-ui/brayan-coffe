"use client";

import { useState } from "react";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "Tarumajaya",
    date: "",
    time: "",
    guests: "2 Orang",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Simpan ke LocalStorage untuk Dashboard Admin
    const existingReservations = JSON.parse(localStorage.getItem("brayan_reservations") || "[]");
    const newReservation = {
      ...formData,
      id: Date.now().toString(),
      status: "Belum Dikonfirmasi",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(
      "brayan_reservations",
      JSON.stringify([newReservation, ...existingReservations])
    );

    // 2. Format pesan WhatsApp
    const message = encodeURIComponent(
      `Halo Brayan Ngopi! Saya ingin reservasi meja atas nama *${formData.name}* (${formData.phone}) di cabang *${formData.branch}*.\n\n` +
      `- Tanggal: ${formData.date}\n` +
      `- Jam Datang: ${formData.time} WIB\n` +
      `- Jumlah Orang: ${formData.guests}\n` +
      `- Catatan Khusus: ${formData.notes || "-"}\n\n` +
      `Mohon informasikan ketersediaan tempatnya ya kak, terima kasih!`
    );

    // 3. Buka WhatsApp
    window.open(`https://wa.me/6285283810837?text=${message}`, "_blank");

    setSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      branch: "Tarumajaya",
      date: "",
      time: "",
      guests: "2 Orang",
      notes: "",
    });
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Kiri: Cabang & Google Maps */}
      <div className="grid gap-8">
        <h2 className="text-2xl font-semibold text-brayan-cream border-b border-brayan-cream/10 pb-3">Lokasi Cabang Kami</h2>

        {/* Cabang 1 */}
        <article className="rounded-xl border border-brayan-cream/10 bg-brayan-edge/30 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brayan-copper">Cabang Utama</p>
              <h3 className="mt-1 text-xl font-semibold text-brayan-cream">Brayan Ngopi Tarumajaya</h3>
              <p className="mt-2 text-xs leading-relaxed text-brayan-mist">
                Jl. Tarumajaya, Setiamulya, Kec. Tarumajaya, Kab. Bekasi, Jawa Barat
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Brayan+Ngopi+Tarumajaya+Bekasi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center sm:w-auto shrink-0 rounded-full border border-brayan-copper/40 px-5 py-2 text-xs uppercase tracking-wider text-brayan-copper hover:bg-brayan-copper hover:text-brayan-bg transition-all"
            >
              Rute Gmaps
            </a>
          </div>
          {/* Iframe Embed */}
          <div className="mt-5 overflow-hidden rounded-lg border border-brayan-cream/10 h-64 bg-brayan-bg relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.974528181667!2d106.9930773!3d-6.1341183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a21e64906f3db%3A0x6bfe76e27b4bbd9d!2sSetiamulya%2C%20Tarumajaya%2C%20Bekasi%20Regency%2C%20West%20Java!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Brayan Ngopi Tarumajaya"
            />
          </div>
        </article>

        {/* Cabang 2 */}
        <article className="rounded-xl border border-brayan-cream/10 bg-brayan-edge/30 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brayan-copper">Cabang Kedua</p>
              <h3 className="mt-1 text-xl font-semibold text-brayan-cream">Brayan Ngopi PHB Medan Satria</h3>
              <p className="mt-2 text-xs leading-relaxed text-brayan-mist">
                Perumahan Harapan Baru (PHB), Medan Satria, Bekasi, Jawa Barat
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Harapan+Baru+Medan+Satria+Bekasi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center sm:w-auto shrink-0 rounded-full border border-brayan-copper/40 px-5 py-2 text-xs uppercase tracking-wider text-brayan-copper hover:bg-brayan-copper hover:text-brayan-bg transition-all"
            >
              Rute Gmaps
            </a>
          </div>
          {/* Iframe Embed */}
          <div className="mt-5 overflow-hidden rounded-lg border border-brayan-cream/10 h-64 bg-brayan-bg relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.529850123594!2d106.9803275!3d-6.1935928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bf411626f21%3A0xe5a3630f576e33db!2sPerumahan%20Harapan%20Baru!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Brayan Ngopi PHB Medan Satria"
            />
          </div>
        </article>
      </div>

      {/* Kanan: Form Reservasi Interaktif */}
      <div>
        <h2 className="text-2xl font-semibold text-brayan-cream border-b border-brayan-cream/10 pb-3 mb-6">Reservasi Meja</h2>
        
        {submitted && (
          <div className="mb-6 rounded-lg bg-brayan-copper/10 border border-brayan-copper/30 p-4 text-xs text-brayan-cream">
            <p className="font-semibold text-brayan-copper">Reservasi Dikirim!</p>
            <p className="mt-1 text-brayan-mist">Formulir Anda telah disimpan di Admin Panel dan dialihkan ke WhatsApp Admin. Mohon selesaikan pengiriman chat di aplikasi WhatsApp Anda.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5 rounded-xl border border-brayan-cream/12 bg-brayan-edge p-6 sm:p-8">
          <div>
            <label htmlFor="name-input" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name-input"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream placeholder-brayan-mist/40 focus:border-brayan-copper focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Nomor WhatsApp</label>
            <input
              type="tel"
              id="phone-input"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contoh: 0852xxxxxxxx"
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream placeholder-brayan-mist/40 focus:border-brayan-copper focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="branch-select" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Pilih Cabang</label>
            <select
              id="branch-select"
              name="branch"
              required
              value={formData.branch}
              onChange={handleChange}
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream focus:border-brayan-copper focus:outline-none"
            >
              <option value="Tarumajaya">Brayan Ngopi Tarumajaya (Bekasi)</option>
              <option value="PHB Medan Satria">Brayan Ngopi PHB Medan Satria (Bekasi)</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date-input" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Tanggal</label>
              <input
                type="date"
                id="date-input"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream focus:border-brayan-copper focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="time-input" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Jam Datang</label>
              <input
                type="time"
                id="time-input"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream focus:border-brayan-copper focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="guests-select" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Jumlah Orang</label>
            <select
              id="guests-select"
              name="guests"
              required
              value={formData.guests}
              onChange={handleChange}
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream focus:border-brayan-copper focus:outline-none"
            >
              <option value="1 Orang">1 Orang</option>
              <option value="2 Orang">2 Orang</option>
              <option value="3-4 Orang">3-4 Orang</option>
              <option value="5-8 Orang">5-8 Orang</option>
              <option value="8+ Orang (Rombongan)">8+ Orang (Rombongan)</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes-textarea" className="block text-xs uppercase tracking-wider text-brayan-mist mb-2">Catatan Tambahan (Opsional)</label>
            <textarea
              id="notes-textarea"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Contoh: Minta area dekat colokan / meja outdoor."
              className="w-full rounded-md border border-brayan-cream/15 bg-brayan-bg px-4 py-3 text-sm text-brayan-cream placeholder-brayan-mist/40 focus:border-brayan-copper focus:outline-none"
            />
          </div>

          <button
            type="submit"
            id="submit-reservation"
            className="w-full rounded-full border border-brayan-copper bg-brayan-copper px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-brayan-bg transition-colors hover:bg-transparent hover:text-brayan-copper mt-3"
          >
            Kirim via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
