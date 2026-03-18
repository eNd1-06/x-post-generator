"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  content: string;
  hashtags: string[];
  angle: string;
};

const TONE_OPTIONS = [
  { value: "professional", label: "プロフェッショナル", emoji: "💼" },
  { value: "casual", label: "カジュアル", emoji: "😊" },
  { value: "inspiring", label: "インスパイア", emoji: "🔥" },
  { value: "educational", label: "教育・情報系", emoji: "📚" },
];

export default function Home() {
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState("professional");
  const [count, setCount] = useState(3);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const generate = async () => {
    if (!theme.trim()) {
      setError("テーマを入力してください");
      return;
    }
    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, tone, count }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data.posts || []);
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const charCount = (text: string) => [...text].length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-sm font-bold">X</div>
            <div>
              <h1 className="font-bold text-lg leading-tight">X 投稿文ジェネレーター</h1>
              <p className="text-slate-400 text-xs">AIがあなたの投稿を自動生成</p>
            </div>
          </div>
          <Link href="/seo" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">
            業種別テンプレート →
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Input Section */}
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 space-y-5">
          {/* Theme Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              業種・テーマ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="例: フリーランスデザイナー、カフェ、副業プログラマー..."
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Tone Select */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">口調</label>
            <div className="grid grid-cols-2 gap-2">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border ${
                    tone === t.value
                      ? "bg-sky-500 border-sky-400 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Count Select */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              生成パターン数: <span className="text-sky-400 font-bold">{count}</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-xl font-bold text-white transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                生成中...
              </span>
            ) : (
              "✨ 投稿文を生成する"
            )}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </div>

        {/* Results */}
        {posts.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-300 text-sm uppercase tracking-wider">
              生成結果 ({posts.length}パターン)
            </h2>
            {posts.map((post, i) => (
              <div key={i} className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700 hover:border-slate-600 transition-colors">
                {/* Angle Badge */}
                <span className="inline-block bg-sky-500/20 text-sky-300 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {post.angle}
                </span>

                {/* Post Content */}
                <p className="text-white leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono ${charCount(post.content) > 140 ? "text-red-400" : "text-slate-500"}`}>
                    {charCount(post.content)}/140文字
                  </span>
                  <button
                    onClick={() => copyToClipboard(post.content, i)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                      copied === i
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {copied === i ? "✓ コピーしました" : "コピー"}
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={generate}
              className="w-full py-2.5 border border-slate-600 hover:border-slate-500 rounded-xl text-sm text-slate-400 hover:text-slate-300 transition-all"
            >
              🔄 もう一度生成する
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-8">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center gap-6 text-xs text-slate-500">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
          <Link href="/seo" className="hover:text-slate-300 transition-colors">業種別テンプレート</Link>
        </div>
      </div>
    </main>
  );
}
