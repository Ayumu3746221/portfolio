---
title: 【Haskell】head commandを自作した備忘録
description: haskellで可変長引数などを自作する方法等を学習しました。
pubDate: 2026-02-20
tags: [haskell, 自作]
draft: false
---

## Motivation

今回は`Haskell`でLinux commandの`head`を作成しました。

前回は、`nl`を実装したので今回は少しだけレベルアップした感じです、今回も前回と同様に自身で書いた後に、AI(`Claude Code`)にお手本を書いてもらい学習しました。

前回の記事は下記リンクから、見れるのでお読みいただけたら幸いです。

[nlを自作した備忘録](/blog/create-nl-command/)

## 自分で作成した`haed` command

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import qualified Data.Text as T
import qualified Data.Text.IO as TIO
import System.Environment (getArgs)

main :: IO ()
main = do
  args <- getArgs
  content <- case args of
    [path] -> TIO.readFile path
    _ -> TIO.getContents
  TIO.putStr $ myHead content 10

myHead :: T.Text -> Int -> T.Text
myHead text n = T.unlines . takeLine n $ T.lines text

takeLine :: Int -> [T.Text] -> [T.Text]
takeLine _ [] = []
takeLine n (t : ts)
  | n <= 0 = []
  | otherwise = t : takeLine (n - 1) ts
```

私は上記のように作成しました、`takeLine`はPreludeの`take`で代用できるなど、ツッコミどころ万歳ですが、そこはご愛嬌。

上記は、`head -n 20 filePath`などの、オプションなどを作成できてなく、しかし思いつかなかったため、断念しています。

下記では、私のコードの改良点等あげていきます。

## コマンドラインで可変長変数を作成する方法

```haskell

data Options = Options
  { numLines :: Int           -- 表示する行数
  , filePath :: Maybe FilePath -- ファイルパス（Nothing なら stdin）
  }

defaultLines :: Int
defaultLines = 10

```

可変長変数を作成する前に、最初にOptionのデータ型を定義しておきます。`defaultLines`に関しては`head`はデフォルトでは10行表示するので、このようにしています。

`head`は以下のコマンドライン入力を受け付けるとします。

- head
- head file.text
- head -n 10
- head -n 10 file.text

```haskell
parseArgs :: [String] -> Either String Options
parseArgs [] =
  Right $ Options defaultLines Nothing

parseArgs [arg]
  | "-" `isPrefixOf` arg = Left $ "unknown or incomplete option: " ++ arg
  | otherwise = Right $ Options defaultLines (Just arg)

parseArgs ("-n" : nStr : rest) =
  case reads nStr of
    [(n, "")] ->      -- -nの後の引数が10や46などであるか確認
      case rest of
        []     -> Right $ Options n Nothing
        [path] -> Right $ Options n (Just path)   -- その後にpathがあれば正しいコマンドとして処理
        _      -> Left "too many arguments" -- それ以上に引数があれば、エラー
    _ -> Left $ "invalid number after -n: " ++ nStr

parseArgs args =
  Left $ "invalid arguments: " ++ unwords args
```

`parseArgs`はコマンドライン引数のリスト受け取り、失敗であれば`String`を成功であれば`Options`を返します。

引数が何もない場合は、`Options`にデフォルトの10行で処理する旨を2行めで書いています。

下記がエントリーポイントとコアロジックです。

```haskell
main :: IO ()
main = do
  args <- getArgs
  case parseArgs args of
    Left errMsg -> do
      hPutStrLn stderr $ "head: " ++ errMsg
      hPutStrLn stderr "usage: head [-n lines] [file]"
      exitFailure
    Right opts -> do
      content <- case filePath opts of
        Just path -> TIO.readFile path
        Nothing   -> TIO.getContents
      TIO.putStr $ myHead content (numLines opts)

myHead :: T.Text -> Int -> T.Text
myHead text n = T.unlines . take n $ T.lines text
```

## 感想

まず、感想として`haskell`で可変長引数を作成するのが、本当に難しすぎ、最初に場合分けを明確にするべきだなと感じました。

`head`自体のコードの記述量は、そこまで多くなく拍子抜けでした。コマンドの処理のほうが多かった....

しばらくの間はLinux Commandを自作し続けて、`haskell`の感覚を身につけようと思います。
