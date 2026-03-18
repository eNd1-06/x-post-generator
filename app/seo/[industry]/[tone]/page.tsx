// pSEOページ: /seo/[industry]/[tone]
// 業種×口調の全80組み合わせを静的生成するサーバーコンポーネント

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustryBySlug } from "@/data/industries";
import { tones, getToneBySlug } from "@/data/tones";

type Props = {
  params: Promise<{
    industry: string;
    tone: string;
  }>;
};

// ビルド時に全80組み合わせの静的ページを生成する
export async function generateStaticParams() {
  const params: { industry: string; tone: string }[] = [];
  for (const industry of industries) {
    for (const tone of tones) {
      params.push({ industry: industry.slug, tone: tone.slug });
    }
  }
  return params;
}

// 動的なSEOメタデータを生成する
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: industrySlug, tone: toneSlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  const tone = getToneBySlug(toneSlug);

  if (!industry || !tone) {
    return { title: "ページが見つかりません" };
  }

  const title = `${industry.name}向け${tone.name}なX投稿文テンプレート | X投稿文ジェネレーター`;
  const description = `${industry.name}のX（Twitter）投稿文を${tone.name}な口調でAIが自動生成。${industry.keywords.join("・")}に関する投稿を無料で作成できます。`;
  const canonicalPath = `/seo/${industrySlug}/${toneSlug}`;

  return {
    title,
    description,
    keywords: [...industry.keywords, tone.name, "X投稿", "Twitter投稿", "AI生成"],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function IndustryTonePage({ params }: Props) {
  const { industry: industrySlug, tone: toneSlug } = await params;

  // 存在しないスラッグの場合は404を返す
  const industry = getIndustryBySlug(industrySlug);
  const tone = getToneBySlug(toneSlug);

  if (!industry || !tone) {
    notFound();
  }

  // 同業種の他口調ページへの関連リンクを取得（現在の口調を除く）
  const relatedTones = tones.filter((t) => t.slug !== toneSlug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* ヘッダー */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
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

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* パンくずナビ */}
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-sky-400 transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/seo" className="hover:text-sky-400 transition-colors">
            業種一覧
          </Link>
          <span>/</span>
          <Link
            href="/seo"
            className="hover:text-sky-400 transition-colors"
          >
            {industry.name}
          </Link>
          <span>/</span>
          <span className="text-slate-300">{tone.name}</span>
        </nav>

        {/* メインコンテンツ */}
        <div className="space-y-6">
          {/* H1見出し */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-sky-500/20 text-sky-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {industry.name}
              </span>
              <span className="inline-block bg-violet-500/20 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {tone.name}
              </span>
            </div>
            <h1 className="text-2xl font-bold leading-tight">
              {industry.name}向け{tone.name}なX投稿文テンプレート
            </h1>
          </div>

          {/* 業種の説明 */}
          <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 space-y-4">
            <h2 className="font-bold text-slate-200 text-lg">
              {industry.name}のX投稿について
            </h2>
            <p className="text-slate-300 leading-relaxed">{industry.description}</p>
            <div className="flex flex-wrap gap-2">
              {industry.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 口調の特徴 */}
          <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 space-y-3">
            <h2 className="font-bold text-slate-200 text-lg">
              {tone.name}な口調の特徴
            </h2>
            <p className="text-slate-300 leading-relaxed">{tone.description}</p>
          </div>

          {/* 使用例 */}
          <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 space-y-3">
            <h2 className="font-bold text-slate-200 text-lg">このツールでできること</h2>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">✓</span>
                <span>{industry.name}に特化した投稿文を{tone.name}な口調でAIが即座に生成</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">✓</span>
                <span>140文字以内に最適化された日本語のX投稿文を複数パターン提案</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">✓</span>
                <span>エンゲージメントを高めるハッシュタグを自動付与</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">✓</span>
                <span>共感型・問いかけ型など異なるアングルで複数パターンを生成</span>
              </li>
            </ul>
            <p className="text-slate-400 text-sm pt-2">
              入力例: <span className="text-slate-300 italic">「{industry.exampleTheme}」</span>
            </p>
          </div>

          {/* CTAボタン */}
          <div className="text-center py-4">
            <Link
              href="/"
              className="inline-block py-4 px-10 bg-sky-500 hover:bg-sky-400 rounded-xl font-bold text-white text-lg transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-400/30"
            >
              今すぐ投稿文を生成する
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              無料・登録不要でご利用いただけます
            </p>
          </div>
        </div>

        {/* 関連ページ: 同業種の他口調 */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-300 text-sm uppercase tracking-wider">
            {industry.name}の他の口調で生成する
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTones.map((relatedTone) => (
              <Link
                key={relatedTone.slug}
                href={`/seo/${industry.slug}/${relatedTone.slug}`}
                className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 hover:border-sky-500/50 transition-all hover:bg-slate-800 group"
              >
                <div className="font-medium text-slate-200 group-hover:text-sky-300 transition-colors text-sm">
                  {relatedTone.name}
                </div>
                <div className="text-slate-400 text-xs mt-1 line-clamp-2">
                  {relatedTone.description.substring(0, 40)}...
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* フッターリンク */}
        <div className="border-t border-slate-700 pt-6">
          <Link
            href="/seo"
            className="text-slate-400 hover:text-sky-400 text-sm transition-colors"
          >
            ← 全業種一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
