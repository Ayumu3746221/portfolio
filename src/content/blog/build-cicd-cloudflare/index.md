---
title: Cloudflare PagesにCI/CDをGithub Actionで作成
description: Cloudflare PagesにGithub Actionを用いてCI/CDを構築しました。pnpmを使い方は参考になる箇所があると思います。
pubDate: 2026-02-18
tags: [ci/cd, GithubAction, Cloudflare]
draft: false
---

## Motivation

このブログは`Astro`で作成しているのですが、Cloudflareとgithubでネイティブ連携せずに、`wrangler cli`を使って手動デプロイしていました。

この記事は4記事目なのですが、記事を書くごとに手動でデプロイするのがめんどくさいので、今回は`github action`を利用して`CI/CD`を作成し、メインブランチが更新されたら、自動的にデプロイされるようにしました。

元来であればネイティブ連携をするのが良いと思います。今回は私が`CI/CD`を作成する経験が欲しかったからです。

あと別件ですが、ネイティブ連携ではなく、独自実装するメリットは以下になると思います。

- `CodeQL`や`OSV-Scanner`などの解析が終わる前にデプロイが完了せずに済む。
- Cloudflare側でビルドプロセスを待たずに済む。
- 増分アップロードになるため、差分が少ない場合はデプロイが早い。

CI/CDのセキュア対策を実行してから、デプロイができるのが一番の強みかなと思います。

## Practice

このブログのCI/CDはビルドプロセスとデプロイプロセスで分けて`gitworkflow`を作成しています。

### Build Process

```yaml
name: Node.js CI

on:
  pull_request:
  workflow_call:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "23.5.0"
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 1
```

プルリクエストを投げられた時にBuildできるかどうか確認してくれます、あとは後述のデプロイ時に呼び出せるように`workflow_call`を指定しています。

`pnpm install --frozen-lockfile`で`lockfile`のバージョン通りにインストールするようにしています。

あとはアーティファクトにアップロードしておくって感じですね。

## Deploy Process

```yaml
name: Deploy Pages
on:
  push:
    branches:
      - main

jobs:
  build:
    uses: ./.github/workflows/build.yaml

  deploy:
    needs: build
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist/ --project-name=portfolio
```

ここで躓いたのですが、`wrangler`の公式アクションは`npm`を公式では使っているんですよね、`pnpm`を使うには`pnpm/action-setup`が必要です。

その後にコマンドで`pages deploy ....`とすれば完了です。

ちょっとこだわりポイントなんですが、アーティファクトにアップロードされたビルドファイルをダウンロードして使っています。

## 感想

ここ3日間ぐらい、CI/CDの構築をずっとやっていたので、下記のリポジトリは個人開発の中では十分に構築できたかなと思います。

[このブログのリポジトリ](https://github.com/Ayumu3746221/portfolio)

その時に得た知見は全て記事にするつもりです。

CI/CDは非常に奥深い分野だなと思います、自分はバックエンドが領域なのであまり、多くは触れられないのですが、最低限のセキュリティ等は組み込みたいですね。

最後までお読みいただきありがとうございました！！
