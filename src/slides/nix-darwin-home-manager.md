---
title: Nix で Mac 構成管理してみて分かった便利さとつらさ
description: nix-darwin と home-manager を使った macOS 構成管理の実践共有
author: himihiromu
---

# Nix で Mac 構成管理してみて分かった便利さとつらさ

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

# なぜこの話をするのか

- Mac の移行を簡略化したかった
- 開発用マシンの状態をコードで管理したかった
- macOS は設定変更できる箇所が多く、開発に必要なツール導入も多い
- 手順書やコマンド列挙ベースではなく、構成ベースで管理したかった
- 実際にやってみると便利さもつらさもあったので共有したい

# 実際に困っていたこと

- 社内の Intel Mac から M1 Mac への移行を経験した
- その知識を使って、自宅の Intel Mac の設定見直しもした
- セットアップのたびに入れるツールや変える設定が多い
- shell 差分や環境差分で地味に崩れやすい
- 「今の快適な状態」を再現するのが面倒

# 代替案として考えたもの

- dotfiles 管理
- Ansible による構成管理

## でもやりたくなかったこと
- コマンドを順番に列挙して実行していく管理
- 実行環境や手順差分に引っ張られる構成
- 設定ファイル管理とパッケージ管理が全部一つに肥大化すること

# なぜ Nix を選んだか

- 宣言的に環境を管理できる
- 環境依存を抑えやすい
- 手順ではなく「最終的にどういう状態にしたいか」で書ける
- 何を入れているか、どんな構成かをコードで追いやすい
- 「移行を楽にする」の相性が良さそうだった

# Nix 自体のざっくりした特徴

