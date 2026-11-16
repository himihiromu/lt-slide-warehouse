---
title: TAKTでAIの実装・レビューを回したい！
description: TAKTのワークフローとManagerによるゴール管理の紹介
author: himihiromu
---

# TAKTって？

- AIの実装・レビューを回したい！
- 今回はManagerの紹介も
- 2026-11-16確認 / 0.75.0基準

# 今日のゴール

- TAKTで何ができるか知る
- ワークフローの使いどころ
- Managerに任せられる作業

# AIに頼んだ後

- 実装が終わったらレビュー
- 指摘があれば修正を依頼
- テスト結果・差分を確認
- 別の作業との分担も必要

## 毎回指示するのが面倒

- レビューの観点を伝える
- 指摘を直して再レビュー
- いつもの手順を使い回したい
- この流れをワークフローにする

# TAKTでできること

- AIの工程をYAMLで定義
- Claude / Codex / OpenCode等に対応
- 工程ごとに役割・指示を渡す
- [公式README](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/README.ja.md)

## 実装からレビューまで

- 計画 → 実装 → レビュー
- 指摘あり → 修正 → 再レビュー
- 問題なし → 完了確認
- 工程・戻り先を定義できる
- [ワークフローの説明](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/workflows.ja.md)

## 指示も部品に分ける

- Persona：担当する役割
- Policy：守るルール
- Instruction：今回の作業
- Knowledge：参照する知識
- Output Contract：報告の形式
- [ファセットの説明](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/faceted-prompting.ja.md)

## タスクを動かす

```bash
takt add "タグ絞り込みを追加したい"
takt run
takt list
```

- 登録 → 実行 → 結果の確認
- 隔離した作業場所も使える
- [タスク管理](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/task-management.ja.md)

# Managerって？

- ゴールに向けて作業を進めるAI
- タスクの分割・投入・結果確認
- 追加作業や修正も判断
- [開発者による紹介](https://zenn.dev/nrs/articles/d3548bbddc182a)

## ワークフローとの分担

- ワークフロー
  - 各タスクの工程を定義
- Manager
  - タスクを組み合わせて進める
  - 結果を見て次の作業を判断

## 最近の変更

- 0.73.0：ゴール相談の画面
- 0.75.0：仕様の引き継ぎ・PR準備
- 会話の継続やCI待機も強化
- 公式ガイドでは実験的機能
- [変更履歴](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/CHANGELOG.ja.md)

# タグで絞り込みたい

- スライド一覧に機能を追加
- タグを選んだら資料を絞り込む
- これをManagerに相談してみる
- ここからは説明用の例

## 完成の条件

- 選んだタグの資料だけ表示
- 選択を解除したら全件表示
- タグなしの資料も残す
- 今回は全文検索を作らない

## ゴールを登録する

```bash
takt manager
```

- 目的・完成の条件を相談
- `/make-goal` で登録案を作る
- 案を確認して「登録する」を選択
- [相談と登録](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)

## タスクの分割

- データ側：タグを扱えるようにする
- 画面側：選択・絞り込みを作る
- 組み合わせた動作を確認
- 実際の分割は調査後に判断

## 順番と並行実行

- 互いの成果が不要なら並行も可能
- 変更するファイルの重なりを確認
- 前の成果が必要なら順に実行
- [タスク分割の説明](https://zenn.dev/nrs/articles/d3548bbddc182a)

## 仕様を引き継ぐ

- 期待する動作をGherkinで記述
- 「この状態で、この操作をしたら」
- 実装・レビューの基準に使う
- [仕様の扱い](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)

## 動作の例

```gherkin
Scenario: 絞り込みを解除する
  Given タグで一覧を絞り込んでいる
  When タグの選択を解除する
  Then タグなしも含む全件が表示される
```

- シナリオは説明用の例
- 書いただけで動作検証済みにはならない

## 失敗したら

- 原因と途中の成果を確認
- 続きから再開 / 指示を直して再実行
- 判断できなければ人に問い合わせ
- [失敗したタスクへの対応](https://zenn.dev/nrs/articles/d3548bbddc182a)

## PRの準備

- 成果をゴール用ブランチへ集める
- 完成の条件に照らして確認
- PR作成・レビュー対応・CI確認
- [成果の取り込みと完成](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)

## マージの設定

```yaml
manager:
  main_merge: approve
```

- `approve`：準備後に人の指示を待つ
- `auto`：マージまで進める
- 既定は `approve`
- [設定ガイド](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/configuration.ja.md)

## 途中でも相談できる

- 追加の指示や進捗の確認
- `Ctrl+R`：問い合わせに回答
- `Ctrl+G`：一時停止・再開
- 画面を閉じても処理は続く
- [会話と操作](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)

## ほかにできること

- 設定すればSlackからも会話
- 複数リポジトリを同じ担当にできる
  - ただし1ゴールは1リポジトリ
- 形式仕様の検証も可能
  - 有効化すると `/verify` を使える
- [ゴール管理ガイド](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)

# 気になる点

- レビューの正しさは保証されない
- 実行する工程が多いと費用も増える
- 完成の条件・確認方法は必要
- 小さな変更から試したい

# まず動かすなら

- Node.js 22.22.0以上
- Git 2.38以上 / コミット済みのrepo
- 利用するAIの認証設定が必要
- AI実行には利用料金がかかる
- [導入手順](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/README.ja.md)

## 導入コマンド

```bash
npm install -g takt@0.75.0
takt install claude-sdk
# 認証設定後、対象repoで起動
takt manager
```

- 既定のClaude SDKを使う例
- この資料ではAIタスクの実行は未検証

# 勉強会で見るところ

- ゴールの登録案
- タスクの分け方・実行順
- レビューで指摘された内容
- 最後の差分・確認結果・PR

# 参考リンク

- [TAKT公式README](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/README.ja.md)
- [ワークフロー](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/workflows.ja.md)
- [ゴール管理・Manager](https://github.com/nrslib/takt/blob/409712ddc94b3856690321f82c6894d45d85ef6f/docs/goal-management.ja.md)
- [開発者のManager紹介](https://zenn.dev/nrs/articles/d3548bbddc182a)
- 出典は0.75.0のコミットに固定
