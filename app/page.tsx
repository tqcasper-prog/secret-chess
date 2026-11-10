import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function HomePage() {
  let user: { email?: string } | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // The landing page remains available until Supabase is configured.
  }
  return <main className="shell">
    <header className="topbar">
      <Link className="brand" href="/"><span className="brandmark">♞</span><span>SECRET CHESS</span></Link>
      <nav className="nav">
        <Link className="button" href="/ranking">ตารางอันดับ</Link>
        {user ? <form action={signOut}><button className="button" type="submit">ออกจากระบบ</button></form> : <><Link className="button" href="/login">เข้าสู่ระบบ</Link><Link className="button primary" href="/signup">สมัครสมาชิก</Link></>}
      </nav>
    </header>
    <section className="hero">
      <div className="eyebrow">A NEW WAY TO PLAY CHESS</div>
      <h1>วางแผนให้เหนือกว่า<br/><span>ก่อนเกมจะเริ่ม</span></h1>
      <p>หมากรุกออนไลน์ที่ให้คุณจัดทัพอย่างลับ ๆ ก่อนเปิดกระดานพร้อมคู่แข่ง วางกลยุทธ์ในแบบของคุณ แล้วพิสูจน์ฝีมือบนสนามจริง</p>
      <div className="actions">
        <Link className="button primary" href={user ? "/play" : "/signup"}>เริ่มเล่นเกม <span>→</span></Link>
        <Link className="button" href="/ranking">ดูอันดับผู้เล่น</Link>
      </div>
      {user && <p style={{marginTop:18,fontSize:13}}>เข้าสู่ระบบเป็น {user.email}</p>}
    </section>
    <section className="featuregrid">
      <article className="feature"><div className="symbol">♟</div><h3>จัดทัพลับ</h3><p>วางหมาก 16 ตัวในสองแถวหลังของฝั่งคุณ โดยคู่แข่งจะไม่เห็นตำแหน่งจนกว่าจะพร้อมทั้งคู่</p></article>
      <article className="feature"><div className="symbol">⚔</div><h3>ดวลออนไลน์ 1 ต่อ 1</h3><p>เปิดเผยกระดานพร้อมกัน แล้วแข่งขันด้วยกติกาหมากรุกมาตรฐาน</p></article>
      <article className="feature"><div className="symbol">♛</div><h3>ไต่อันดับ ELO</h3><p>สะสมผลงานจากเกมจริง ชนะเพื่อเพิ่มคะแนน และขึ้นสู่หัวตารางผู้เล่น</p></article>
    </section>
    <footer className="footer">SECRET CHESS · หมากรวย · Play smart. Deploy secretly.</footer>
  </main>;
}
