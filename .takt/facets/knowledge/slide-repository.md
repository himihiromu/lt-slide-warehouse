# lt-slide-warehouse の制作・検証

- スライド原稿は `src/slides/` 直下の `.md`。Pandoc が Markdown として処理するため、MDX 固有の JSX を使わない。
- `src/integrations/pandoc-builder.ts` が `--slide-level 2` で reveal.js 向けに変換する。H1 は章・横方向、H2 は章内の下方向という構造を既存例と実際の表示で確認する。
- 先頭に YAML frontmatter の `title` を必ず付ける。既存例は `src/slides/chezmoi.md`、テンプレートは `src/slides/slide-template/slide-template.md`。
- `src/content/slides/` は生成物で Git 対象外。直接編集しない。調査、構成、発表者ノート、検証記録は `docs/slides/<slug>/` に置き、スライド化されないようにする。ノートの見出しを原稿のスライド見出しと対応させる。
- Node.js・npm の要件は package.json / README、Pandoc は PATH で確認する。開発先ルートで `npm ci`、`npm run build`（astro check && astro build）。失敗を成功扱いにしない。
- CI 相当の代替は `docker build -t pandoc-astro-builder .` と `docker run --rm -w /io -v "$PWD:/io" pandoc-astro-builder bash -c "npm ci && npm run build"`。ホストの node_modules を置き換えるため、隔離された作業先で実行する。
- `npm run preview -- --host 127.0.0.1 --port <空きポート>` でローカル表示。アドレスは `/lt-slide-warehouse/slides/<slug>/`。一覧は `/lt-slide-warehouse/slides/`。公開ベースパスを維持する。
- 利用可能なブラウザ自動操作で全ページの文字・コード・図のはみ出しを確認し、横方向と縦方向のスライド送りを確認する。headless でもよい。画面サイズを明記し、HTTP 200 やビルド成功だけで表示確認済みにしない。
- 起動したプレビューサーバーは使用した版の停止方法で終了する。他の作業者のサーバーを停止しない。
- main への push は GitHub Pages 公開を起動する。制作では作業ブランチの Draft PR までとする。
