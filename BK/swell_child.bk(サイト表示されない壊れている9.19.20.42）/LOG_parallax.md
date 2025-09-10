# NAVIGATION Parallax Fix Log

最終更新: 2025-09-08

## 目的
- NAVIGATION 背景が「固定されて動かない」状態を解消し、スクロールに追従するパララックスを実装。
- NEWS セクションのフルブリード白帯は維持。グレーの余白を発生させない。
- 変更は低リスク・最小限（主に JS）。即時反映できるようキャッシュバスティング対応。

## 実施内容（差分要約）
- JS: `swell_child/js/section-parallax.js`
  - data-属性の拡張サポート:
    - `data-parallax-target`（パララックス対象のCSSセレクタを直接指定）
    - `data-parallax-distance`（最大移動量の絶対px指定。例: 120）
  - 既存の `data-parallax-speed` / `data-parallax-clamp` は継続利用。
  - メディア（video/img/picture）ロード後や `window.load` で再収集・再適用。
  - 背景ターゲットの検出順を強化: `data-parallax-target` > video > img > picture > `.ptl-pageNavHero__bg`。
  - 動作域に合わせた自動スケール計算を改善（最大 +150% 拡大 + 4% マージン）でエッジ露出を防止。
- テンプレート: `swell_child/template-parts/front/section-page-navigation.php`
  - セクションに以下の属性を付与:
    - `data-parallax="bg"`
    - `data-parallax-target=".ptl-pageNavHero__bg"`
    - `data-parallax-speed`（カスタマイザー値）
    - `data-parallax-clamp="0.18"`（可視性向上）
    - `data-parallax-distance="120"`（小さめセクションでも確実に動く）
- 読み込み: `swell_child/functions.php`
  - `section-parallax.js` をフロント側全ページで読み込み（セレクタ未存在なら早期 return で軽量）。
  - バージョンは `filemtime` によるキャッシュバスティング。
- CSS: `swell_child/style.css`
  - `.ptl-pageNavHero__video { object-fit: cover; }` を明示。
  - `.ptl-pageNavHero` は overflow: hidden のままフルブリードを維持（NEWS への影響なし）。

## チューニング手順
- より動きを強くしたい場合:
  - `data-parallax-distance` を 160–200 に上げる。
  - `data-parallax-speed` を 0.45–0.60 に調整（小さいほど強く追従）。
- 端末設定で「動きを減らす」が有効な場合は自動で無効化されます。

## 確認手順
1. ハードリロード（Shift+再読込）
2. NAVIGATION セクションでスクロールし、背景が上下に追従することを確認。
3. 画像/動画の端が露出しない（黒/灰色の帯が出ない）ことを確認。
4. NEWS セクションは従来どおりフルブリード白帯を維持していることを確認。

## 既知事項 / 注意点
- セクションの高さが小さいと視覚効果が弱くなるため、`data-parallax-distance` を上げるか、上下パディングをやや増やすと視認性が向上。
- `data-parallax-target` を外すと、動画/画像/背景コンテナの自動判定に戻ります。

## ロールバック
- NAVIGATION セクションの `data-parallax` 属性を削除すればパララックスは無効。
- JS 読み込みを止める場合は `functions.php` の `child_section_parallax` 登録をコメントアウト。

## 受け入れ条件マッピング
- NAVIGATION 背景が動く: Done（属性・JSの両面で対処）
- グレー余白解消: Done（自動スケール強化 + 覆いコンテナ変換）
- NEWS フルブリード維持: Done（該当CSSは無変更）
- JS中心・キャッシュバスティング: Done（filemtime版管理）
- 単一Markdownログ: 本ファイル
