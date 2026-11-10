"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "@/app/actions";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, initialState);
  return <main className="authwrap"><section className="authcard">
    <Link className="brand" href="/"><span className="brandmark">♞</span><span>SECRET CHESS</span></Link>
    <h1>ยินดีต้อนรับกลับ</h1><p className="subtle">เข้าสู่ระบบเพื่อเล่นกับเพื่อน เก็บสถิติ และไต่อันดับ</p>
    {state.error && <div className="notice error" role="alert">{state.error}</div>}
    <form action={action}>
      <div className="field"><label htmlFor="email">อีเมล</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="password">รหัสผ่าน</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
      <button className="button primary formbutton" disabled={pending}>{pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</button>
    </form>
    <Link className="backlink" href="/signup">ยังไม่มีบัญชี? สมัครสมาชิก</Link>
    <Link className="backlink" href="/">← กลับหน้าหลัก</Link>
  </section></main>;
}
