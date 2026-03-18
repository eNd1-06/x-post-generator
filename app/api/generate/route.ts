import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { theme, tone, count } = await req.json();

    if (!theme) {
      return NextResponse.json({ error: "テーマを入力してください" }, { status: 400 });
    }

    const toneMap: Record<string, string> = {
      professional: "プロフェッショナルで信頼感のある",
      casual: "親しみやすくカジュアルな",
      inspiring: "モチベーションを高める力強い",
      educational: "わかりやすく教育的な",
    };

    const toneLabel = toneMap[tone] || "自然な";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`X（Twitter）の投稿文を${count || 3}パターン作成してください。

テーマ・業種: ${theme}
口調: ${toneLabel}口調

条件:
- 各投稿は140文字以内（日本語）
- ハッシュタグを2〜3個含める
- エンゲージメントを高める内容にする
- 各パターンは異なるアプローチで

以下のJSON形式のみで返答してください（説明文・コードブロック不要）:
{
  "posts": [
    {
      "content": "投稿文（ハッシュタグ含む）",
      "hashtags": ["#タグ1", "#タグ2"],
      "angle": "このパターンの特徴（例: 共感型、問いかけ型など）"
    }
  ]
}`);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSONが見つかりません");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);

  } catch (e) {
    console.error("generate error:", e);
    return NextResponse.json({ error: "生成に失敗しました。もう一度お試しください。" }, { status: 500 });
  }
}
