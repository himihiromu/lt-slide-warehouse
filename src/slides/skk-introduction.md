---
title: SKKってどういう日本語入力？
description: SKKの仕組み・開発の経緯・Google日本語入力やMozcとの違い
author: himihiromu
---

# SKKって？

# 自己紹介

## 自己紹介情報

- **名前**: [himihiromu](https://github.com/himihiromu)
- **今回のテーマ**: SKK
- **今日のゴール**
  - SKKが何をしているのか知ってもらう
  - 普段の日本語入力と比べてみる

# 目次

- SKKって？
- どうやって入力するのか
- どういう経緯で作られたのか
- 普段のIMEとの入力の違い
- 便利そうなところ / 慣れが必要なところ

# SKKって？

## ざっくり概要

- Simple Kana to Kanji conversion program
- かな漢字変換を行う日本語入力
- 漢字にしたい範囲を自分で指定する
- Emacs向けの実装が [DDSKK](https://github.com/skk-dev/ddskk)

## 普段の入力と何が違う？

- 変換したい部分の先頭を大文字で入力
- 送り仮名の始まりも大文字で指定
- 区切りを入力する人が教える
  - [DDSKKの基本操作](https://ddskk.readthedocs.io/ja/latest/05_basic.html)

# SKKの基本的な使い方

## ひらがなを入力

- かなモードで `kanji` → かんじ
- 小文字で打つと、ひらがなとして確定していく
- 漢字にしたい場合は `Kanji`
  - 最初の `K` を大文字にする

## 漢字に変換

- `Kanji` → ▽かんじ
- `Space` → ▼漢字
- もう一度 `Space` → 次の候補
- `Ctrl+J` → 確定
  - 候補の順番は辞書や学習状態で変わる

## この三角は何？

- `▽`：変換する読みを入力中
- `▼`：変換候補を選択中
- 今何をしているかが表示される
  - 操作・表示は [DDSKKの基本操作](https://ddskk.readthedocs.io/ja/latest/05_basic.html) に基づく例

## 送り仮名がある場合

- 「動く」を入力したい
  - `UgoKu` → ▼動く
- `U`：漢字にする部分の始まり
- `K`：送り仮名「く」の始まり
- 送り仮名を入力すると変換が始まる

## 文章にしてみる

- 「漢字を書く」
  - `Kanji` → `Space` → 「漢字」を選択
  - 続けて `wo` → 「漢字を」
  - `KaKu` → 「書く」を選んで確定
- 続きを入力すると、直前の候補も確定
  - [CSKKの操作例](https://naokiri.github.io/cskk-docs/)

# なんでこの仕組みになった？

## 1987年の日本語入力環境

- 原作者は佐藤雅彦氏
- フランス出張先の日本語環境が必要になった
- 当時はPCのかな漢字変換を使ってUnixへ入力
- 重いPCを持っていくのはつらい
  - [原作者の回想](https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md)

## 解決したかったこと

- PCの入力機能に依存したくない
- Unix内で日本語入力を完結させたい
- Nemacs上で動くものが欲しい
- Emacs Lispで作ればよいのでは？

## 開発のきっかけ

- 先行する変換システム **Kanzen** の実演
  - 大文字で漢字の開始位置を指定する仕組み
- 1987年7月頃に開発開始
- 他の仕事をしながら、2〜3週間で動くものを目指した
  - [『bit』1991年4月号の記事の許諾転載](https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md)

## 単純にするための役割分担

- 入力する人
  - 漢字の始まり・送り仮名の位置を指定
- システム
  - 指定された読みから候補を出す
- 区切りの情報をキー操作で渡す、という考え方
  - 基本操作から見た本資料の整理

# Google日本語入力 / Mozcと比較

## 同じ文章を入力するなら

- Google日本語入力 / Mozcの一般的な操作
  - `kanjiwokaku` を続けて入力して変換
  - 必要なら候補や文節の区切りを調整
- SKKの基本操作
  - 「漢字」「を」「書く」と指定しながら進める
- [Mozcのキー定義](https://github.com/google/mozc/blob/master/src/data/keymap/ms-ime.tsv)

## どこを自分で決めるか

- Google日本語入力 / Mozc
  - IMEが変換の区切りを提示
  - 合わなければ自分で直す
- SKK
  - 入力する時点で区切りを指定
  - その範囲で候補を選ぶ

# 便利そうなところ

- 変換する範囲を自分で決められる
- 指定した語ごとに候補を選んで進められる
- 入力と修正の流れを把握しやすそう
  - ここは仕組みから考えた利点
  - 入力速度を測った結果ではない

# 慣れが必要なところ

- 大文字で区切る操作を覚える必要がある
- 送り仮名の位置も意識する
- 辞書によって、出てくる候補が変わる
- 慣れたら誰でも速くなる、とは言い切れない

# よくありそうな疑問

## Emacs以外でも使える？

- Emacs向けのDDSKK以外にも実装がある
- 例えば [CSKK](https://naokiri.github.io/cskk-docs/)
  - IMEからSKK方式で入力するためのライブラリ
- 追加機能・設定方法は実装ごとに確認

# まず試すなら

- 同じ短文を普段のIMEとSKKで入力
- 迷った操作・直した箇所を比べる
- 普段使うアプリや辞書との相性を見る
- 区切りを自分で指定する操作が合うか、触ってみる

# まとめ

- SKKは自分で区切りを指定する日本語入力
- 1987年の日本語入力環境の課題から生まれた
- 大文字と送り仮名の指定が基本
- Google日本語入力 / Mozcとは入力の進め方が違う
- 便利さと操作の慣れ、両方を見て判断したい

# 参考リンク

- [DDSKK](https://github.com/skk-dev/ddskk)
- [原作者の回想・開発の歴史](https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md)
- [DDSKK 基本的な使い方](https://ddskk.readthedocs.io/ja/latest/05_basic.html)
- [CSKK マニュアル](https://naokiri.github.io/cskk-docs/)

- [Mozcのキー定義](https://github.com/google/mozc/blob/master/src/data/keymap/ms-ime.tsv)

## この資料について

- 内容の出典確認日：2026-11-15
- 文体・構成の調整日：2026-11-16
- 操作は公式文書に基づく説明例
- 特定バージョン同士の実機比較・速度測定は未実施
