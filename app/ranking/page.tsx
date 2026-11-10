import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function RankingPage() {
  let configured = true;
  let players: { username: string; rating: number; wins: number; losses: number; draws: number }[] = [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profiles").select("username,rating,wins,losses,draws").order("rating", { ascending: false }).limit(100);
    if (error) throw error;
    players = data ?? [];
  } catch {
    configured = false;
  }
  return <main className="shell">
    <header className="topbar"><Link className="brand" href="/"><span className="brandmark">♞</span><span>SECRET CHESS</span></Link><Link className="button" href="/">กลับหน้าหลัก</Link></header>
    <section style={{maxWidth:850,margin:"0 auto"}}>
      <div className="eyebrow">PLAYER LEADERBOARD</div><h1 style={{fontSize:42,margin:"12px 0"}}>ตารางอันดับผู้เล่น</h1>
      <p className="subtle">จัดอันดับด้วยคะแนน ELO จากผลการแข่งขันจริง</p>
      {!configured ? <div className="notice">ตารางอันดับจะแสดงเมื่อเชื่อมต่อ Supabase และสร้างฐานข้อมูลเรียบร้อยแล้ว</div> : players.length === 0 ? <div className="feature" style={{marginTop:24}}>ยังไม่มีข้อมูลผู้เล่น เริ่มสมัครสมาชิกและแข่งขันเพื่อเป็นคนแรกบนตารางอันดับ</div> : <div className="feature" style={{marginTop:24,padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"60px 1fr 90px 100px",gap:10,padding:16,color:"var(--muted)",fontSize:12}}><span>อันดับ</span><span>ผู้เล่น</span><span>คะแนน</span><span>ชนะ/แพ้</span></div>
        {players.map((p,i)=><div key={p.username} style={{display:"grid",gridTemplateColumns:"60px 1fr 90px 100px",gap:10,padding:16,borderTop:"1px solid var(--line)",alignItems:"center"}}><strong>{i+1}</strong><strong>{p.username}</strong><span style={{color:"var(--accent)"}}>{p.rating}</span><span>{p.wins}/{p.losses}</span></div>)}
      </div>}
    </section>
  </main>;
}
