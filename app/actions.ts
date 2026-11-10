"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "กรุณากรอกอีเมลและรหัสผ่าน" };
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการเชื่อมต่อ" };
  }
  redirect("/");
}

export async function signUp(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const username = String(formData.get("username") ?? "").trim();
  if (!email || !password || !username) return { error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" };
  if (username.length < 3 || username.length > 20) return { error: "ชื่อผู้เล่นต้องมี 3–20 ตัวอักษร" };
  if (password.length < 8) return { error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { username } },
    });
    if (error) return { error: error.message };
    if (!data.session) return { message: "สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสมัครสมาชิก" };
  }
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
