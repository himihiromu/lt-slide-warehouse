# LT資料置き場

## これは何?

LT資料をmdでGit管理し、GitHub Pagesでホストする為の個人リポジトリ

## ビルド方法

Node、Pandocのインストールが必須

```bash
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
