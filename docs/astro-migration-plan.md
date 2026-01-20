# Astro移行計画

## 目的

- ブログ機能を追加するためにAstroへ移行
- 静的サイトジェネレーション（SSG）でパフォーマンス向上
- Content Collectionsによるコンテンツ管理

## 現在の構成

- **フレームワーク**: React 19 + Vite 7
- **スタイリング**: Tailwind CSS 4
- **デプロイ先**: Cloudflare Pages
- **コンポーネント**: Header, Footer, ProfileSection, AboutSection, CareerSection, ArticlesSection

## 移行方針

### アプローチ: Reactコンポーネント流用

- 既存のReactコンポーネント（.tsx）をそのまま流用
- Astroページから`client:load`ディレクティブで呼び出し
- 移行コストを最小化し、ブログ機能追加を優先

## 移行ステップ

### Phase 1: Astroプロジェクト初期化

1. [ ] 新しいAstroプロジェクトを現在のディレクトリに構築
2. [ ] Tailwind CSS統合を設定
3. [ ] React統合を追加（インタラクティブコンポーネント用）
4. [ ] Cloudflare Pagesアダプターを設定

### Phase 2: 既存コンポーネントの移行

1. [ ] レイアウトファイル作成（`src/layouts/BaseLayout.astro`）
2. [ ] 静的コンポーネントをAstroに変換:
   - `Footer.tsx` → `Footer.astro`
   - `ProfileSection.tsx` → `ProfileSection.astro`
   - `AboutSection.tsx` → `AboutSection.astro`
   - `CareerSection.tsx` → `CareerSection.astro`
   - `ArticlesSection.tsx` → `ArticlesSection.astro`
3. [ ] Headerはハンバーガーメニューがあるため、Reactコンポーネントとして維持
4. [ ] トップページ（`src/pages/index.astro`）を作成

### Phase 3: ブログ機能の追加

1. [ ] Content Collectionsの設定（`src/content/config.ts`）
2. [ ] ブログ記事用のスキーマ定義（title, date, description, tags等）
3. [ ] ブログ一覧ページ（`src/pages/blog/index.astro`）
4. [ ] ブログ記事ページ（`src/pages/blog/[slug].astro`）
5. [ ] サンプル記事の作成（`src/content/blog/`）

### Phase 4: 仕上げ

1. [ ] package.json のスクリプト更新
2. [ ] Wrangler設定の更新
3. [ ] 不要なファイルの削除（Vite設定等）
4. [ ] ビルド・デプロイテスト

## ディレクトリ構造（移行後）

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Reactコンポーネント（インタラクティブ）
│   │   ├── Footer.astro
│   │   ├── ProfileSection.astro
│   │   ├── AboutSection.astro
│   │   ├── CareerSection.astro
│   │   └── ArticlesSection.astro
│   ├── content/
│   │   ├── config.ts           # Content Collections設定
│   │   └── blog/
│   │       └── *.md            # ブログ記事
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro         # トップページ
│       └── blog/
│           ├── index.astro     # ブログ一覧
│           └── [slug].astro    # ブログ記事
├── astro.config.mjs
├── tailwind.config.mjs
└── wrangler.jsonc
```

## 技術選定

| 項目 | 選定 |
|------|------|
| Astroバージョン | 最新安定版 |
| 出力モード | `static`（SSG） |
| スタイリング | Tailwind CSS 4 |
| コンテンツ | Content Collections (Markdown) |
| デプロイ | Cloudflare Pages |

## 注意点

- HeaderコンポーネントのuseStateはReactで維持する必要がある
- 画像（`github-icon.png`）は`public/`または`src/assets/`に移動
- 既存のアクセシビリティ対応を維持

## 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build/)
- [Astro + Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
