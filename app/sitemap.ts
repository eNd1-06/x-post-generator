// サイトマップ生成
// 全ページ（メイン1 + SEOトップ1 + 業種×口調80 = 合計82ページ）のURLを生成する

import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { tones } from "@/data/tones";

export default function sitemap(): MetadataRoute.Sitemap {
  // NEXT_PUBLIC_SITE_URLが設定されていない場合はデフォルトURLを使用
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const now = new Date();

  // メインページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/seo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 業種×口調の全80組み合わせページ（均一priority）
  const industryTonePages: MetadataRoute.Sitemap = industries.flatMap((industry) =>
    tones.map((tone) => ({
      url: `${baseUrl}/seo/${industry.slug}/${tone.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...industryTonePages];
}
