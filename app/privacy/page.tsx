import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "X投稿文ジェネレーターのプライバシーポリシーページです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-sm font-bold">X</div>
            <span className="font-bold text-lg">X 投稿文ジェネレーター</span>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
        <p className="text-slate-400 text-sm">最終更新日：2026年3月19日</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">1. はじめに</h2>
          <p className="text-slate-300 leading-relaxed">
            X投稿文ジェネレーター（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーは、本サービスにおける情報の取り扱いについて説明します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">2. 収集する情報</h2>
          <p className="text-slate-300 leading-relaxed">
            本サービスでは、以下の情報を収集する場合があります。
          </p>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            <li>入力されたテーマ・業種のテキスト情報（AI生成のためにのみ使用）</li>
            <li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時）</li>
            <li>Cookieおよび類似の技術による情報</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">3. 情報の利用目的</h2>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            <li>X投稿文の生成サービスの提供</li>
            <li>サービスの改善・品質向上</li>
            <li>不正利用の検知・防止</li>
            <li>利用状況の分析</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">4. 第三者サービスの利用</h2>
          <p className="text-slate-300 leading-relaxed">
            本サービスは以下の第三者サービスを利用しています。
          </p>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <span className="font-medium text-white">Google Gemini API</span>
              ：投稿文の生成に使用。入力されたテーマ情報が送信されます。
            </li>
            <li>
              <span className="font-medium text-white">Google AdSense</span>
              ：広告配信のために利用。Cookieを通じた行動ターゲティング広告が表示される場合があります。
            </li>
            <li>
              <span className="font-medium text-white">Vercel</span>
              ：ホスティングサービス。アクセスログが収集されます。
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">5. Cookieについて</h2>
          <p className="text-slate-300 leading-relaxed">
            本サービスでは、サービスの改善および広告配信のためにCookieを使用しています。ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">6. 個人情報の第三者提供</h2>
          <p className="text-slate-300 leading-relaxed">
            法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">7. お問い合わせ</h2>
          <p className="text-slate-300 leading-relaxed">
            本プライバシーポリシーに関するご質問は、本サービスのお問い合わせページよりご連絡ください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-sky-400">8. ポリシーの変更</h2>
          <p className="text-slate-300 leading-relaxed">
            本ポリシーは必要に応じて更新されることがあります。重要な変更がある場合はサイト上でお知らせします。
          </p>
        </section>

        <div className="pt-4 border-t border-slate-700">
          <Link href="/" className="text-sky-400 hover:text-sky-300 text-sm transition-colors">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
