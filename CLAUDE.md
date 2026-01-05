# Ayumu Kukutsu Portfolio

## 概要

React + Cloudflare Pages で構築する個人ポートフォリオサイト。

## 技術スタック

- React (Vite)
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## 構成

- `/` - トップページ（自己紹介、Career、Projects、Articles）
- `/contact` - お問い合わせ

## デザイン方針

- シンプルでミニマル
- モバイルファースト
- ダークモード対応（任意）

## 参考

- https://www.hand-dot.com/

## コマンド

```bash
npm run dev       # Start development server with HMR
npm run build     # TypeScript check + Vite production build
npm run lint      # Run ESLint
npm run preview   # Build and preview with Wrangler Pages
npm run deploy    # Build and deploy to Cloudflare Pages
```

## アーキテクチャ

This is a React 19 + TypeScript portfolio site using Vite 7 with SWC for fast refresh, deployed to Cloudflare Pages.

- **Entry point**: `src/main.tsx` renders `<App />` into `#root`
- **Build output**: `dist/` (served by Cloudflare Pages)
- **TypeScript config**: Uses project references with `tsconfig.app.json` (app code) and `tsconfig.node.json` (tooling)
- **Wrangler config**: `wrangler.jsonc` defines Cloudflare Pages deployment settings

## 開発ログ

- [2026-01-05](docs/dev-log-2026-01-05.md) - 初期構築（Tailwind導入、トップページ作成）
