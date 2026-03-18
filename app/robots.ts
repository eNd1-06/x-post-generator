// robots.txt生成
// 全クローラーにクロールを許可し、サイトマップURLを指定する

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // NEXT_PUBLIC_SITE_URLが設定されていない場合はデフォルトURLを使用
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
