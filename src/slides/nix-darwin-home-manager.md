---
title: Nix で Mac 構成管理してみて分かった便利さとつらさ
description: nix-darwin と home-manager を使った macOS 構成管理の実践共有
author: himihiromu
---

# Nix で Mac 構成管理してみて分かった便利さとつらさ

## nix-darwin / home-manager / chezmoi の実践共有

- 社内共有 + 技術深掘り寄り
- `my-nix-package-control` を題材に話します

# 自己紹介

## 自己紹介情報
- **名前**: himihiromu
- **部署**: モバイル開発
- **最近の沼**:
  - [Nix](https://nixos.org/)
  - [chezmoi](https://www.chezmoi.io/)
  - [fish shell](https://fishshell.com/)
- **今日のゴール**:
  - Nix を使った Mac 構成管理の実例を共有する
  - 便利さとつらさの両方を伝える

# 今日話すこと

- なぜ Mac 構成管理に Nix を使ったのか
- `nix-darwin` / `home-manager` / `chezmoi` の役割分担
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
- shell や環境差分に引っ張られる構成
- 設定ファイル管理とパッケージ管理が全部一つに肥大化すること

# なぜ Nix を選んだか

- 宣言的に環境を管理できる
- 環境依存を抑えやすい
- shell 差分を含めたセットアップを整理しやすい
- 何を入れているか、どんな構成かをコードで追いやすい
- 「移行を楽にする」の相性が良さそうだった

# まず Nix 周辺のざっくり整理

- [Nix](https://nixos.org/)
  - パッケージ管理と構成管理の仕組み
- [nix-darwin](https://github.com/nix-darwin/nix-darwin)
  - macOS を宣言的に管理するための仕組み
- [Home Manager](https://nix-community.github.io/home-manager/)
  - ユーザー環境や CLI ツール管理向け
- [chezmoi](https://www.chezmoi.io/)
  - dotfiles 管理用

# flake で最初に混乱した話

- `flakes` は Nix では experimental 扱いの機能
- ただ、実際に見る構成例や周辺情報では flakes 前提がかなり多い
- 特に `nix-darwin` は beginner 向けに flakes を推している
- 結果として「何が標準なのか」が最初は分かりづらい

## 参考
- [Nix package manager](https://nixos.org/)
- [nix-darwin README](https://github.com/nix-darwin/nix-darwin)

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

# なぜ dotfiles を Nix に全部寄せなかったか

- ファイル管理まで全部 Nix に寄せると構成が肥大化しやすい
- shell ごとの差異を吸収するのがしんどい
- 環境ごとの設定分岐も増えがち
- dotfiles は dotfiles で専用ツールに寄せたほうが管理しやすかった

## なので
- 構成・パッケージ・OS設定は Nix
- 設定ファイルは chezmoi

# nix-darwin で管理しているもの

- macOS 設定
- Homebrew 経由の GUI アプリ
- システム寄りの構成
- Mac を入れ替えた時に再現したい内容

## イメージ
- 「この Mac をどういう状態にしたいか」

# home-manager で管理しているもの

- CLI ツール
- ユーザー空間で使う各種パッケージ
- 一部のユーザー向け設定
- 開発に必要なコマンド群

## イメージ
- 「このユーザーがどういう道具を使える状態にしたいか」

# chezmoi で管理しているもの

- `.zshrc`
- `config.fish`
- shell やエディタの設定ファイル
- 環境ごとの差分が出やすいファイル群

## 分けた理由
- 設定ファイルの管理は専用ツールのほうが扱いやすかった
- Nix 構成を肥大化させすぎずに済んだ

# devShell について

- 開発環境の構成管理にも手を出し始めた
- まだ本格活用までは行けていない
- ただ、言語ごとの開発環境を閉じ込める方向性はかなり良さそう

## 今後の期待
- プロジェクト単位での再現性向上
- オンボーディングの簡略化

# 成果物: my-nix-package-control

- リポジトリ: [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
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

- セットアップが数コマンドで終わる
- 新しい Mac や再構築時の心理的コストが下がる
- 何を入れているかをコードで追える
- 構成の見直しや棚卸しがしやすい
- Intel / Apple Silicon の違いも意識して整理しやすい

# 実際にハマったこと

- 日本語記事が少ない
- 独自記法や Nix 言語の習得が必要
- エラーメッセージとの戦いになりがち
- flakes 周りの立ち位置が初見だと分かりにくい
- fish の PATH 周りで地味につらい

# 運用して感じたこと

- セットアップが速いのは本当に良い
- ただし、そのための構成保守には数倍の時間がかかる
- かなり「盆栽」になりやすい
- 全部 Nix に寄せるより、役割分担したほうが現実的
- chezmoi と併用する形は今のところバランスが良い

# 向いているケース / 向いていないケース

## 向いている
- 複数マシンを管理したい
- Mac 移行を楽にしたい
- 開発環境をコードで残したい
- 構成の再現性を重視したい

## 向いていない
- とにかく最短で今日から使いたい
- 保守コストを増やしたくない
- エラー調査や英語ドキュメントを避けたい

# まとめ

- Nix は Mac 構成管理とかなり相性が良い
- `nix-darwin` / `home-manager` / `chezmoi` の役割分担で運用しやすくなった
- 便利さは大きいが、学習コストと保守コストは重い
- まずは小さく導入して、必要な範囲だけ広げるのがよさそう

# 参考リンク

- [Nix](https://nixos.org/)
- [Home Manager Manual](https://nix-community.github.io/home-manager/)
- [nix-darwin](https://github.com/nix-darwin/nix-darwin)
- [chezmoi](https://www.chezmoi.io/)
- [my-nix-package-control](https://github.com/himihiromu/my-nix-package-control)
