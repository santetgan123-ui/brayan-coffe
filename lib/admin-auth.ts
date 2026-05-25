import { cookies } from "next/headers";

const ADMIN_SESSION_KEY = "brayan_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_KEY)?.value === "active";
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_KEY, "active", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_KEY);
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "brayan123",
  };
}
