"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  getAdminCredentials,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const credentials = getAdminCredentials();

  if (username === credentials.username && password === credentials.password) {
    await createAdminSession();
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
