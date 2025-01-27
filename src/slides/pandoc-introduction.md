# Pandoc勉強会資料

# 自己紹介

## 自己紹介情報
- **名前**: [あなたの名前]
- **部署**: [所属部署]
- **趣味**: [趣味や特技]

## 本日のテーマ
- Pandocの紹介

# 目次

## セクション一覧
1. Pandocとは
2. Pandocの使い方
3. Pandocを使ってできる事
4. Pandocを使った自己開発物の紹介

# Pandocとは

## 概要

- Pandocは、異なるドキュメント形式間で変換を行うユニバーサルなドキュメントコンバータです。
- 対応形式: Markdown, HTML, LaTeX, PDF, Word, ePub, PowerPoint (pptx) など多数。

## 特徴

- クロスプラットフォーム対応。
- 拡張可能で柔軟性が高い。
- オープンソースで無料。

## 利用シーン例

- Markdownで作成したドキュメントをPDFやPowerPointに変換。
- 複数の形式に対応するプレゼンテーション資料の作成。

# Pandocの使い方

## インストール

### 方法
- **公式サイト**: [公式サイト](https://pandoc.org/)からダウンロード。
- **パッケージマネージャー**を使用してインストール。

### コマンド例
- Homebrew (macOS):
  ```bash
  brew install pandoc
  ```

- Scoop (Windows):
  ```bash
  scoop install pandoc
  ```

## 基本コマンド

### MarkdownからPowerPoint (pptx) に変換
- コマンド:
  ```bash
  pandoc input.md -o output.pptx
  ```

### オプション例
- `-s`: スタンドアロンモード。
- `--reference-doc`: テンプレートファイル (例: potx) の指定。

### テンプレート (potx) を使用した例
- コマンド:
  ```bash
  pandoc input.md -o output.pptx --reference-doc=template.potx
  ```

# Pandocを使ってできる事

## ドキュメントの統一管理

- 異なる形式のドキュメントを一つのソース (例: Markdown) で管理。
- 複数形式への一括出力が可能。

## プレゼンテーション資料の作成

- MarkdownからPowerPoint資料 (pptx) の生成。
- reveal.jsを使用したWebベースのスライド作成も可能。
  ```bash
  pandoc slides.md -t revealjs -o slides.html
  ```

## eBookの作成

- MarkdownからePub形式への変換。
  ```bash
  pandoc book.md -o book.epub
  ```

## カスタマイズ

- テンプレートやカスタムCSSを使って、見た目やレイアウトを自由に変更。

# Pandocを使った自己開発物の紹介

## プロジェクト概要

- **リポジトリ**: [lt-slide-warehouse](https://github.com/himihiromu/lt-slide-warehouse)
- **内容**:
  - Pandocを活用して作成したスライド資料を管理・公開するプロジェクト。
  - 簡単にスライド資料を生成・配布可能。

## 使用技術

- Pandoc
- reveal.js
- GitHub Pages

## デモ

- 実際のスライド資料をデモンストレーション。

# まとめ

## Pandocの魅力

- 多様な形式への対応力。
- 簡単なコマンド操作でプロ品質のドキュメントを作成。

## 次のステップ

- Pandocを実際に使ってみる。
- 業務や個人プロジェクトで活用する。

## 参考リンク

- Pandoc公式: [https://pandoc.org/](https://pandoc.org/)
- GitHubリポジトリ: [lt-slide-warehouse](https://github.com/himihiromu/lt-slide-warehouse)
