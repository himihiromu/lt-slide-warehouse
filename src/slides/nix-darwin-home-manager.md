---
title: Nixではじめる宣言的関数型パッケージ管理
description: nix-darwin と home-manager を使った macOS 構成管理の実践共有
author: himihiromu
---

# Nixではじめる宣言的関数型パッケージ管理

## nix-darwin / home-manager / chezmoi の実践共有

# 自己紹介

## 自己紹介情報
- **名前**: himihiromu
- **部署**: モバイル開発
- **最近の沼**:
  - [Raycast](https://www.raycast.com/)
  - [fish shell](https://fishshell.com/)
  - 標準的なコマンドを置き換える者たち
    - [zoxide](https://github.com/ajeetdsouza/zoxide)
    - [eza](https://github.com/eza-community/eza)
    - [bat](https://github.com/sharkdp/bat)
- **今日のゴール**:
  - Nix を使った Mac 構成管理の実例を共有する
  - 便利さとつらさの両方を伝える

# アジェンダ

- なぜ Mac 構成管理に Nix を使ったのか
- Nix 自体の特徴と内部構造のさわり
- `devShell` / `nix-darwin` / `home-manager` / `chezmoi` の役割分担
- 実際に便利だったこと
- 実際にハマったこと
- 今後どう使っていくか

# 実際に困ってたこと

- Nixを知らない私
  - 社内でIntel MacからM1 Macへ設定移行
  - その知見から自宅PCの設定見直し
- 辛かったこと
  - ツール設定
  - Shell、環境差分
  - 別PC設定の再現

# 代替案の候補

- dotfiles 管理
- Ansible による構成管理

## でもやりたくなかったこと
- 順番にコマンドを実行する管理
- 環境や手順差分に引っ張られる構成

# なぜ Nix を選んだか

- 宣言的な環境管理
- 手順ではなく状態の宣言
- 環境依存の排除、分岐
- 構成のコード化
- 移行コマンドの削減

# Nixのざっくり特徴

- [Nix](https://nixos.org/)
  - パッケージ管理 + 構成管理の仕組み
- [Nix language](https://nix.dev/manual/nix/2.28/language/syntax)
  - 専用の記法を持つ
- 依存込みで一意な store path が生成される
- 依存違いの別バージョンが共存しやすい

# Nix の内部構造

- パッケージは `/nix/store` 配下に配置
- store path にハッシュが含まれる
- 依存によって同一パッケージを複数インストール可能
- バージョン違いの共存や巻き戻しがしやすい

# flake はexperimentalでde facto

- `flakes` は Nix では experimental 扱い
- でも構成例や周辺情報は flakes 前提が多い
- [nix-darwin README](https://github.com/nix-darwin/nix-darwin) も
  `... nix-darwin recommends that beginners use flakes ...`
- 初見だと「何が標準？」が分かりづらい

# 今回使うNix技術

- **devShell**
  - プロジェクトごとの開発環境
- **nix-darwin**
  - macOS システム設定の宣言的管理
- **Home Manager**
  - ユーザー環境・CLI ツールの管理

# devShell って？

- プロジェクトごとの開発環境を定義
- 言語やツールをローカル環境から切り離す
- `flake.nix` で構成と一緒に管理

## 今回の devShell 定義
- Python / Node.js / Java 8 / 21 / Go / Kotlin
- 各言語のランタイム・ツールチェーンを独立管理
- 詳細: [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)

# nix-darwin って？

- macOS 向けの Nix modules
- システム設定を宣言的に管理
- Homebrew の GUI アプリも管理可能
- Mac 入れ替え時の再現に使える

## 自分の用途
- macOS 設定
- Homebrew 経由の GUI アプリ
- システム寄りの構成
- Mac 入れ替え時に再現したい内容

# Home Manager って？

- ユーザー単位の環境を宣言的に管理
- CLI ツールや一部の設定を持たせやすい
- nix-darwin と併用しやすい

## 自分の用途
- CLI ツール
- ユーザー空間で使う各種パッケージ
- 開発に必要なコマンド群

# Chezmoiの管理範囲

- `.zshrc` / `config.fish`
- shell やエディタの設定ファイル
- 環境ごとの差分が出やすいファイル群

## 私の使い分け
- 構成・パッケージ・OS設定 → Nix
- 設定ファイル → chezmoi

# 今回の構成全体像

| nix-darwin | home-manager | chezmoi | devShell |
|---|---|---|---|
| Mac の設定 | CLI ツール | `.zshrc` | 言語別開発環境 |
| Homebrew | パッケージ | `config.fish` | python / js |
| デスクトップapp | コマンド群 | 設定ファイル | java / go / kotlin |

# 成果物の位置付け

- [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
  - 個人用 Nix パッケージ / 構成管理リポ
- `flake.nix` で構成全体を管理
- `home-manager` + `nix-darwin` 併用
- `devShells` も定義中

# リポジトリ内容

- `flake.nix` に構成の入口がまとまっている
- `darwinConfigurations` / `homeConfigurations` が分離
- `x86_64-darwin` / `aarch64-darwin` を意識した構成
- 共通パッケージとマシン依存パッケージを分離
- `devShells` で言語別開発環境も定義中

# 実際便利だったこと

- セットアップが数コマンドで済む
- 新 Mac や再構築時の心理的コストが下がる
- 何を入れているかをコードで追える
- 構成の棚卸しがしやすい
- Intel / Apple Silicon の違いも整理しやすい

# 実際にハマったこと

- 日本語記事が少ない
- Nix 言語の習得が必要
- エラーメッセージとの戦い
- flakes 周りの立ち位置が初見だと分かりにくい
- fish の PATH 周りで地味につらい
  - [nix-env.fish](https://github.com/lilyball/nix-env.fish)

# 運用して感じたこと

- セットアップが楽になるのは本当に良い
- ただし構成保守には数倍の時間がかかる
- かなり「盆栽」になりやすい
- 全部 Nix より役割分担が現実的
- chezmoi 併用は今のところバランスが良い

# どう広がりそうか

- 必要な範囲から始めるのが良さそう
- 必要に応じて管理対象が広がる
- `nix shell` や `devShell` から入るのもあり

# 今Nixを始めるべき

AIが下記全てのデメリットを解決する

- 日本語記事の不足
- Nix 言語の習得が必要
- エラーメッセージとの戦い

# まとめ

- Nix は Mac 構成管理と相性が良い
- `nix-darwin` / `home-manager` / `chezmoi` の役割分担で運用しやすい
- 便利さは大きいが学習・保守コストは重い
- 必要な範囲から始めて自然に広げるのが良さそう

# 参考リンク

- [Nix](https://nixos.org/)
- [Nix language syntax](https://nix.dev/manual/nix/2.28/language/syntax)
- [Home Manager Manual](https://nix-community.github.io/home-manager/)
- [nix-darwin](https://github.com/nix-darwin/nix-darwin)
- [chezmoi](https://www.chezmoi.io/)
- [nix-env.fish](https://github.com/lilyball/nix-env.fish)
- [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
