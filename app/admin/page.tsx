import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdmin } from "@/app/admin/actions";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Brayan Ngopi",
  description: "Dashboard admin dinamis Brayan Ngopi Bekasi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <main className="px-6 py-16 sm:px-12 lg:px-24">
      <section className="mx-auto max-w-6xl rounded-[10px] border border-brayan-cream/15 bg-brayan-edge p-8 sm:p-10">
        <div className="flex flex-col gap-6 border-b border-brayan-cream/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Admin Area</p>
            <h1 className="mt-3 text-4xl font-semibold">Dashboard Brayan Ngopi</h1>
            <p className="mt-3 text-sm text-brayan-mist">
              Selamat datang di panel kontrol operasional Brayan Ngopi Bekasi (PHB & Tarumajaya).
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-brayan-cream/25 px-5 py-2 text-xs uppercase tracking-[0.16em] text-brayan-mist transition-colors hover:border-brayan-copper hover:text-brayan-copper"
            >
              Logout
            </button>
          </form>
        </div>

        <AdminDashboardClient />
      </section>
    </main>
  );
}