- [Nix](https://nixos.org/)
  - パッケージ管理と構成管理の仕組み
- [Nix language syntax](https://nix.dev/manual/nix/2.28/language/syntax)
  - 専用の記法を持つ
- 依存込みの内容から一意な store path が作られる
- そのため、依存違いの別バージョンが共存しやすい
- 「今の環境を上書きする」より「別の成果物を作る」感覚に近い

# Nix の内部構造の話を少しだけ

- パッケージは `/nix/store` 配下に配置される
- store path にはハッシュが入る
- 同じツールでも依存やビルド条件が違えば別物として扱える
- 結果として、バージョン違いの共存や巻き戻しがしやすい
- この性質が「再現性が高い」と言われる理由の一つ

# flake で最初に混乱した話

- `flakes` は Nix では experimental 扱いの機能
- ただ、実際に見る構成例や周辺情報では flakes 前提がかなり多い
- [nix-darwin README](https://github.com/nix-darwin/nix-darwin) でも
  `Despite being an experimental feature in Nix currently, nix-darwin recommends that beginners use flakes ...`
  と書かれている
- 結果として「何が標準なのか」が最初は分かりづらい

## 参考
- [Nix package manager](https://nixos.org/)
- [nix-darwin README](https://github.com/nix-darwin/nix-darwin)
- [Home Manager Manual](https://nix-community.github.io/home-manager/)

# Nix 関連で今回使っているもの

- **devShell**
  - 開発用シェル環境を切り出すための仕組み
- **nix-darwin**
  - macOS を宣言的に管理するための仕組み
- **Home Manager**
  - ユーザー環境や CLI ツール管理向け

# devShell とは

- プロジェクトごとの開発環境を定義しやすい
- 言語やツールをローカル環境からある程度切り離せる
- `flake.nix` に置くことで構成と一緒に管理しやすい

## 現状
- 使い始めてはいる
- ただ、まだ本格活用までは行けていない
- 方向性としてはかなり良さそう

# nix-darwin とは

- macOS 向けの Nix modules
- macOS 設定や Homebrew 周りもまとめて管理できる
- README でも flakes ベースの導入例が前面に出ている

## 自分の用途
- macOS 設定
- Homebrew 経由の GUI アプリ
- システム寄りの構成
- Mac を入れ替えた時に再現したい内容

# Home Manager とは

- ユーザー単位の環境を宣言的に管理するための仕組み
- CLI ツールや一部の設定を持たせやすい
- nix-darwin と併用しやすい

## 自分の用途
- CLI ツール
- ユーザー空間で使う各種パッケージ
- 開発に必要なコマンド群

# なぜ dotfiles を Nix に全部寄せなかったか

- ファイル管理まで全部 Nix に寄せると構成が肥大化しやすい
- shell ごとの差異を吸収するのがしんどい
- 環境ごとの設定分岐も増えがち
- 設定ファイルの管理は専用ツールのほうが扱いやすかった

# chezmoi で管理しているもの

- `.zshrc`
- `config.fish`
- shell やエディタの設定ファイル
- 環境ごとの差分が出やすいファイル群

## なので
- 構成・パッケージ・OS設定は Nix
- 設定ファイルは chezmoi

# 今回の構成全体像

- **nix-darwin**
  - Mac 自体の設定
  - Homebrew
  - デスクトップアプリ管理
- **home-manager**
  - CLI ツール管理
  - ユーザー環境の一部管理
- **chezmoi**
  - `.zshrc`
  - `config.fish`
  - その他設定ファイル管理
- **devShell**
  - 開発環境構成管理を試し始めている

# 成果物の位置付け

- 参考例: [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
- 個人用の Nix パッケージ / 構成管理リポジトリ
- `flake.nix` で構成全体を管理
- `home-manager` と `nix-darwin` を併用
- `devShells` も定義し始めている

# リポジトリを見て分かること

- `flake.nix` に構成の入口がまとまっている
- `darwinConfigurations` と `homeConfigurations` が分かれている
- `x86_64-darwin` と `aarch64-darwin` を意識した構成になっている
- 共通パッケージとマシン依存パッケージを分けている
- `devShells` で言語別の開発環境も持ち始めている

# 実際に便利だったこと

- セットアップが数コマンドで済む
- 新しい Mac や再構築時の心理的コストが下がる
- 何を入れているかをコードで追える
- 構成の見直しや棚卸しがしやすい
- Intel / Apple Silicon の違いも意識して整理しやすい
  - ただし、まだそこはそこまで本格的には使い込めていない

# 実際にハマったこと

- 日本語記事が少ない
- 独自記法や Nix 言語の習得が必要
- エラーメッセージとの戦いになりがち
- flakes 周りの立ち位置が初見だと分かりにくい
- fish の PATH 周りで地味につらい
  - [nix-env.fish](https://github.com/lilyball/nix-env.fish)

# 運用して感じたこと

- セットアップが楽になるのは本当に良い
- ただし、そのための構成保守には数倍の時間がかかる
- かなり「盆栽」になりやすい
- 全部 Nix に寄せるより、役割分担したほうが現実的
- chezmoi と併用する形は今のところバランスが良い

# どう広がりそうか

- 最初は必要な範囲だけ管理するのが良さそう
- そこから必要に応じて管理対象が広がっていく
- `nix shell` や `devShell` から入るのも全然あり
- 一気に全部やるより、使いながら境界を決めるほうが良い

# まとめ

- Nix は Mac 構成管理とかなり相性が良い
- `nix-darwin` / `home-manager` / `chezmoi` の役割分担で運用しやすくなった
- 便利さは大きいが、学習コストと保守コストは重い
- 必要な範囲から始めて、そのまま必要な範囲へ広がっていくのが自然そう

# 参考リンク

- [Nix](https://nixos.org/)
- [Nix language syntax](https://nix.dev/manual/nix/2.28/language/syntax)
- [Home Manager Manual](https://nix-community.github.io/home-manager/)
- [nix-darwin](https://github.com/nix-darwin/nix-darwin)
- [chezmoi](https://www.chezmoi.io/)
- [nix-env.fish](https://github.com/lilyball/nix-env.fish)
- [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
