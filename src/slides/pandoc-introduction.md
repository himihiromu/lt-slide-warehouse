---
title: Pandoc勉強会資料
description: Pandoc紹介資料
author: himihiromu
---

# Pandoc勉強会資料

# 自己紹介

## 自己紹介情報
- **名前**: himihiromu
- **部署**: モバイル開発
- **趣味**: ゲームとかCD集め。
- **好きなバンド**: 
  - [ELLEGARDEN](https://ellegarden.jp/)
  - [MONOEYES](https://www.monoeyes.net/)
  - [BIGMAMA](https://bigmama-web.com/)
  - [fripside](https://fripside.net/)
  - [忘れらんねえよ](https://www.office-augusta.com/wasureranneyo/)


# 本日のテーマ
- Pandocの紹介
- 自身の雑開発物紹介

# 目次

1. Pandocとは
2. Pandocの使い方
3. Pandocを使ってできる事
4. Pandocを使った自己開発物の紹介

# Pandocとは

## 概要

- Pandocは、異なるドキュメント形式間で変換を行うユニバーサルなドキュメントコンバータです。
- [対応形式](https://pandoc-doc-ja.readthedocs.io/ja/latest/users-guide.html#general-options): Markdown, HTML, LaTeX, PDF, Word, ePub, PowerPoint (pptx) など多数。
- Haskell製

## 特徴

- クロスプラットフォーム対応。
- 拡張可能で柔軟性が高い。
- オープンソースで無料。

## 利活用例

- Markdownで作成したドキュメントをPDFやPowerPointに変換。
- 複数の形式に対応するプレゼンテーション資料の作成。
- 社内テンプレート等を利用した資料作成をGit管理で行うことができる

# Pandocの使い方

## インストール

- **公式サイト**: [公式サイト](https://pandoc.org/installing.html)からダウンロード。
- **パッケージマネージャー**を使用してインストール。

## コマンド例
- [Homebrew (macOS)](https://formulae.brew.sh/formula/pandoc):
  ```bash
  brew install pandoc
  ```

- [Scoop (Windows)](https://bjansen.github.io/scoop-apps/main/pandoc/):
  ```bash
  scoop install pandoc
  ```

# 基本コマンド

## Markdown 2 PowerPoint
- コマンド:
  ```bash
  pandoc input.md -o output.pptx
  ```

## オプション例

- `-s`: スタンドアロンモード。
  - ファイル単体で使える形になる
- `--reference-doc`: テンプレートファイル (例: potx) の指定。
  - 独自に作成したテンプレートを使用できる

## potxを使用した例

- コマンド:
  ```bash
  pandoc input.md -o output.pptx --reference-doc template.potx
  ```
※注意点
Pandocで使用できる形へ整えてあげないとうまく動いてくれない事が多々ある

# Pandocを使ってできる事

## ドキュメントのmd管理

- 異なる形式のドキュメントを一つのソース (例: Markdown) で管理。
- 複数形式への一括出力が可能。
- 社内テンプレート等に沿ったpptxへの変換が可能

## プレゼンテーション資料の作成

- MarkdownからPowerPoint資料 (pptx) の生成。
- reveal.jsを使用したWebベースのスライド作成も可能。
  ```bash
  pandoc slides.md -t revealjs -o slides.html
  ```

## PowerPointスライド資料の作成

- MarkdownからPowerPoint形式への変換。
  ```bash
  pandoc book.md -o book.pptx
  ```

## カスタマイズ

- テンプレートやカスタムCSSを使って、見た目やレイアウトを自由に変更。

# Pandocの微妙な点

## 変換ツールに過ぎないこと

- 変換前の形式をある程度整える必要がある
- テンプレートに使用するファイルもPandoc用に整備が必要
- [ライターオプション例](https://pandoc-doc-ja.readthedocs.io/ja/latest/users-guide.html#options-affecting-specific-writers)
- 雑に使うだけなら[Marp](https://marp.app/)とかの方が使いやすいかも

# Pandocを使った自己開発物の紹介

## プロジェクト概要

- **リポジトリ**: [lt-slide-warehouse](https://github.com/himihiromu/lt-slide-warehouse)
- **内容**:
  - Pandocを活用して作成したスライド資料を管理・公開するプロジェクト。
  - 簡単にスライド資料を生成・配布可能。

## 主な使用技術

- [Astro](https://github.com/withastro/astro)
- [Pandoc](https://pandoc.org/)
- [reveal.js](https://revealjs.com/)
- [GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages)

# まとめ

## Pandocの魅力

- 多様な形式への変換が可能。
- 簡単なコマンド操作で多数の形式のドキュメントを作成可能
- テンプレートを利用したスライド資料への対応も可能

## 参考リンク

- Pandoc公式: [https://pandoc.org/](https://pandoc.org/)
- GitHubリポジトリ: [lt-slide-warehouse](https://github.com/himihiromu/lt-slide-warehouse)
