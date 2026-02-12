---
title: 【Haskell】Functorのfmapについて
description: HaskellのFunctorのfmapについてまとめました。概念を理解するためのメモです。
pubDate: 2026-02-10
tags: [haskell, memo]
draft: false
---

[注意]この記事はHaskellを学習中の者が書いたメモにあたる物です。

最近になって`Haskell`という言語を`Cis194`[^1]で学習しているのですが、その中で`Functor`に講義資料で出会いました。

この関数が、かなり難解で苦戦しましたので自身の解釈と理解をはっきりと明文化しておこうと思いまして、この記事を作成しました。

よく、`Monad`と遭遇して多くの初学者が挫折するとweb上の情報では記されていますが、この関数（概念と呼ぶのが正しいのでしょうか？）もかなり難しいと感じています。

というか、基本的に再帰的な処理を書いたりと`OOP`や`手続型`等とは頭の使い方が違うのに苦戦して、やっと慣れてきたところに、こういった概念が現れたら火傷するのも当然ですね（笑）。

あまり、ここら辺の愚痴を書いてしまうと、それだけで記事を書けてしまうので、序文はこの程度にしておきます。

## fmapについて

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b

-- 但し、f :: Type -> Type とする。
```

今回は上記のように定義されているとして話を進めています。上記は完全な定義[^2]ではありませんが、他のメソッドについては、この記事の範疇を超えるため、ここでは扱いません。

一言で述べると`fmap`は構造を保存したまま、関数`f`を値に適用します。

試しに`Maybe`で考えてみましょう。

```haskell
instance Functor Maybe where
    fmap _ Nothing = Nothing
    fmap h (Just a) = Just (h a)
```

`Maybe`は実際には`Maybe Int`といった、「おそらく、`Int`を持っているよね」みたいな文脈で用いられます。

これに関数`f :: Int -> Int`を適用するには、どんな操作が必要でしょうか？

1. `Maybe Int`が`Just Int`を保持しているかどうか確認する。
2. もし、`Nothing`であれば関数`f`は適用できないから`Nothing`を返す。
3. `Just Int`を持っていれば、`Int`のみに関数`f`を適用する
4. `Just`で再び包んで結果を返却する。

といった操作が必要になります。

これを愚直に実装してみると、

```haskell
applyToMaybe :: (Int -> Int) -> Maybe Int -> Maybe Int
applyToMaybe f Nothing  = Nothing
applyToMaybe f (Just x) = Just (f x)
```

```haskell
applyToMaybe (+1) (Just 5)   -- Just 6
applyToMaybe (+1) Nothing    -- Nothing
```

ということになるわけです。

**構造を保存したまま関数を適用する。** というのが、なんとなくわかったでしょうか？しかし、これを`Maybe String`や`Maybe (自作したデータ構造)`毎に作成するのは骨が折れます。

そこで`Functor`という`class`を`Maybe`でインスタンス化することで、`Maybe **`に何が入っていても対応できるというわけです。

## 省略形の書き方

`fmap`は`<$>`で省略される場合が多いです。

```haskell
(+2) <$> Just 5     -- Just 7
(+5) <$> [1,2,3,4]  -- [6,7,8,9]
```

## fmapのユースケース

`fmap`は単一の関数適用を抽象化するものです、であるのでなんらかの構造を維持しながら関数を適用するケースで扱われます。

実際には引数が複数のケースが多いです、例えば`Just 3`と`Just 5`を足し合わせる時など、引数が2種類以上になった際に、`Applicative`が用いられます。

## 参考文献

- [[2013 Spring]Cis194 Introduction to Haskell by University of Pennsylvania week9](https://www.cis.upenn.edu/~cis1940/spring13/lectures.html)
- [Learn You a Haskell for Great Good!](https://learnyouahaskell.github.io/chapters.html)
- [Hackage - Data.Functor](https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-Functor.html)

[^1]: [[2013 Spring]Cis194 Introduction to Haskell by University of Pennsylvania](https://www.cis.upenn.edu/~cis1940/spring13/)

[^2]: `(<$)`の定義が抜けています、詳しくは参考文献を参照してください。
