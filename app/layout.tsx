import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ),
  title: {
    default: "X 投稿文ジェネレーター | AIがX投稿を自動生成",
    template: "%s | X投稿文ジェネレーター",
  },
  description:
    "AIがX（Twitter）の投稿文を自動生成。業種・テーマ・口調を選ぶだけで140文字以内の投稿文をすぐに作成できます。無料・登録不要。",
  keywords: ["X投稿文", "Twitter投稿", "AI生成", "投稿文ジェネレーター", "SNS"],
  verification: {
    google: "X6orpG-UcJpIZWQ8kOvac6XrXv7_GocQWCtvzKjtPw0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3529976649815717"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
