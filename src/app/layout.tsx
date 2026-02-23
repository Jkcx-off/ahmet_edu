import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sopandai EduTester - Интерактивная платформа для тестирования знаний",
  description: "Sopandai EduTester — это современная образовательная платформа для тестирования по школьной программе (биология, химия, физика, английский). Проходите тесты и повышайте свой уровень знаний!",
  applicationName: "Sopandai EduTester",
  keywords: ["Sopandai", "тесты", "образование", "школьная программа", "снг", "биология", "химия", "физика", "английский", "онлайн тестирование"],
  openGraph: {
    title: "Sopandai EduTester - Интерактивная платформа для тестирования",
    description: "Проверьте свои знания по школьной программе! Тесты для 6-12 классов.",
    url: "https://ahmet-edu.vercel.app",
    siteName: "Sopandai EduTester",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
