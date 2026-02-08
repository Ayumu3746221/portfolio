# Astro ブログ SEO 最適化タスク

作成日: 2026-02-08

## 現状分析

### 良い点
- SSG（Static Site Generation）で基礎は堅実
- Semantic HTML（`<article>`, `<time>` タグ）の使用
- アクセシビリティ対応（aria-label）
- モバイルファースト設計
- React との適切な使い分け

### 不足している点
- OGP / Twitter Card がない
- Structured Data（JSON-LD）がない
- sitemap.xml / robots.txt がない
- RSS Feed がない
- 画像最適化がされていない
- Canonical URL がない

---

## 作業タスク一覧

### 1. sitemap.xml と robots.txt の追加（高優先度）

**目的**: 検索エンジンのクローラーにサイト構造を伝える

**作業内容**:
1. `@astrojs/sitemap` パッケージをインストール
   ```bash
   npm install @astrojs/sitemap
   ```

2. `astro.config.mjs` に設定を追加
   ```javascript
   import sitemap from '@astrojs/sitemap';

   export default defineConfig({
     site: 'https://your-domain.com', // 本番URLを設定
     integrations: [react(), sitemap()],
   });
   ```

3. `public/robots.txt` を作成
   ```
   User-agent: *
   Allow: /

   Sitemap: https://your-domain.com/sitemap-index.xml
   ```

---

### 2. OGP / Twitter Card の実装（高優先度）

**目的**: SNSでシェアされた際の見栄えを改善

**作業内容**:
1. `BaseLayout.astro` の `<head>` に OGP タグを追加

```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const {
  title = 'Ayumu Kukutsu | Junior Engineer',
  description = 'ジュニアエンジニアのポートフォリオサイト',
  image = '/og-image.png',
  url = Astro.url.href,
  type = 'website'
} = Astro.props;

const siteUrl = 'https://your-domain.com';
const ogImageUrl = new URL(image, siteUrl).href;
---

<!-- OGP -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:url" content={url} />
<meta property="og:type" content={type} />
<meta property="og:site_name" content="Ayumu Kukutsu" />
<meta property="og:locale" content="ja_JP" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
```

2. OGP用の画像（1200x630px推奨）を `public/og-image.png` として作成

3. ブログ記事ページでは動的に OGP を設定
   - `[id].astro` で記事の title, description, image を渡す

---

### 3. 画像最適化（高優先度）

**目的**: ページ読み込み速度の改善、Core Web Vitals の向上

**作業内容**:
1. Astro の `Image` コンポーネントを使用
   ```astro
   ---
   import { Image } from 'astro:assets';
   import profileImage from '../assets/profile.png';
   ---

   <Image src={profileImage} alt="プロフィール画像" width={144} height={144} />
   ```

2. 画像コンポーネントの利点
   - 自動的に WebP/AVIF に変換
   - srcset によるレスポンシブ対応
   - width/height 指定で CLS 防止
   - lazy loading がデフォルト

3. React コンポーネント内の `<img>` を置き換え
   - `ProfileSection.tsx` などで Astro から props として画像を渡す
   - または React 内で loading="lazy" と width/height を明示

---

### 4. Structured Data（JSON-LD）の追加（中優先度）

**目的**: 検索結果でリッチスニペットを表示

**作業内容**:
1. ブログ記事用の Article スキーマを追加

```astro
<!-- src/pages/blog/[id].astro の <head> 内 -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": entry.data.title,
  "description": entry.data.description,
  "datePublished": entry.data.pubDate.toISOString(),
  "dateModified": entry.data.updatedDate?.toISOString() || entry.data.pubDate.toISOString(),
  "author": {
    "@type": "Person",
    "name": "Ayumu Kukutsu"
  },
  "publisher": {
    "@type": "Person",
    "name": "Ayumu Kukutsu"
  }
})} />
```

2. トップページ用の Person スキーマを追加

```astro
<!-- src/pages/index.astro の <head> 内 -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ayumu Kukutsu",
  "jobTitle": "Junior Engineer",
  "url": "https://your-domain.com"
})} />
```

---

### 5. RSS Feed の追加（中優先度）

**目的**: RSSリーダーでの購読対応、コンテンツ配信

**作業内容**:
1. `@astrojs/rss` パッケージをインストール
   ```bash
   npm install @astrojs/rss
   ```

2. `src/pages/rss.xml.ts` を作成
   ```typescript
   import rss from '@astrojs/rss';
   import { getCollection } from 'astro:content';

   export async function GET(context) {
     const blog = await getCollection('blog', ({ data }) => !data.draft);

     return rss({
       title: 'Ayumu Kukutsu Blog',
       description: 'ジュニアエンジニアの技術ブログ',
       site: context.site,
       items: blog.map((post) => ({
         title: post.data.title,
         pubDate: post.data.pubDate,
         description: post.data.description,
         link: `/blog/${post.id}/`,
       })),
     });
   }
   ```

3. `BaseLayout.astro` に RSS リンクを追加
   ```astro
   <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
   ```

---

### 6. Canonical URL の設定（低優先度）

**目的**: 重複コンテンツの防止

**作業内容**:
1. `BaseLayout.astro` に canonical タグを追加
   ```astro
   <link rel="canonical" href={Astro.url.href} />
   ```

2. 必要に応じて明示的な canonical URL を props で受け取れるようにする

---

### 7. その他の改善（低優先度）

**meta タグの追加**:
```astro
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#ffffff" />
```

**Content Collections スキーマの拡張**:
```typescript
// src/content.config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 追加
    image: z.string().optional(),        // OGP用画像
    author: z.string().default('Ayumu Kukutsu'),
    canonicalUrl: z.string().optional(), // 外部転載時のcanonical
  }),
});
```

---

## 確認方法

### SEO チェックツール
- [Google Search Console](https://search.google.com/search-console) - インデックス状況確認
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - パフォーマンス・SEO スコア
- [PageSpeed Insights](https://pagespeed.web.dev/) - Core Web Vitals
- [OGP 確認ツール](https://developers.facebook.com/tools/debug/) - OGP デバッグ
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) - Twitter Card 確認

### テスト手順
1. `npm run build` でビルド
2. `npm run preview` でローカルプレビュー
3. Lighthouse でスコア確認
4. 本番デプロイ後、Google Search Console でサイトマップ送信

---

## 参考リンク

- [Astro SEO ガイド](https://docs.astro.build/en/guides/seo/)
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/)
- [Astro Image コンポーネント](https://docs.astro.build/en/guides/images/)
- [Schema.org](https://schema.org/) - 構造化データ
