---
title: 【Haskell】nlコマンドを作成した際の備忘録
description: Linux commandのnlをhaskellで作成した際の備忘録です、基本的なData.Textの操作がわかります。
pubDate: 2026-02-17
tags: [haskell, 自作]
draft: false
---

今回は`Linux`コマンドの`nl`を`Haskell`で作成した備忘録です。

よろしければお手元の`Linux`環境で`nl`コマンドを打った後に見ていただければと思います。

## この記事の概要

私が書いたソースコードとAIに書いてもらったコードを比較して、今後に生かせそうな点をまとめたいと思います。

下記にソースコードへのリンクを添付しておきます。

[github:今回のソースコード](https://github.com/Ayumu3746221/haskell-sandbox/tree/main/nl/app)

## 入出力について

私は`Haskell`の入出力をあまり分かっておらず、以下のように書きました

```haskell
main :: IO ()
main = do
  putStrLn "ファイルを指定してください"
  path <- getLine
  withFile path ReadMode $ \handle -> do
    contents <- hGetContents handle
    let lineList = nlCommand $ lines contents
    mapM_ TIO.putStrLn lineList
```

実際は`nl {file path}`と書くわけですから、コマンドラインから引数を受け取らなければなりません。それにプラスして今回は`Data.Text`を使っているので、`withFile`ではなく`Data.Text.IO.readFile`を使って直にTextで読み込んだ方が良いです。

これらを修正すると

```haskell
main :: IO ()
main = do
  args <- getArgs
  contents <- case args of
    [path] -> TIO.readFile path
    _      -> TIO.getContents
  TIO.putStr $ nl contents
```

このようになり、かなり簡略化されたのがわかります、これからも`Data.Text`にはお世話になるでしょうから、ここで覚えときたいですね。

## 無限リストとの合成について

私は`zip`を用いて無限リストとテキストファイルの各行を合成しようと思ったので、以下のようなコードを書きました。

```haskell
addLineNum :: [T.Text] -> [(Int, T.Text)]
addLineNum = zip [1 ..] . filter (not . T.null)
```

これだとfilterが空白行を削除してしまうので`nl`と挙動が違います、また返り値がタプルになってしまうので、出力時に不便です。そこで`zipWith`という関数が存在するらしく、それは一つの関数と二つのリストを受け取って、受け取った関数を二つのリストに適用する関数です。

これを扱うことで返り値がタプルになることなく、不便なく運用できるということです。

下記がAIが書いてくれたお手本です。

```haskell
nl :: T.Text -> T.Text
nl = T.unlines . zipWith formatLine [1 ..] . T.lines

formatLine :: Int -> T.Text -> T.Text
formatLine n line
  | T.null line = T.empty
  | otherwise   = T.justifyRight 6 ' ' (tshow n) <> "\t" <> line
```

- T.linesは`lines`と一緒で`\n`で区切ってリストにしてくれます。
- T.justifyRightは数値分右にずらします。

私はタプルをTextにするのに苦労したのですが、`zipWith`を知っていればもっと簡単でしたね....

## tshowについて

```haskell
tshow :: Int -> T.Text
tshow = T.pack . show
```

AIによると特定の型をTextに変換する際によく使われるらしいです。

## 感想

初めてプログラミングやった時みたいでした、`chrome`と睨めっこして書いてました。
私はずっとAIがあったので、昔の開発を知らないのですが、睨めっこして書いていたら、職場の先輩が知らないライブラリ使って、簡潔に書いてきたみたいな、そんな感じがします。

今はライブラリはAIが使ったのを確認して、挙動を確認すればいいですから、開発前にリファレンスを漁る作業があったと考えるとぎょっとします、その時代のエンジニアにはなれそうにないです....

しばらくは「あー行き詰まった」って時に局所的にAIを使う方針で、Linux commandを書いていこうかなと思います。
