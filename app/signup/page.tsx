"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/actions";

const initialState: AuthState = {};

export default function SignupPage() {
  const [state, action, pending] = useActionState(signUp, initialState);
  return <main className="authwrap"><section className="authcard">
    <Link className="brand" href="/"><span className="brandmark">♞</span><span>SECRET CHESS</span></Link>
    <h1>สร้างบัญชีผู้เล่น</h1><p className="subtle">สมัครเพื่อบันทึกผลงาน สะสมคะแนน และแข่งขันบนตารางอันดับ</p>
    {state.error && <div className="notice error" role="alert">{state.error}</div>}
    {state.message && <div className="notice" role="status">{state.message}</div>}
    <form action={action}>
      <div className="field"><label htmlFor="username">ชื่อผู้เล่น (3–20 ตัวอักษร)</label><input id="username" name="username" minLength={3} maxLength={20} autoComplete="nickname" required /></div>
      <div className="field"><label htmlFor="email">อีเมล</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="password">รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)</label><input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required /></div>
      <button className="button primary formbutton" disabled={pending}>{pending ? "กำลังสร้างบัญชี..." : "สมัครสมาชิก"}</button>
    </form>
    <Link className="backlink" href="/login">มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</Link>
    <Link className="backlink" href="/">← กลับหน้าหลัก</Link>
  </section></main>;
}
