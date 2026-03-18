// pSEO用の口調データ定義
// 各口調のスラッグ・表示名・説明・AIプロンプト用ラベルを管理する

export type Tone = {
  slug: string;
  name: string;
  description: string;
  promptLabel: string;
};

export const tones: Tone[] = [
  {
    slug: "professional",
    name: "プロフェッショナル",
    description:
      "信頼感と専門性を前面に出した口調です。ビジネスシーンや専門知識の発信に最適で、フォロワーからの信頼獲得・ブランド価値の向上に効果的な投稿を生成します。",
    promptLabel: "プロフェッショナルで信頼感のある",
  },
  {
    slug: "casual",
    name: "カジュアル",
    description:
      "親しみやすく気軽に読めるフレンドリーな口調です。日常の出来事や裏側の共有・コミュニティとの距離を縮めるコンテンツに最適な投稿を生成します。",
    promptLabel: "親しみやすくカジュアルな",
  },
  {
    slug: "inspiring",
    name: "インスパイア",
    description:
      "読み手のモチベーションを高め行動を促す力強い口調です。挑戦・成功体験・気づきを伝えるコンテンツに最適で、シェアされやすく拡散力の高い投稿を生成します。",
    promptLabel: "モチベーションを高める力強い",
  },
  {
    slug: "educational",
    name: "教育・情報系",
    description:
      "わかりやすく丁寧に情報を届ける解説型の口調です。専門知識・ハウツー・Tips情報を伝えるコンテンツに最適で、保存・引用リポストされやすい投稿を生成します。",
    promptLabel: "わかりやすく教育的な",
  },
];

// スラッグから口調データを取得するユーティリティ関数
export function getToneBySlug(slug: string): Tone | undefined {
  return tones.find((tone) => tone.slug === slug);
}
