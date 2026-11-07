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

## Pandoc変換コマンド

```bash
pandoc --template src/slides/slide-template/slide-template.md -f markdown -t revealjs --slide-level 2 src\slides\pandoc-introduction.md -o output.html
```

```bash
pandoc --print-default-data-file reference.pptx > custom-reference.pptx
pandoc -f markdown  --slide-level 2 --reference-doc custom-reference.pptx src\slides\pandoc-introduction.md -o output.pptx
```

## TAKT で勉強会スライドを作る

構成・調査・原稿・レビュー・ビルドと表示検証を行う `slide-production` を利用できます。
[利用手順](docs/slide-production.md)と[依頼の雛形](docs/templates/slide-order.md)を参照してください。
