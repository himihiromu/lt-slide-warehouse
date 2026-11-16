# LT資料置き場

## これは何?

LT資料をmdでGit管理し、GitHub Pagesでホストする為の個人リポジトリ

## ビルド方法

Node.js 22.23.4 以上、npm 9.6.5 以上、Pandoc のインストールが必須。
依存関係は CI と同じく npm でインストールする。

```bash
npm ci
npm run build
```

## スライドの作成・確認

原稿は `src/slides/` 直下のMarkdownへ追加する。タイトルはYAMLの `title` に記入し、`##` 見出しでスライドを区切る。例: `src/slides/skk-introduction.md`。

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

一覧: http://127.0.0.1:4321/lt-slide-warehouse/slides/

SKK入門: http://127.0.0.1:4321/lt-slide-warehouse/slides/skk-introduction/

TAKT紹介: http://127.0.0.1:4321/lt-slide-warehouse/slides/takt-introduction/

Pandoc変換はAstroの設定読み込み時に実行するため、原稿の追加・編集後は開発サーバーを再起動する。

```bash
npm run astro -- dev stop
npm run dev -- --host 127.0.0.1 --port 4321
```

`src/content/slides/` は生成先なので直接編集しない。ビルド成果物の確認には `npm run build` の後に `npm run preview` を使う。

## Pandoc変換コマンド

```bash
pandoc --template src/slides/slide-template/slide-template.md -f markdown -t revealjs --slide-level 2 src\slides\pandoc-introduction.md -o output.html
```

```bash
pandoc --print-default-data-file reference.pptx > custom-reference.pptx
pandoc -f markdown  --slide-level 2 --reference-doc custom-reference.pptx src\slides\pandoc-introduction.md -o output.pptx
```
