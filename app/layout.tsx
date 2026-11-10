import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secret Chess — หมากรวย",
  description: "หมากรุกออนไลน์ 2 คน พร้อมระบบจัดทัพลับและจัดอันดับผู้เล่น",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
