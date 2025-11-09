# M.M.M サロン 参照用ファイル

**日付:** 2025年11月9日  
**目的:** パトラクシェサイト制作の参考資料

## ファイル構成

### HTML
- `mmm.html` (1,177行) - トップページ完全版

### CSS
- `mmm.style.css` (6,890行) - コンパイル済みメインCSS
- `mmm.common.css` (4,574 bytes) - 共通CSS
- `mmm.top.css` (34,732 bytes) - トップページ専用CSS
- `mmm.lightbox.css` - Lightboxスタイル
- `mmm.jquery.bxslider.css` - bxSliderスタイル
- `mmm.slick.css` - Slickスライダースタイル
- `mmm.modaal.css` - Modaalモーダルスタイル

### JavaScript
- `mmm.common.js` (4,832 bytes) - 共通JS
- `mmm.salon-items-top.js` (1,665 bytes) - サロン表示JS
- `mmm.lightbox.min.js` (12,400 bytes) - Lightboxライブラリ
- `mmm.jquery.bxslider.min.js` (37,579 bytes) - bxSliderライブラリ
- `mmm.slick.min.js` (59,706 bytes) - Slickスライダーライブラリ
- `mmm.modaal.js` (47,982 bytes) - Modaalモーダルライブラリ

### SCSS（ソースファイル）
- `mmm_setting.scss` - 変数・ミックスイン定義
- `mmm_base.scss` - ベーススタイル
- `mmm_foundation.scss` - Foundationリセット
- `mmm_style.scss` - メインスタイル
- `mmm_common.scss` - 共通コンポーネント
- `mmm_top.scss` - トップページ
- `mmm_salon.scss` - 店舗紹介ページ
- `mmm_about.scss` - はじめての方へ
- `mmm_method.scss` - 選ばれる理由
- `mmm_menu.scss` - メニューページ
- `mmm_voice.scss` - 効果写真ページ
- `mmm_blog.scss` - ブログページ
- `mmm_column.scss` - コラムページ
- `mmm_trial.scss` - 体験コースページ
- `mmm_form.scss` - フォームページ
- `mmm_cosmetics.scss` - 化粧品ページ
- `mmm_low.scss` - その他
- `mmm_other.scss` - その他
- `mmm_slick.scss` - Slickカスタマイズ

## 参考ポイント

### 1. SCSS設計
- ミックスイン `@include sp { }` / `@include pc { }` で簡潔なメディアクエリ
- 変数 `$pc` でPC倍率一括管理
- ブレイクポイント: **767px** (SP) / **768px** (PC)

### 2. セクション余白（SP）
- セクション間: 110-130px
- 要素間: 35-80px
- 見出し下: 80px

### 3. 文字サイズ（SP）
- h2相当: 34px
- h3相当: 33px
- 小見出し: 27px
- 本文: 30px
- 補足: 24px

### 4. スライダー実装
- Slick Carouselを使用
- SP: 600px幅（画面より大きく、スワイプ推奨設計）
- 隙間: 17.5px

### 5. 画像最適化
- SP専用画像を `_sp.jpg` / `_sp.png` で管理
- SCSSミックスインで自動切り替え

## 活用方法

1. **余白設計** - mmmの余白ルールを参考に、パトラクシェの余白を見直し
2. **文字サイズ統一** - mmmの文字サイズ階層を参考にルール作成
3. **スライダー導入** - USERVOICE等でSlick導入検討
4. **SCSS導入** - 長期的にCSS管理をSCSS化する場合の設計参考

## 注意事項

- このフォルダは**参照専用**です
- パトラクシェサイトには直接適用しないでください
- デザイン思想・実装方法の参考としてご利用ください
