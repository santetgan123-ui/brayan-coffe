import type { Metadata } from "next";
import { loginAdmin } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Halaman login admin Brayan Coffee.",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="px-6 py-24 sm:px-12 lg:px-24">
      <section className="mx-auto max-w-md rounded-[10px] border border-brayan-cream/15 bg-brayan-edge p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brayan-copper">Brayan Coffee</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight">Admin Login</h1>
        <p className="mt-3 text-sm text-brayan-mist">
          Gunakan akun admin untuk mengelola informasi menu, promo, dan jadwal event.
        </p>

        {hasError ? (
          <p className="mt-5 rounded-md border border-red-300/40 bg-red-200/10 p-3 text-sm text-red-200">
            Username atau password salah.
          </p>
        ) : null}

        <form action={loginAdmin} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-brayan-mist">
            Username
            <input
              type="text"
              name="username"
              required
              className="rounded-md border border-brayan-cream/20 bg-brayan-bg px-4 py-3 text-brayan-cream outline-none ring-brayan-copper/60 focus:ring-2"
            />
          </label>
          <label className="grid gap-2 text-sm text-brayan-mist">
            Password
            <input
              type="password"
              name="password"
              required
              className="rounded-md border border-brayan-cream/20 bg-brayan-bg px-4 py-3 text-brayan-cream outline-none ring-brayan-copper/60 focus:ring-2"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-full border border-brayan-copper bg-brayan-copper px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brayan-bg transition-colors hover:bg-transparent hover:text-brayan-copper"
          >
            Masuk Admin
          </button>
        </form>
      </section>
    </main>
  );
}
