// pSEOトップページ: /seo
// 全業種の一覧をグリッド表示するサーバーコンポーネント

import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/data/industries";
import { tones } from "@/data/tones";

export const metadata: Metadata = {
  title: "業種別X投稿文テンプレート一覧 | X投稿文ジェネレーター",
  description:
    "フリーランスデザイナー・カフェ・ITエンジニアなど20業種のX（Twitter）投稿文テンプレートを掲載。AIが業種に合わせた投稿文を自動生成します。",
  keywords: [
    "X投稿文",
    "Twitter投稿",
    "テンプレート",
    "業種別",
    "AI生成",
    "フリーランス",
    "ビジネス",
  ],
  openGraph: {
    title: "業種別X投稿文テンプレート一覧 | X投稿文ジェネレーター",
    description:
      "20業種・4口調の組み合わせでX投稿文を自動生成。無料・登録不要でご利用いただけます。",
    type: "website",
  },
};

export default function SeoIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* ヘッダー */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-sm font-bold">
              X
            </div>
            <div>
              <span className="font-bold text-lg leading-tight">X 投稿文ジェネレーター</span>
              <p className="text-slate-400 text-xs">AIがあなたの投稿を自動生成</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* ページタイトル */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold">業種別X投稿文テンプレート</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            あなたの業種を選択してください。AIが業種に最適化されたX投稿文を自動生成します。
          </p>
        </div>

        {/* 口調バッジ説明 */}
        <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700">
          <p className="text-slate-300 text-sm mb-3 font-medium">対応している口調:</p>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <span
                key={tone.slug}
                className="inline-block bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded-full"
              >
                {tone.name}
              </span>
            ))}
          </div>
        </div>

        {/* 業種グリッド */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-300 text-sm uppercase tracking-wider">
            業種を選ぶ ({industries.length}業種)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700 hover:border-sky-500/50 transition-all hover:bg-slate-800 group space-y-3"
              >
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {industry.description.substring(0, 60)}...
                  </p>
                </div>

                {/* キーワードタグ（最初の3つ） */}
                <div className="flex flex-wrap gap-1.5">
                  {industry.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs bg-slate-700/80 text-slate-400 px-2 py-0.5 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* 口調リンク */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-700">
                  {tones.map((tone) => (
                    <Link
                      key={tone.slug}
                      href={`/seo/${industry.slug}/${tone.slug}`}
                      className="text-xs text-sky-400/70 hover:text-sky-300 transition-colors"
                    >
                      {tone.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAセクション */}
        <div className="text-center py-6 space-y-4">
          <p className="text-slate-300">業種が見つからない場合も直接テーマを入力できます</p>
          <Link
            href="/"
            className="inline-block py-3.5 px-8 bg-sky-500 hover:bg-sky-400 rounded-xl font-bold text-white transition-all shadow-lg shadow-sky-500/25"
          >
            テーマを自由入力して生成する
          </Link>
        </div>
      </div>
    </main>
  );
}
