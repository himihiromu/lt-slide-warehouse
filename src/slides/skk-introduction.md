---
title: SKK入門 — 自分で区切る日本語入力
description: SKKの誕生、入力の仕組み、Google日本語入力・Mozcとの比較
---



## SKK入門 {.skk-slide}

<style>
.reveal .skk-slide { text-align: left; font-size: 28px; line-height: 1.55; }
.reveal .skk-slide h2 { font-size: 1.65em; color: #8bd5ca; line-height: 1.3; margin-bottom: 0.65em; }
.reveal .skk-slide p { margin: 0.6em 0; }
.reveal .skk-slide li { margin: 0.35em 0; }
.reveal .skk-slide table { font-size: 0.75em; width: 100%; }
.reveal .skk-slide th, .reveal .skk-slide td { padding: 0.45em; }
.reveal .skk-slide .source { font-size: 0.52em; color: #b8c0cc; margin-top: 1.2em; }
.reveal .skk-slide .lead { font-size: 1.35em; margin: 1em 0; }
.reveal .skk-slide code { color: #f5d890; }
.reveal .skk-slide .steps { padding: 0.7em; border-left: 4px solid #8bd5ca; background: #282d35; }
</style>

<div class="lead">自分で区切る、日本語入力。</div>

どんな仕組みで、なぜ生まれたのか？<br>
Google日本語入力・Mozcと比べて考える。

日本語入力を普段使う人向け・約15分<br>
資料の確認日：2026-11-15

::: notes
画面右下の矢印または左右キーで進む。想定時間は仮置きであり、開催条件は未指定。
:::

## 今日持ち帰ること {.skk-slide}

1. SKKでは、変換する範囲を自分で指定する。
2. 1987年の日本語入力環境の課題から生まれた。
3. 入力方式の違いと、製品・実装の違いを分けて考える。

::: notes
導入1分。使い方4分、歴史3分、比較5分、まとめ2分が目安。
:::

## SKKとは？ {.skk-slide}

**Simple Kana to Kanji conversion program**

- 読みから漢字へ変換する日本語入力。
- 変換の始まりや送り仮名の位置を、入力する人が示す。
- Emacs上の実装としてDDSKKがある。

<div class="source">出典：<a href="https://github.com/skk-dev/ddskk">DDSKK README</a>、<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">DDSKK 基本的な使い方</a></div>

## 最初に、ひらがなを打つ {.skk-slide}

かなモードで小文字のローマ字を入力する。

<div class="steps"><code>kanji</code> → かんじ</div>

通常のひらがなは、そのまま確定していく。<br>
漢字に変えたいときは、先頭を大文字にする。

<div class="source">以下の状態表示はDDSKKの基本操作に基づく説明例。キー設定・候補順は実装や辞書により異なる。<br>出典：<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">DDSKK 基本的な使い方</a></div>

## 「漢字」に変換する {.skk-slide}

| 操作 | 表示例 | 意味 |
|---|---|---|
| `Kanji` | ▽かんじ | 大文字で変換開始 |
| `Space` | ▼漢字 | 辞書の候補を表示 |
| さらに `Space` | ▼幹事 | 次の候補へ |
| `Ctrl+J` | 幹事 | 選んだ候補を確定 |

`▽` は読みを入力中、`▼` は候補を選択中。

<div class="source">候補順は説明用。出典：<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">DDSKK 基本的な使い方</a></div>

## 送り仮名も自分で指定 {.skk-slide}

<div class="steps"><code>UgoKu</code> → ▼動く</div>

- 最初の `U`：漢字にする部分の始まり。
- 途中の `K`：送り仮名「く」の始まり。
- 送り仮名の入力で変換が始まる。

「どこから送り仮名か」という情報もキー操作で渡す。

<div class="source">出典：<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">DDSKK 基本的な使い方・送り仮名のある語</a></div>

## 同じ文章を打ってみる {.skk-slide}

**漢字を書く**

| 段階 | SKKの操作例 |
|---|---|
| 漢字 | `Kanji` → `Space` → 候補を選ぶ |
| を | 続けて `wo`（直前の候補も確定） |
| 書く | `KaKu` → 候補を選ぶ → 確定 |

文章の途中で、変換する単位を明示していく。

<div class="source">出典：<a href="https://naokiri.github.io/cskk-docs/">CSKK マニュアル</a>。基本操作の説明例であり、実機の録画ではない。</div>

## 1987年、なぜ作った？ {.skk-slide}

**佐藤雅彦氏が、フランス出張先の日本語環境を用意するため。**

- Nemacsで日本語を扱えても、入力環境には課題があった。
- 当時はPC側のかな漢字変換を使ってUnixへ入力していた。
- 重いPCを持参せず、Unix内で完結させたかった。

<div class="source">出典：<a href="https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md">SKKの誕生秘話</a>（原作者の『bit』1991年4月号の記事を許諾転載）。要約。</div>

::: notes
現在のIMEへの不満が直接の開発理由だった、と歴史を置き換えない。これは当時の環境に関する原作者の説明。
:::

## 短期間で動く、単純な設計 {.skk-slide}

- 大文字で漢字の開始位置を指定する **Kanzen** に影響を受けた。
- 1987年7月頃、Emacs Lispで開発を開始。
- 他の仕事と並行し、2〜3週間で動くものを目指した。

<div class="lead">必要な区切りを、人からシステムへ伝える。</div>

<div class="source">開発時期・経緯：<a href="https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md">原作者の回想</a>。最後の一文は本資料による設計の整理。</div>

## 何を解決する仕組みか {.skk-slide}

**当初の課題**<br>
持ち運ぶPCに依存せず、Nemacsで日本語を入力したい。

**操作上の特徴**<br>
変換開始と送り仮名を明示するので、指定した範囲で候補を選べる。

**利用者が引き受けること**<br>
区切りを決める操作と、その入力習慣を身につける。

<div class="source">出典：<a href="https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md">開発の経緯</a>、<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">基本操作</a>。利点・負担の整理は本資料の考察。</div>

## Google日本語入力・Mozcと比較 {.skk-slide}

| 観点 | SKKの基本操作 | Google日本語入力・Mozcの一般的な操作 |
|---|---|---|
| 入力する単位 | 変換箇所を指定して進める | 読みを続けて入れ、まとめて変換できる |
| 区切り | 利用者が入力時に示す | IMEが提示し、必要なら利用者が調整 |
| 修正する場面 | 指定した語の候補を選ぶ | 候補や文節の区切りを調整 |

「漢字を書く」なら、後者は `kanjiwokaku` を入れて変換する例を考えられる。

<div class="source">出典：<a href="https://ddskk.readthedocs.io/ja/latest/05_basic.html">DDSKK基本操作</a>、<a href="https://github.com/google/mozc/blob/master/src/data/keymap/ms-ime.tsv">Mozcキー定義（文節操作を含む）</a>。設定・入力スタイルで操作は変わる。</div>

## 予測や辞書も比較の軸 {.skk-slide}

- Mozcには変換・予測・サジェストの入力状態がある。
- Google日本語入力は日付変換や読み間違い訂正などを案内している。
- SKK系も、補完や送り仮名の自動処理などの拡張を持つ実装がある。

**基本方式と追加機能を分けて見る。**

<div class="source">出典：<a href="https://github.com/google/mozc/blob/master/src/data/keymap/README.md">Mozcの入力状態</a>、<a href="https://www.google.co.jp/intl/jp/ime/feature.html">Google日本語入力の機能</a>、<a href="https://github.com/skk-dev/ddskk/blob/master/docs/06_apps.rst">DDSKK 応用</a></div>

## Google日本語入力 ≠ Mozc {.skk-slide}

MozcはGoogle日本語入力に由来するOSSプロジェクト。

| 観点 | Google日本語入力 | Mozc |
|---|---|---|
| 提供形態 | 製品のバイナリ | ソースコード |
| システム辞書 | Google内部の辞書 | OSS辞書 |
| 一部の補助データ | 製品用データ | プレースホルダーのみのものもある |
| GoogleによるQA | stable版で実施 | 公式QAの保証なし |

<div class="source">出典：<a href="https://github.com/google/mozc">Mozc README</a>、<a href="https://github.com/google/mozc/blob/master/docs/about_branding.md">About Branding</a>（2026-11-15確認）。同じ候補・変換精度になるとは限らない。</div>

## 誤解しやすいところ {.skk-slide}

- **「SKKなら必ず速い」？**<br>
  習熟・文章・辞書次第。本資料では速度を測定していない。
- **「SKKはEmacs専用」？**<br>
  CSKKのようにIMEから利用するための実装もある。
- **「Google日本語入力は文章を送信する」？**<br>
  公式FAQは、入力した単語や文章は送信しないと説明している。

<div class="source">出典：<a href="https://naokiri.github.io/cskk-docs/">CSKK</a>、<a href="https://www.google.co.jp/intl/jp/ime/feature.html">Google日本語入力FAQ</a>。通信機能全般の有無とは別の話。</div>

## 自分に合うか、試す観点 {.skk-slide}

- 自分で区切る操作を、扱いやすいと感じるか。
- よく書く語や固有名詞を、辞書から出せるか。
- 普段のエディターやアプリで使えるか。
- 続けて入力する方法と比べ、修正の負担はどう変わるか。

まずは同じ短文を入力し、**迷った操作と直した箇所**を比べてみる。

<div class="source">ここは本資料による試用の提案。製品の優劣を測定した結果ではない。</div>

## まとめ {.skk-slide}

<div class="lead">SKKは、区切りの情報を<br>入力する人が渡す日本語入力。</div>

- 出発点は1987年の日本語入力環境の課題。
- 大文字と送り仮名の指定で、変換の範囲を伝える。
- 比較するときは方式・実装・辞書を分けて考える。

## 参考資料 {.skk-slide}

- [DDSKK README](https://github.com/skk-dev/ddskk) / [原作者の回想](https://github.com/skk-dev/ddskk/blob/master/READMEs/history.md)
- [DDSKK 基本的な使い方](https://ddskk.readthedocs.io/ja/latest/05_basic.html) / [応用](https://github.com/skk-dev/ddskk/blob/master/docs/06_apps.rst)
- [CSKK マニュアル](https://naokiri.github.io/cskk-docs/)
- [Mozc README](https://github.com/google/mozc) / [About Branding](https://github.com/google/mozc/blob/master/docs/about_branding.md)
- [Mozc入力状態](https://github.com/google/mozc/blob/master/src/data/keymap/README.md) / [キー定義](https://github.com/google/mozc/blob/master/src/data/keymap/ms-ime.tsv)
- [Google日本語入力の機能・FAQ](https://www.google.co.jp/intl/jp/ime/feature.html)

<div class="source">確認日：2026-11-15。Webドキュメントに基づく比較。特定の実装バージョン同士の実機比較は未実施。</div>
