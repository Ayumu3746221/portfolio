# Ayumu Kukutsu Portfolio

## 概要

Astro + React + Cloudflare Pages で構築する個人ポートフォリオサイト。

## 技術スタック

- Astro 5
- React 19（UIコンポーネント）
- TypeScript
- Tailwind CSS 4
- Cloudflare Pages

## ページ構成

- `/` - トップページ（自己紹介、Career、Articles）
- `/blog` - ブログ記事一覧
- `/blog/[id]` - ブログ記事詳細

## ディレクトリ構成

```
src/
├── components/        # Reactコンポーネント（.tsx）
├── content/
│   └── blog/          # ブログ記事（Markdown）
├── layouts/           # Astroレイアウト
├── pages/             # ページルーティング（.astro）
├── assets/            # 静的アセット
├── content.config.ts  # Content Collections設定
└── index.css          # グローバルスタイル
```

## デザイン方針

- シンプルでミニマル
- モバイルファースト

## 参考

- https://www.hand-dot.com/

## コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # Astroビルド（出力: dist/）
npm run lint      # ESLint実行
npm run preview   # ビルド後のプレビュー
npm run deploy    # ビルド & Cloudflare Pagesへデプロイ
```

## アーキテクチャ

Astro 5 + React 19 のハイブリッド構成。静的サイト生成（SSG）でCloudflare Pagesにデプロイ。

- **ビルド出力**: `dist/`（Cloudflare Pagesで配信）
- **ページ**: `src/pages/*.astro` でルーティング
- **レイアウト**: `src/layouts/BaseLayout.astro` が共通レイアウト
- **コンポーネント**: ReactコンポーネントをAstroページ内で使用
- **ブログ記事**: Content Collectionsで管理（`src/content/blog/`）
- **TypeScript設定**: `tsconfig.app.json`（アプリ）と`tsconfig.node.json`（ツール）
- **Wrangler設定**: `wrangler.jsonc` でCloudflare Pagesのデプロイ設定

## 開発ログ

- [2026-01-05](docs/dev-log-2026-01-05.md) - 初期構築（Tailwind導入、トップページ作成）
- [2026-01-06](docs/dev-log-2026-01-06.md) - モバイル対応（ハンバーガーメニュー実装）
